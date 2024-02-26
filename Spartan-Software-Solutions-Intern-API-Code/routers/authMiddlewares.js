const isAuth = (req, res, next) => {
  console.log(req.isAuthenticated());
  if (req.isAuthenticated()) {
    next();
  } else {
    return res.status(200).json({ isAuthenticated: false });
  }
};

const isPremium = (req, res, next) => {
  if (req.isAuthenticated()) {
    if (req.user.isPremium == true) next();
    else res.status(401).json({ isAuthenticated: true, isPremium: false });
  } else {
    return res.status(401).json({ isAuthenticated: false });
  }
};

module.exports = {
  isAuth,
  isPremium,
};
