const Report = require("../models/Report");

exports.createReport = async (req, res) => {
  try {
    const files = req.files;

    const evidenceUrls = files.map(file => file.path);

    const report = await Report.create({
      plateNumber: req.body.plateNumber,
      violationType: req.body.violationType,
      location: JSON.parse(req.body.location),
      dateTime: req.body.dateTime,
      description: req.body.description,
      evidenceUrls,
      reporterName: req.body.reporterName,
      reporterPhone: req.body.reporterPhone
    });

    res.status(201).json(report);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getReports = async (req, res) => {
  try {
    const reports = await Report.find().sort({ createdAt: -1 });

    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const report = await Report.findByIdAndUpdate(
      req.params.id,
      {
        status: req.body.status
      },
      { new: true }
    );

    res.json(report);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};