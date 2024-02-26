const genPassword = require("../lib/passwordUtils").genPassword;
const User = require("../models/userSchema");
const registerLocal = async (req, res, next) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;

    if (password != confirmPassword)
      return res.status(200).json({ iserror: false, isPasswordMatches: false });

    const saltHash = genPassword(password);
    const salt = saltHash.salt;
    const hash = saltHash.hash;
    const user = await User.find({ username: username });

    if (user.length)
      return res.json({
        isError: false,
        isPasswordMatches: true,
        isUsernameUnique: false,
      });
      
    const newUser = new User({
      username: username,
      password: hash,
      salt: salt,
      loginType: 1,
      isPremium: false,
    });

    newUser.save();
    res.status(200).json({
      iserror: false,
      isPasswordMatches: true,
      isUsernameUnique: true,
    });
  } catch (error) {
    res.status(400).json({ iserror: true, error: error });
  }
};

const loginSuccess = (req, res, next) => {
  console.log("User", req.user);
  if (req.user) {
    return res.status(200).send({ isSuccess: true, user: req.user });
  } else {
    return res.status(403).send({ isSuccess: false });
  }
};

const loginFailure = (req, res, next) => {
  res.status(200).send({ isSuccess: false });
};

const logout = (req, res, next) => {
  try {
    req.logout();
    res.status(200).json({ isLoggedOut: true });
  } catch (error) {
    res.status(400).json({ isLoggedOut: false });
  }
};

module.exports = {
  registerLocal,
  loginSuccess,
  loginFailure,
  logout,
};
