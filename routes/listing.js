const express = require("express");
const router = express.Router();

const wrapAsync = require("../utils/wrapAsync");
const { isLoggedIn, isOwner, validateListing } = require("../middleware");
const listingController = require("../controllers/listings");

const multer = require("multer");
const { storage } = require("../cloudConfig"); 
const upload = multer({ storage });

// /listings
router.route("/")
  .get(wrapAsync(listingController.index)) // uses filters + passes query to EJS
  .post(
    isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.createListing)
  );

// new
router.get("/new", isLoggedIn, listingController.renderNewForm);

// /listings/:id
router.route("/:id")
  .get(wrapAsync(listingController.showListing))
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.updateListing)
  )
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));

// edit
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));

module.exports = router;
