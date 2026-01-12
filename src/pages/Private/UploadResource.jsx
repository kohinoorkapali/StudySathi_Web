import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { uploadSchema } from "./schema/upload.schema"; // adjust path
import "../../css/UploadResource.css";

export default function UploadResource({ onClose }) {
  const [selectedFileName, setSelectedFileName] = useState(""); // to show file name

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: zodResolver(uploadSchema),
  });

  const onSubmit = (data) => {
    console.log("File object:", data.file); // ✅ shows the File object
    console.log("Title:", data.title);
    console.log("Stream:", data.stream);
    console.log("Description:", data.description);

    alert("Resource uploaded successfully!");
    reset();
    setSelectedFileName("");
    if (onClose) onClose();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFileName(file.name);
      setValue("file", file, { shouldValidate: true }); // important!
    }
  };

  return (
    <div className="upload-modal">
      <div className="upload-card">
        <button className="close-btn" onClick={onClose}>
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
                : "Click to upload PDF, DOC, DOCX, JPG, PNG (max 50MB)"}
            </p>
          </div>
          <input
            type="file"
            id="hiddenFileInput"
            accept=".pdf,.doc,.docx,.jpg,.png"
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
              onClick={() => {
                reset();
                setSelectedFileName("");
              }}
            >
              Cancel
            </button>
            <button type="submit" className="upload-btn">
              Upload Resource
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
