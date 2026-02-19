// src/pages/MyResources.jsx
import React, { useEffect, useState } from "react";

export default function MyResources() {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem("user_id");

    fetch(`http://localhost:5000/api/materials/my?user_id=${userId}`)
      .then((res) => res.json())
      .then((result) => {
        setResources(result.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this resource?")) return;

    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch(`http://localhost:5000/api/materials/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });

      if (!response.ok) throw new Error("Failed to delete");

      // Update state to remove deleted resource
      setResources((prev) => prev.filter((res) => res.id !== id));
      alert("Resource deleted successfully");
    } catch (err) {
      console.error(err);
      alert("Delete failed: " + err.message);
    }
  };


return (
  <div className="min-h-screen bg-blue-100 py-10 px-4">

    {/* White Container Box */}
    <div className="max-w-[1600px] mx-auto bg-white rounded-3xl shadow-md p-10">

      {/* Header INSIDE the box */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">
          My Resources
        </h1>
        <p className="text-slate-500 text-base">
          Here are the materials you've uploaded.
        </p>
      </div>

      {resources.length === 0 ? (
        <p className="text-center text-slate-600">
          No resources uploaded yet.
        </p>
      ) : (
        <div className="flex flex-col gap-6">
          {resources.map((res) => (
            <div
              key={res.id}
              className="w-full bg-slate-100 border border-blue-100 rounded-2xl p-6 hover:shadow-md transition-shadow"
            >
              {/* Title + Author + Date */}
              <div className="flex flex-col gap-1 mb-3">
                <h2 className="text-lg font-bold text-slate-800">
                  {res.title}
                </h2>
                <p className="text-sm text-slate-500">
                  by <span className="font-medium">{res.author || "You"}</span>{" "}
                  • {new Date(res.createdAt).toLocaleDateString()}
                </p>

                {res.stream && (
                  <span className="px-2 py-0.5 bg-white text-blue-600 rounded-md text-xs font-bold border border-blue-200 w-fit mt-1">
                    {res.stream}
                  </span>
                )}
              </div>

              {/* Description */}
              {res.description && (
                <p className="text-slate-600 text-sm line-clamp-3 mb-4">
                  {res.description}
                </p>
              )}

              {/* Buttons */}
              <div className="flex justify-end gap-2">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-600 transition-colors">
                  View
                </button>

                <button className="bg-emerald-500 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-emerald-600 transition-colors">
                  Edit
                </button>

                <button
  onClick={() => handleDelete(res.id)}
  className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-red-600 transition-colors"
>
  Delete
</button>

              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  </div>
);
}