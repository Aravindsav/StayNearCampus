
const Listing = require("../models/listing");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

// ----- Campus Coordinates  -----
const CAMPUS_LNG = Number(process.env.CAMPUS_LNG ?? 79.5300);
const CAMPUS_LAT = Number(process.env.CAMPUS_LAT ?? 17.9784);

// GET /listings  (with filters)
module.exports.index = async (req, res) => {
  try {
    const { price, roomType, distance } = req.query;

    //  "amenities[]=WiFi&amenities[]=AC" or "amenities=WiFi"
    let amenities = req.query["amenities[]"] ?? req.query.amenities ?? [];
    if (!Array.isArray(amenities)) amenities = amenities ? [amenities] : [];

    // ---- Non-geo filters ----
    const match = {};
    if (roomType) match.roomType = roomType;
    if (amenities.length) match.amenities = { $all: amenities };
    if (price) {
      const priceMap = {
        lt1000: { $lt: 1000 },
        "1to2": { $gte: 1000, $lte: 2000 },
        "2to4": { $gte: 2000, $lte: 4000 },
        gt4000: { $gt: 4000 },
      };
      if (priceMap[price]) match.price = priceMap[price];
    }

    let allistings;
    console.time("QueryResponseTime");// for measuring the start response time 

    // ---- Distance filter: only use $geoNear when distance is selected ----
    if (distance) {
      const distMap = {
        lt500: { minDistance: 0, maxDistance: 500 },
        "0_1": { minDistance: 500, maxDistance: 1000 },
        "1_3": { minDistance: 1000, maxDistance: 3000 },
        gt3:   { minDistance: 3000, maxDistance: 20000 },
      };
      const range = distMap[distance];

      const nearPoint = { type: "Point", coordinates: [CAMPUS_LNG, CAMPUS_LAT] }; // [lng, lat]

      allistings = await Listing.aggregate([
        {
          $geoNear: {
            near: nearPoint,
            distanceField: "distanceMeters",
            spherical: true,
            query: match,
            ...(range || {}),
          },
        },
        { $sort: { createdAt: -1 } },
      ]);
    } else {
      // No distance filter → plain find so listings without geometry also show
      allistings = await Listing.find(match).sort({ createdAt: -1 }).lean();
    }
    console.timeEnd("QueryResponseTime");  // for measuring the end response time

    res.render("listings/index.ejs", { allistings, query: req.query });
  } catch (err) {
    console.error("Error in listings.index:", err);
    const allistings = await Listing.find({}).sort({ createdAt: -1 }).lean();
    req.flash("error", "Could not apply filters. Showing latest listings.");
    res.render("listings/index.ejs", { allistings, query: req.query });
  }
};

// GET /listings/new
module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};

// GET /listings/:id
module.exports.showListing = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");

  if (!listing) {
    req.flash("error", "Listing you requested does not exist!");
    return res.redirect("/listings");
  }

  res.render("listings/show.ejs", { listing });
};

// POST /listings
module.exports.createListing = async (req, res, next) => {
  // Geocode the location to GeoJSON (geometry)
  const geoResp = await geocodingClient
    .forwardGeocode({ query: req.body.listing.location, limit: 1 })
    .send();

  const url = req.file?.path;
  const filename = req.file?.filename;

  const newlisting = new Listing(req.body.listing);
  newlisting.owner = req.user._id;
  if (url && filename) newlisting.image = { url, filename };
  newlisting.geometry = geoResp.body.features[0].geometry;

  await newlisting.save();

  req.flash("success", "New Listing Created!");
  res.redirect("/listings");
};

// GET /listings/:id/edit
module.exports.renderEditForm = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing you requested does not exist!");
    return res.redirect("/listings");
  }

  let originalImageUrl = listing.image?.url || "";
  if (originalImageUrl) originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250");

  res.render("listings/edit.ejs", { listing, originalImageUrl });
};

// PUT /listings/:id
module.exports.updateListing = async (req, res) => {
  const { id } = req.params;

  const listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing }, { new: true });

  if (typeof req.file !== "undefined") {
    const url = req.file.path;
    const filename = req.file.filename;
    listing.image = { url, filename };
    await listing.save();
  }

  req.flash("success", "Listing Updated!");
  res.redirect("/listings");
};

// DELETE /listings/:id
module.exports.destroyListing = async (req, res) => {
  const { id } = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success", "Listing Deleted!");
  res.redirect("/listings");
};
