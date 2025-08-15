# StayNearCampus

A Node.js + Express + MongoDB app to help students quickly find short-stay options **near campus**. Landlords can create/manage listings; students can browse, filter, and leave reviews. The UI is server-rendered with EJS and styled via Bootstrap.

> Rename from “Wanderlust” → “StayNearCampus”, with new features like **amenities chips**, **distance filtering**, and **role-based access**.

---

## ✨ Features

- **Listings CRUD** (create/edit/delete by landlords; view for everyone)
- **Role-based access**
  - `landlord`: can create, edit, delete *own* listings
  - `student`: can browse and leave reviews
- **Filters on index page**
  - Price buckets (₹): `< 4000`, `4000–6000`, `6000–8000`, `≥ 8000`
  - Distance from campus (via `$geoNear`): `< 500 m`, `0.5–1 km`, `1–3 km`, `> 3 km`
  - Amenities (chip-style multi-select)
- **Amenities input** (multi-select chips) on create/edit forms
- **Map & Geocoding** (Mapbox): converts human location → GeoJSON Point
- **2dsphere index** on `geometry` for geo queries
- **Reviews** with rating (1–5) + comment; owners can delete their reviews
- **Auth** with Passport (local strategy), secure sessions, flash messages
- **Cloud uploads** (Multer + Cloudinary) for listing image
- **Responsive UI** with Bootstrap 5

---

## 🧱 Tech Stack

- **Server**: Node.js, Express, EJS (with ejs-mate layouts)
- **Database**: MongoDB, Mongoose
- **Auth**: Passport.js (passport-local-mongoose)
- **Uploads**: Multer + Cloudinary
- **Maps/Geo**: Mapbox Geocoding SDK, MongoDB `$geoNear`
- **Validation**: Joi (server-side), Bootstrap (client)
- **Sessions/Flash**: express-session, connect-mongo, connect-flash

---

## 🚀 Getting Started

### 1) Clone & install
```bash
git clone https://github.com/<your-username>/StayNearCampus.git
cd StayNearCampus
npm install
```

### 2) Environment variables
Create a `.env` in the project root:

```env
# MongoDB
ATLASDB_URL=mongodb+srv://<user>:<pass>@cluster0.xxxxx.mongodb.net/staynear

# Sessions
SECRET=supersecretstring

# Mapbox (for geocoding & maps)
MAP_TOKEN=pk.eyJ1Ijoi....your_mapbox_token....

# Campus coordinates (optional overrides; defaults are for NIT Warangal)
CAMPUS_LNG=79.5300
CAMPUS_LAT=17.9784

# Cloudinary (if you use cloud uploads)
CLOUDINARY_CLOUD_NAME=your_cloud
CLOUDINARY_KEY=xxxxxxxxxxxx
CLOUDINARY_SECRET=xxxxxxxxxxxx
```

> **Never commit `.env`**. Ensure it’s in `.gitignore`.

### 3) Development
```bash
npm run dev
# or
node app.js
```
Visit: `http://localhost:8080`

---

## 🗂️ Project Structure (excerpt)

```
StayNearCampus/
├─ app.js
├─ /models
│  ├─ listing.js
│  └─ user.js
├─ /controllers
│  ├─ listings.js
│  └─ users.js
├─ /routes
│  ├─ listing.js
│  ├─ review.js
│  └─ user.js
├─ /utils
│  ├─ schema.js         # Joi validation
│  ├─ wrapAsync.js
│  └─ ExpressError.js
├─ /views
│  ├─ /layouts/boilerplate.ejs
│  ├─ /includes/navbar.ejs
│  ├─ /listings
│  │  ├─ index.ejs      # filters + cards (no description on cards)
│  │  ├─ new.ejs        # amenities chips
│  │  ├─ edit.ejs       # amenities chips (pre-checked)
│  │  └─ show.ejs       # details + map + reviews
│  └─ /users
│     ├─ signup.ejs     # role select (student/landlord)
│     └─ login.ejs
└─ /public              # static assets
```

---

## 🔐 Roles & Guards

- **User model** has `role: 'student' | 'landlord'` (default `student`).
- In views (`navbar.ejs`), show “Add Listing” when:
  ```ejs
  <% if (currUser && currUser.role === 'landlord') { %>
    <a class="nav-link" href="/listings/new">Add Listing</a>
  <% } %>
  ```
- Protect routes:
  ```js
  router.get('/listings/new', isLoggedIn, isLandlord, renderNewForm);
  router.post('/listings',    isLoggedIn, isLandlord, upload.single('listing[image]'), createListing);
  router.get('/listings/:id/edit', isLoggedIn, isLandlord, isListingOwnerOrAdmin, renderEditForm);
  router.put('/listings/:id', isLoggedIn, isLandlord, isListingOwnerOrAdmin, updateListing);
  router.delete('/listings/:id', isLoggedIn, isLandlord, isListingOwnerOrAdmin, destroyListing);
  ```

---

## 🧭 Filtering Logic (index)

- Normalize amenities array from query (`amenities[]` or `amenities`)
- Build Mongo filter `match` with `amenities?`, `price?`
- If **distance** is selected → use `$geoNear` with campus point
- Else → regular `.find(match)` so listings without `geometry` also show

**Price buckets (no overlap):**
```js
const priceMap = {
  lt4000: { $lt: 4000 },
  '4to6': { $gte: 4000, $lt: 6000 },
  '6to8': { $gte: 6000, $lt: 8000 },
  gt8000: { $gte: 8000 },
};
```

**Geo index required:**
```js
ListingSchema.index({ geometry: '2dsphere' });
```

---

## ✅ Validation (Joi)

`utils/schema.js` excerpt:
```js
const Joi = require('joi');
const amenityItem = Joi.string().trim().max(50);

module.exports.listingSchema = Joi.object({
  listing: Joi.object({
    title: Joi.string().trim().min(2).required(),
    description: Joi.string().trim().min(10).required(),
    location: Joi.string().trim().required(),
    country: Joi.string().trim().required(),
    price: Joi.number().min(0).required(),
    amenities: Joi.array().items(amenityItem).single().default([]),
  }).unknown(true).required(),
});
```

---

## 🖼️ Image Uploads

Form field: `name="listing[image]"` → route uses:
```js
upload.single('listing[image]'); // Multer
```
After upload, set:
```js
listing.image = { url: req.file.path, filename: req.file.filename };
```

---

## 🗺️ Mapbox Geocoding

On create/update (if location changes), geocode to GeoJSON:
```js
const geoResp = await geocodingClient
  .forwardGeocode({ query: req.body.listing.location, limit: 1 })
  .send();
const feature = geoResp.body.features?.[0];
if (feature) listing.geometry = feature.geometry;
```

---

## 🧪 Quick Dev Checklist

- `.env` configured
- `ListingSchema.index({ geometry: '2dsphere' })`
- Navbar uses `currUser && currUser.role === 'landlord'`
- Joi allows `listing.amenities`
- Routes protected for landlords
- Cloudinary/Mapbox keys valid

---

## 📦 Scripts

```json
{
  "scripts": {
    "start": "node app.js",
    "dev": "nodemon app.js"
  }
}
```


