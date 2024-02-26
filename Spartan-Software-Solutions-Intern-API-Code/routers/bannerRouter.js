const { Router } = require("express");
const router = Router();
const { addNewBanner, getBanners } = require("../controllers/bannerController");

router.route("/").get(getBanners).post(addNewBanner);

module.exports = router;
