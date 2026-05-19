const PDFDocument = require("pdfkit");
const Report = require("../models/Report");

exports.generateIncidentPDF = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);

    if (!report) {
      return res.status(404).json({
        message: "Report not found"
      });
    }

    const doc = new PDFDocument();

    res.setHeader("Content-Type", "application/pdf");

    res.setHeader(
      "Content-Disposition",
      `attachment; filename=incident-${report._id}.pdf`
    );

    doc.pipe(res);

    doc.fontSize(22).text("SafeRoads Incident Report", {
      align: "center"
    });

    doc.moveDown();

    doc.text(`Plate Number: ${report.plateNumber}`);
    doc.text(`Violation Type: ${report.violationType}`);
    doc.text(`Status: ${report.status}`);
    doc.text(`Description: ${report.description}`);

    doc.moveDown();

    doc.text(`Latitude: ${report.location?.lat}`);
    doc.text(`Longitude: ${report.location?.lng}`);

    doc.moveDown();

    doc.text(`Generated on ${new Date().toLocaleString()}`);

    doc.end();
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};