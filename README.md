# StayNearCampus

StayNearCampus is a small web app I’m building to make it easier for students to find short-stay places **near campus** (hotels/hostels/apartments) without getting lost in a million tabs. Landlords can post listings, students can browse, filter, and leave reviews. It’s simple, fast, and does the basics really well.

> Formerly “Wanderlust” — I renamed and refocused it around campus stays, added amenity chips, distance filters, and proper role-based access.

---

## Why this exists

When you’re new to a city or visiting for exams/fests/admissions, finding a place *near* campus is the first headache. Most sites don’t let you filter by **distance from campus**. This one does — and puts the practical details (Wi‑Fi, laundry, breakfast, etc.) front and center.

---

## What it can do (right now)

- **Browse listings** with clean cards (no noisy descriptions on the index)
- **Smart filters**:
  - Price ranges (₹): `< 4000`, `4000–6000`, `6000–8000`, `≥ 8000`
  - Distance from campus (`$geoNear`): `< 500 m`, `0.5–1 km`, `1–3 km`, `> 3 km`
  - Amenities: WiFi, Laundry, Meals, AC, etc. (multi‑select chips)
- **Role-based access** (Passport)
  - **Landlords** can create, edit, and delete *their* listings
  - **Students** can browse and leave reviews
- **Reviews** with rating (1–5) + comments
- **Map & Geocoding** via Mapbox (turns “Hanamkonda, Warangal” into coordinates)
- **Image uploads** with Multer (plug in Cloudinary if you want CDN storage)

Nice-to-haves on the list: better search, photos gallery, mobile tweaks, and a tiny admin panel.

---

## Tech stack (boring but useful)

- **Node.js + Express** with **EJS** templates (using `ejs-mate` for layouts)
- **MongoDB + Mongoose** (with a `2dsphere` index for geo queries)
- **Passport (local)** for auth, **express-session** + **connect-mongo**
- **Multer** (file uploads), **Cloudinary** (optional, for hosting images)
- **Mapbox SDK** for geocoding
- **Joi** for server-side validation
- **Bootstrap 5** for quick styling

---

## Getting started

### 1) Clone + install
```bash
git clone https://github.com/<your-username>/StayNearCampus.git
cd StayNearCampus
npm install
```

### 2) Set up your `.env`
Create a `.env` file in the project root:

```env


# Sessions
SECRET=supersecretstring

# Mapbox (for geocoding & the map on the show page)
MAP_TOKEN=pk.eyJ1Ijoi....your_mapbox_token....

# Optional: override campus coords (defaults point to NIT Warangal)
CAMPUS_LNG=79.5300
CAMPUS_LAT=17.9784

# Optional: Cloudinary if you want CDN image hosting
CLOUDINARY_CLOUD_NAME=your_cloud
CLOUDINARY_KEY=xxxxxxxxxxxx
CLOUDINARY_SECRET=xxxxxxxxxxxx
```

> Make sure `.env` is in your `.gitignore`.

### 3) Run it
```bash
npm run dev
# or
node app.js
```
Open `http://localhost:8080`.

---

## How the filters work (short version)

- I build a Mongo query from the form inputs (price, amenities).
- If **distance** is chosen, I switch to an aggregation with **$geoNear** using your campus point (defaults can be changed via env). This adds a `distanceMeters` field and filters to the bucket you picked.
- No distance filter? It’s a normal `find()` so even listings without coordinates still appear.

Price buckets don’t overlap:
```js
lt4000: { $lt: 4000 },
'4to6': { $gte: 4000, $lt: 6000 },
'6to8': { $gte: 6000, $lt: 8000 },
gt8000: { $gte: 8000 },
```

> Don’t forget: `ListingSchema.index({ geometry: '2dsphere' })` is required for `$geoNear`.

---

## Data model (roughly)

```js
// models/listing.js
{
  title: String,
  description: String,
  price: Number,
  country: String,
  location: String,
  image: { url: String, filename: String },
  amenities: [String],
  geometry: { type: { type: String }, coordinates: [Number] }, // GeoJSON Point
  owner: ObjectId(User)
}

// models/user.js
{
  email: String,
  role: { type: String, enum: ['student','landlord'], default: 'student' }
  // passport-local-mongoose handles username + hash/salt
}
```

---

## Common pitfalls (aka “gotchas I hit so you don’t have to”)

- **Missing geo index** → `$geoNear` crashes. Add: `ListingSchema.index({ geometry: '2dsphere' })`.
- **Amenities validation** → Allow it in Joi as `array().items(string()).single()`.
- **Navbar role check** → Use `currUser && currUser.role === 'landlord'`, not a bare `role` variable.
- **File uploads + Joi** → Don’t validate the file in Joi; Multer puts the file in `req.file`, not `req.body`.
- **Signup role** → Make sure your signup form posts `name="role"` with `value="student" | "landlord"`.

---

## Repository scripts

```json
{
  "scripts": {
    "start": "node app.js",
    "dev": "nodemon app.js"
  }
}
```

---

## Contributing

If you’ve got ideas or find bugs, feel free to open an issue or PR. Even a quick “this part was confusing” helps a lot.

---

## License

MIT — use it, tweak it, ship it. A little credit back would be lovely. :)
