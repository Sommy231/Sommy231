const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  generateIncidentPDF
} = require("../controllers/pdfController");

router.get(
  "/incident/:id",
  protect,
  generateIncidentPDF
);

module.exports = router;