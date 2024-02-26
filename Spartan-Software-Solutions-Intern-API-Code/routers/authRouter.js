const express = require("express");
const router = express.Router();
const controller = require("../controllers/authController");
const user = require("../models/userSchema");
const passport = require("passport");

// Local Strategy Routes
router.post("/register/local", controller.registerLocal);
router.post(
  "/login/local",
  passport.authenticate("local", {
    failureRedirect: "/auth/login/local/failure",
    successRedirect: "/auth/login/local/success",
  })
);
router.get("/login/local/failure", controller.loginFailure);
router.get("/login/local/success", controller.loginSuccess);

// Google OAuth Routes


// Facebook OAuth Routes
router.get("/facebook", passport.authenticate("facebook"));

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: "/login/local/failure",
  })
);

router.get("/logout", controller.logout);

module.exports = router;
