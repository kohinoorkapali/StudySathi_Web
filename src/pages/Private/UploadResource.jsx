// src/pages/UploadResource/UploadResource.jsx
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { uploadSchema } from "./schema/upload.schema";
import "../../css/UploadResource.css";
import Header from "../../components/Header/Header";
import { useApi } from "../../hooks/useApi";

export default function UploadResource() {
  const navigate = useNavigate();
  const { callApi, loading, error } = useApi();
  const [selectedFileName, setSelectedFileName] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: zodResolver(uploadSchema),
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFileName(file.name);
      setValue("file", file, { shouldValidate: true });
    }
  };

  const onSubmit = async (data) => {
  try {
    // Ensure data.file is a File object
    if (!(data.file instanceof File)) {
      alert("No file selected!");
      return;
    }

    const formData = new FormData();
    formData.append("file", data.file); // must match Multer field name
    formData.append("title", data.title);
    formData.append("description", data.description || "");
    formData.append("stream", data.stream);
    
    const userId = localStorage.getItem("user_id"); // optional
    if (userId) formData.append("user_id", userId);

    await callApi("POST", "/materials", formData); // must POST to /materials

    alert("Resource uploaded successfully!");
    reset();
    setSelectedFileName("");
    navigate(-1);
  } catch (err) {
    console.error(err);
    alert("Upload failed: " + err.message);
  }
};

  return (
    <div>
      <Header />

      <div
        className="upload-modal-overlay"
        onClick={(e) => {
          if (e.target.classList.contains("upload-modal-overlay")) {
            navigate(-1); // close if clicked outside
          }
        }}
      >
        <div className="upload-card">
          {/* Close Button */}
          <button className="close-btn" onClick={() => navigate(-1)}>
            &times;
          </button>

          <h2 className="upload-title">Share Study Resource</h2>
          <p className="upload-subtitle">
            Upload your notes, PDFs, or images to help other students
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="upload-form">
            {/* File Upload */}
            <label className="upload-label">Upload File *</label>
            <div
              className={`file-upload ${selectedFileName ? "file-selected" : ""}`}
              onClick={() => document.getElementById("hiddenFileInput").click()}
            >
              <p>
                {selectedFileName
                  ? `Selected: ${selectedFileName}`
                  : "Click to upload PDF, DOC, DOCX , PPT, PPTX(max 5MB)"}
              </p>
            </div>
            <input
  type="file"
  id="hiddenFileInput"
  accept=".pdf,.doc,.docx,.ppt,.pptx" // ✅ only allow documents
  style={{ display: "none" }}
  {...register("file")}
  onChange={handleFileChange}
/>
            {errors.file && <p className="error-msg">{errors.file.message}</p>}

            {/* Title */}
            <label className="upload-label">Resource Title *</label>
            <input
              type="text"
              placeholder="e.g., Chapter 5 Physics Notes"
              {...register("title")}
              className="upload-input"
            />
            {errors.title && <p className="error-msg">{errors.title.message}</p>}

            {/* Description */}
            <label className="upload-label">Description</label>
            <textarea
              placeholder="Brief description of the resource..."
              {...register("description")}
              className="upload-textarea"
            />

            {/* Stream */}
            <label className="upload-label">Stream *</label>
            <select {...register("stream")} className="upload-select">
              <option value="">Select Stream</option>
              <option value="Science">Science</option>
              <option value="Commerce">Commerce</option>
              <option value="Arts">Arts</option>
              <option value="Engineering">Engineering</option>
              <option value="Medical">Medical</option>
              <option value="Law">Law</option>
              <option value="Management">Management</option>
              <option value="IT">Information Technology (IT)</option>
              <option value="Education">Education</option>
              <option value="Humanities">Humanities</option>
            </select>
            {errors.stream && <p className="error-msg">{errors.stream.message}</p>}

            {/* Buttons */}
            <div className="upload-buttons">
              <button
                type="button"
                className="cancel-btn"
                onClick={() => navigate(-1)}
                disabled={loading}
              >
                Cancel
              </button>

              <button type="submit" className="upload-btn" disabled={loading}>
                {loading ? "Uploading..." : "Upload Resource"}
              </button>
            </div>
            {error && <p className="error-msg">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}
