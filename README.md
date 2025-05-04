
# 🌍 Wanderlust

Wanderlust is a full-stack web application that allows users to explore, create, and review property listings with location-based services and rich visuals.

**Live Demo**: [https://major-project-ungw.onrender.com/login](https://major-project-ungw.onrender.com/login)

---

## 🚀 Features

- 🔐 User authentication with Passport.js and secure cookie-based session management
- 🏠 Full CRUD for property listings (Create, Read, Update, Delete)
- ⭐ Users can leave star-rated reviews on listings
- 🗺️ Integrated **Mapbox** for interactive map views and geolocation
- 🖼️ Integrated **Unsplash API** for dynamic image fetching
- 📱 Mobile-responsive interface built with EJS templates
- ☁️ Deployed on **Render**

---

## 🛠️ Tech Stack

- **Frontend:** EJS, Bootstrap (or custom CSS)
- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **Authentication:** Passport.js (LocalStrategy)
- **APIs Used:** Mapbox, Unsplash
- **Deployment:** Render

---

## 📸 Screenshots

*(Add screenshots of your app here showing login, maps, listings, etc.)*

---

## 🧠 Architecture Overview

- Modular MVC-style folder structure
- Middleware for authentication, input validation, and error handling
- External API services (Mapbox, Unsplash) integrated via utility services
- Secure .env environment variable management

---

## 🧪 Getting Started Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/wanderlust.git
   cd wanderlust
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables in a `.env` file:
   ```env
   MAPBOX_TOKEN=your_mapbox_token
   UNSPLASH_KEY=your_unsplash_key
   DB_URL=your_mongodb_connection
   SECRET=session_secret
   ```

4. Run the app:
   ```bash
   npm start
   ```

5. Visit `http://localhost:3000`

---

## 📦 Folder Structure

```
wanderlust/
├── models/
├── routes/
├── views/
├── public/
├── utils/
├── middleware/
├── app.js
└── package.json
```

---

## ✨ Future Improvements

- 🌐 Pagination for listings
- 🔍 Advanced search and filters
- 🔐 Role-based access control
- 🤖 Optional ML-based price prediction or review sentiment analysis

---

## 🧑‍💻 Author

Built with ❤️ by [Your Name]  
[LinkedIn](https://linkedin.com/in/yourprofile) | [Portfolio](https://your-portfolio.com)


 BackEnd and Databases:
 NodeJs
 MongoDb
 NodeEJS

Cloudinary for Cloud Storage and Render for online deployment of the website.
