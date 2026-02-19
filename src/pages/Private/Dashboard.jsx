// src/pages/Dashboard/Dashboard.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MaterialCard from "../../components/MaterialCard";
import { useApi } from "../../Hooks/useApi";
import { downloadFile } from "../../utils/downloadFile";

export default function Dashboard() {
  const navigate = useNavigate();
  const { callApi } = useApi();
  const [uploads, setUploads] = useState([]);

  // Fetch newest materials from all users
  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const res = await callApi("GET", "/materials"); // fetch all materials
        const sorted = (res.data || []).sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setUploads(sorted.slice(0, 9)); // only newest 9
      } catch (err) {
        console.error("Failed to fetch materials:", err);
      }
    };

    fetchMaterials();
  }, [callApi]);

  // Format date helper
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString();
  };

  
const handleDownload = (id) => {
  downloadFile(id);
};


  return (
    <div className="min-h-screen bg-blue-100 px-4 sm:px-6 lg:px-20 py-10">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-blue-900">
          Welcome to StudySasthi
        </h1>
        <p className="text-slate-500 mt-3 text-sm sm:text-base">
          Your hub for sharing and discovering study materials
        </p>
      </div>

      {/* Recent Uploads Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6">
        <h2 className="text-xl sm:text-2xl font-semibold text-slate-800">
          Recent Uploads
        </h2>
        <span
          className="text-sm sm:text-base text-blue-800 cursor-pointer hover:underline"
          onClick={() => navigate("/browse")}
        >
          View All →
        </span>
      </div>

      {/* Upload Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {uploads.length === 0 ? (
          <p className="text-slate-500 col-span-full text-center">
            No uploads yet.
          </p>
        ) : (
          uploads.map((item) => (
            <MaterialCard
  key={item.id}
  title={item.title}
  author={item.author}
  date={formatDate(item.createdAt)}
  stream={item.stream}
  description={item.description}
  file_path={item.file_path}
  file_type={item.file_type}
  onDownload={() => handleDownload(item.id)}

/>

          ))
        )}
      </div>
    </div>
  );
}
