import React, { useState } from "react";

import API from "../services/api";

import LocationPicker from "./LocationPicker";

const initialFormState = {
  plateNumber: "",
  violationType: "",
  dateTime: "",
  description: "",
  reporterName: "",
  reporterPhone: ""
};

const ReportForm = () => {
  const [formData, setFormData] = useState(initialFormState);
  const [locationData, setLocationData] = useState(null);
  const [evidence, setEvidence] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!locationData) {
      alert("Please select the violation location on the map.");
      return;
    }

    const payload = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      payload.append(key, value);
    });

    payload.append("location", JSON.stringify(locationData));

    evidence.forEach((file) => {
      payload.append("evidence", file);
    });

    try {
      setIsSubmitting(true);

      await API.post("/reports", payload, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      alert("Report submitted successfully.");
      setFormData(initialFormState);
      setLocationData(null);
      setEvidence([]);
      e.target.reset();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to submit report.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="form-container">
      <h1>SafeRoads Violation Report</h1>

      <form onSubmit={handleSubmit}>
        <input
          name="plateNumber"
          placeholder="Plate number"
          value={formData.plateNumber}
          onChange={handleChange}
          required
        />

        <select
          name="violationType"
          value={formData.violationType}
          onChange={handleChange}
          required
        >
          <option value="">Select violation type</option>
          <option value="Speeding">Speeding</option>
          <option value="Wrong Parking">Wrong Parking</option>
          <option value="Reckless Driving">Reckless Driving</option>
          <option value="Traffic Light Violation">
            Traffic Light Violation
          </option>
          <option value="Other">Other</option>
        </select>

        <input
          name="dateTime"
          type="datetime-local"
          value={formData.dateTime}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          rows="4"
        />

        <LocationPicker setLocationData={setLocationData} />

        <input
          type="file"
          accept="image/*,video/mp4"
          multiple
          onChange={(e) => setEvidence(Array.from(e.target.files))}
        />

        <input
          name="reporterName"
          placeholder="Reporter name"
          value={formData.reporterName}
          onChange={handleChange}
        />

        <input
          name="reporterPhone"
          placeholder="Reporter phone"
          value={formData.reporterPhone}
          onChange={handleChange}
        />

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit Report"}
        </button>
      </form>
    </section>
  );
};

export default ReportForm;
