const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/userSchema");
const validPassword = require("../lib/passwordUtils").validPassword;
const FacebookStrategy = require("passport-facebook").Strategy;

// Local Strategy - Code
const customFields = {
  usernameField: "username",
  passwordField: "password",
};

const verifyCallbackLocal = async (username, password, done) => {
  try {
    const user = await User.findOne({ username: username });
    if (!user) return done(null, false);

    const isValid = validPassword(password, user.password, user.salt);

    if (isValid) return done(null, user);
    return done(null, false);
  } catch (error) {
    done(error);
  }
};

const strategy = new LocalStrategy(customFields, verifyCallbackLocal);

passport.use(strategy);

// Facebook Strategy

const verifyCallbackFacebook = async (
  accessToken,
  refreshToken,
  profile,
  done
) => {
  let user = await User.findOne({
    username: String(profile.id),
    loginType: 3, // Local - 1 , Google - 2 , Facebook - 3
  });
  console.log(user);
  if (!user) {
    console.log("Adding New Facebook User");
    console.log(profile);
    user = new User({
      name: profile.displayName,
      username: profile.id,
      loginType: 3,
      isPremium: false,
    });
    await user.save();
    return done(null, user);
  } else {
    console.log("User already exists in DB");
    return done(null, user);
  }
};

const facebookStrategy = new FacebookStrategy(
  {
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/auth/facebook/callback",
  },
  verifyCallbackFacebook
);

passport.use(facebookStrategy);

// Serialize and Deserialize User Object for abstraction purpose.
passport.serializeUser((user, done) => {
  console.log(user);
  done(null, user.id);
});

passport.deserializeUser(async (userId, done) => {
  try {
    const user = await User.findById(userId);
    done(null, user);
  } catch (error) {
    done(error);
  }
});
