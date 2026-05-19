const express = require("express");
const router = express.Router();

const {
  createReport,
  getReports,
  updateStatus
} = require("../controllers/reportController");

const upload = require("../middleware/uploadMiddleware");

router.post(
  "/",
  upload.array("evidence", 5),
  createReport
);

router.get("/", getReports);

router.put("/:id", updateStatus);

module.exports = router;