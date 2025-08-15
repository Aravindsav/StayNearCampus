const User = require("../models/user");

// GET /signup
module.exports.renderSignupForm = (req, res) => {
  res.render("users/signup.ejs");
};

// POST /signup
module.exports.signup = async (req, res, next) => {
  try {
    const { username, email, password, role } = req.body;

    // minimal & safe: only allow 'student' or 'landlord'; default to 'student'
    const safeRole = role === 'landlord' ? 'landlord' : 'student';

    const newUser = new User({ email, username, role: safeRole });
    const registeredUser = await User.register(newUser, password);

    req.login(registeredUser, (err) => {
      if (err) return next(err);
      req.flash("success", "Welcome to StayNearCampus!");
      const redirectUrl = req.session.returnTo || "/listings";
      delete req.session.returnTo;
      res.redirect(redirectUrl);
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/signup");
  }
};

// GET /login
module.exports.renderLoginForm = (req, res) => {
  res.render("users/login.ejs");
};

// POST /login  (after passport.authenticate)
module.exports.login = (req, res) => {
  req.flash("success", "Welcome back to StayNearCampus!");
  const redirectUrl = res.locals.redirectUrl || req.session.returnTo || "/listings";
  delete req.session.returnTo;
  res.redirect(redirectUrl);
};

// GET /logout
module.exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    req.flash("success", "You are logged out!");
    res.redirect("/listings");
  });
};
