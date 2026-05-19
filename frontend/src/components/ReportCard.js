import React from "react";

import API from "../services/api";

const statusOptions = ["Pending", "Reviewed", "Fine Issued"];

const ReportCard = ({ report, onStatusChange }) => {
  const downloadPdf = async () => {
    try {
      const response = await API.get(`/pdf/incident/${report._id}`, {
        responseType: "blob"
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");

      link.href = url;
      link.setAttribute("download", `incident-${report._id}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to download PDF.");
    }
  };

  return (
    <article className="report-card">
      <div className="report-card-header">
        <h3>{report.plateNumber}</h3>
        <span>{report.status}</span>
      </div>

      <p>
        <strong>Violation:</strong> {report.violationType}
      </p>
      <p>
        <strong>Date:</strong>{" "}
        {report.dateTime ? new Date(report.dateTime).toLocaleString() : "N/A"}
      </p>
      <p>
        <strong>Description:</strong> {report.description || "N/A"}
      </p>
      <p>
        <strong>Location:</strong> {report.location?.lat}, {report.location?.lng}
      </p>
      <p>
        <strong>Reporter:</strong> {report.reporterName || "Anonymous"}
      </p>

      {report.evidenceUrls?.length > 0 && (
        <div className="evidence-list">
          {report.evidenceUrls.map((url) => (
            <a key={url} href={url} target="_blank" rel="noreferrer">
              Evidence
            </a>
          ))}
        </div>
      )}

      <div className="report-actions">
        <select
          value={report.status}
          onChange={(e) => onStatusChange(report._id, e.target.value)}
        >
          {statusOptions.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>

        <button type="button" onClick={downloadPdf}>
          PDF
        </button>
      </div>
    </article>
  );
};

export default ReportCard;
