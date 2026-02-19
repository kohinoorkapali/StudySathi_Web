// src/pages/MyResources.jsx
import React, { useEffect, useState } from "react";

export default function MyResources({ all = false }) {
  const [resources, setResources] = useState([]);
  const [editingResource, setEditingResource] = useState(null);
  const [viewingResource, setViewingResource] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    stream: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Fetch resources
  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    const url = all
      ? `http://localhost:5000/api/materials`
      : `http://localhost:5000/api/materials/my?user_id=${userId}`;

    fetch(url)
      .then((res) => res.json())
      .then((result) => setResources(result.data || []))
      .catch((err) => console.error(err));
  }, [all]);

  // Pagination
  const totalPages = Math.ceil(resources.length / itemsPerPage);
  const displayedResources = resources.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this resource?"))
      return;

    try {
      const token = localStorage.getItem("access_token");
      const res = await fetch(
        `http://localhost:5000/api/materials/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        }
      );

      if (!res.ok) throw new Error("Failed to delete");
      setResources((prev) => prev.filter((r) => r.id !== id));
      alert("Resource deleted successfully");
    } catch (err) {
      console.error(err);
      alert("Delete failed: " + err.message);
    }
  };

  const openEditPanel = (res) => {
    setEditingResource(res);
    setFormData({
      title: res.title,
      description: res.description || "",
      stream: res.stream || "",
    });
  };

  const closeEditPanel = () => {
    setEditingResource(null);
    setFormData({ title: "", description: "", stream: "" });
  };

  const openViewPanel = (res) => setViewingResource(res);
  const closeViewPanel = () => setViewingResource(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("access_token");
      const res = await fetch(
        `http://localhost:5000/api/materials/${editingResource.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: JSON.stringify(formData),
        }
      );

      if (!res.ok) throw new Error("Update failed");

      const result = await res.json();
      setResources((prev) =>
        prev.map((r) => (r.id === editingResource.id ? result.data : r))
      );

      closeEditPanel();
    } catch (err) {
      console.error(err);
      alert("Update failed: " + err.message);
    }
  };

  // Get emoji icon based on file extension
  const getFileIcon = (filePath) => {
    if (!filePath) return "📁";
    const ext = filePath.split(".").pop().toLowerCase();
    switch (ext) {
      case "pdf":
        return "📕";
      case "doc":
      case "docx":
        return "📝";
      case "ppt":
      case "pptx":
        return "📊";
      default:
        return "📄";
    }
  };

  return (
    <div className="min-h-screen bg-blue-100 py-10 px-4 relative">
      <div className="max-w-[1600px] mx-auto bg-white rounded-3xl shadow-md p-10">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">
            {all ? "All Resources" : "My Resources"}
          </h1>
          <p className="text-slate-500 text-base">
            {all
              ? "Browse all study materials."
              : "Here are the materials you've uploaded."}
          </p>
        </div>

        {/* Resource List */}
        {resources.length === 0 ? (
          <p className="text-center text-slate-600">
            No resources uploaded yet.
          </p>
        ) : (
          <>
            <div className="flex flex-col gap-6">
              {displayedResources.map((res) => (
                <div
                  key={res.id}
                  className="w-full bg-slate-100 border border-blue-100 rounded-2xl p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col gap-1 mb-3">
                    <h2 className="text-lg font-bold text-slate-800">
                      {res.title}
                    </h2>
                    <p className="text-sm text-slate-500">
                      by{" "}
                      <span className="font-medium">{res.author || "You"}</span>{" "}
                      • {new Date(res.createdAt).toLocaleDateString()}
                    </p>
                    {res.stream && (
                      <span className="px-2 py-0.5 bg-white text-blue-600 rounded-md text-xs font-bold border border-blue-200 w-fit mt-1">
                        {res.stream}
                      </span>
                    )}
                  </div>

                  {res.description && (
                    <p className="text-slate-600 text-sm mb-4">{res.description}</p>
                  )}

                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => openViewPanel(res)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-600"
                    >
                      View
                    </button>
                    {!all && (
                      <>
                        <button
                          onClick={() => openEditPanel(res)}
                          className="bg-emerald-500 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-emerald-600"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(res.id)}
                          className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-8">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                >
                  Prev
                </button>
                {[...Array(totalPages)].map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentPage(idx + 1)}
                    className={`px-4 py-2 rounded-lg ${
                      currentPage === idx + 1
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 hover:bg-gray-300"
                    }`}
                  >
                    {idx + 1}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* VIEW MODAL */}
      {viewingResource && (
        <div
          className="fixed inset-0 bg-black/40 flex items-start justify-center z-50 p-4 pt-10 overflow-y-auto"
          onClick={(e) => e.target === e.currentTarget && closeViewPanel()}
        >
          <div className="bg-white rounded-2xl max-w-lg w-full min-h-[500px] p-6 relative shadow-lg">
            <button
              onClick={closeViewPanel}
              className="absolute top-3 right-3 text-xl font-bold"
            >
              &times;
            </button>

            <h3 className="text-3xl font-bold mb-6">{viewingResource.title}</h3>

            {/* File Card with Icon */}
            <div className="border rounded-lg p-6 mb-8 bg-gray-50 border-gray-200 text-center">
              <div className="text-5xl mb-3">
                {getFileIcon(viewingResource.file_path)}
              </div>
              <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-md text-sm font-bold border border-blue-100/50">
                {viewingResource.file_path
                  ? viewingResource.file_path.split(".").pop().toUpperCase()
                  : "FILE"}
              </span>
              <p className="mt-2 text-sm text-gray-600">{viewingResource.file_path}</p>
            </div>

            {/* Details */}
            <div className="flex flex-col gap-6 text-gray-700 text-sm">
              {viewingResource.description && (
                <div>
                  <h4 className="font-semibold flex items-center gap-2 text-gray-700 mb-1">
                    📖 Description
                  </h4>
                  <p className="text-gray-600">{viewingResource.description}</p>
                </div>
              )}
              {viewingResource.stream && (
                <div>
                  <h4 className="font-semibold flex items-center gap-2 text-gray-700 mb-1">
                    🎓 Stream
                  </h4>
                  <span className="text-blue-600 px-2 py-1 bg-blue-50 rounded-md w-fit">
                    {viewingResource.stream}
                  </span>
                </div>
              )}
              <div>
                <h4 className="font-semibold flex items-center gap-2 text-gray-700 mb-1">
                  👤 Uploaded By
                </h4>
                <span>{viewingResource.author || "You"}</span>
              </div>
              <div>
                <h4 className="font-semibold flex items-center gap-2 text-gray-700 mb-1">
                  📅 Upload Date
                </h4>
                <span>{new Date(viewingResource.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      {editingResource && (
        <div
          className="fixed inset-0 bg-black/40 flex items-start justify-center z-50 p-4 pt-10"
          onClick={(e) => e.target === e.currentTarget && closeEditPanel()}
        >
          <div className="bg-white rounded-2xl max-w-md w-full p-6 relative shadow-lg">
            <button
              onClick={closeEditPanel}
              className="absolute top-3 right-3 text-xl font-bold"
            >
              &times;
            </button>

            <h2 className="text-2xl font-bold mb-4">Edit Resource</h2>

            <form onSubmit={handleUpdate} className="flex flex-col gap-4">
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="border rounded-md p-2"
                placeholder="Title"
              />
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="border rounded-md p-2"
                placeholder="Description"
              />
              <select
                name="stream"
                value={formData.stream}
                onChange={handleChange}
                className="border rounded-md p-2"
              >
                <option value="">Select Stream</option>
                <option value="Science">Science</option>
                <option value="Commerce">Commerce</option>
                <option value="Arts">Arts</option>
                <option value="Engineering">Engineering</option>
                <option value="Medical">Medical</option>
                <option value="Law">Law</option>
                <option value="Management">Management</option>
                <option value="IT">IT</option>
                <option value="Education">Education</option>
                <option value="Humanities">Humanities</option>
              </select>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={closeEditPanel}
                  className="bg-gray-300 px-4 py-2 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-emerald-500 text-white px-4 py-2 rounded-lg"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
