import React, { useEffect, useState } from "react";

import API from "../services/api";

import ReportCard from "./ReportCard";

const AdminDashboard = () => {
  const [reports, setReports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchReports = async () => {
    try {
      const { data } = await API.get("/reports");

      setReports(data);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to load reports.");
    } finally {
      setIsLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const { data } = await API.put(`/reports/${id}`, { status });

      setReports((currentReports) =>
        currentReports.map((report) =>
          report._id === id ? data : report
        )
      );
    } catch (error) {
      alert(error.response?.data?.message || "Failed to update status.");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  useEffect(() => {
    fetchReports();
  }, []);

  return (
    <section className="dashboard">
      <div className="dashboard-header">
        <h2>Admin Dashboard</h2>
        <button type="button" onClick={logout}>
          Logout
        </button>
      </div>

      {isLoading ? (
        <p>Loading reports...</p>
      ) : reports.length === 0 ? (
        <p>No reports yet.</p>
      ) : (
        <div className="report-grid">
          {reports.map((report) => (
            <ReportCard
              key={report._id}
              report={report}
              onStatusChange={updateStatus}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default AdminDashboard;
