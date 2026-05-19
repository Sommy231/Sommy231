const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
  {
    plateNumber: {
      type: String,
      required: true
    },

    violationType: {
      type: String,
      required: true
    },

    location: {
      lat: Number,
      lng: Number,
      address: String
    },

    dateTime: {
      type: Date,
      required: true
    },

    description: {
      type: String
    },

    evidenceUrls: [String],

    status: {
      type: String,
      enum: ["Pending", "Reviewed", "Fine Issued"],
      default: "Pending"
    },

    reporterName: String,

    reporterPhone: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("Report", reportSchema);