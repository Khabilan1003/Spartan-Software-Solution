const express = require("express");
const router = express.Router();
const controller = require("../controllers/dataController");
const isAuth = require("../routers/authMiddlewares").isAuth;
// const isPremium = require("../routers/authMiddlewares").isPremium;

router.get("/getRecords", controller.getRecords);
router.get("/getTotalRecords", controller.totalRecordsAndPages);

router.get("/getRecords/:pageno", isAuth, controller.getRecordsByPageNumber);
router.post("/storeRecord", isAuth, controller.storeRecords);
router.delete("/deleteRecord/:CASE_NUMBER", isAuth, controller.deleteRecords);

module.exports = router;