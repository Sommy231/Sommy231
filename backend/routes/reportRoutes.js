const express = require("express");
const router = express.Router();

const {
  createReport,
  getReports,
  updateStatus
} = require("../controllers/reportController");

const upload = require("../middleware/uploadMiddleware");
const protect = require("../middleware/authMiddleware");

router.post(
  "/",
  upload.array("evidence", 5),
  createReport
);

router.get("/", protect, getReports);

router.put("/:id", protect, updateStatus);

module.exports = router;
