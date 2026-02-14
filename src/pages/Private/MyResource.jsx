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

  return (
    <div className="min-h-screen bg-blue-50 p-6 lg:p-10">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">
          My Resources
        </h1>
        <p className="text-slate-500 text-base">
          Here are the materials you've uploaded.
        </p>
      </div>

      {/* Empty state */}
      {resources.length === 0 ? (
        <p className="text-center text-slate-600 mt-10">
          No resources uploaded yet.
        </p>
      ) : (
        <div className="flex flex-col gap-4">
          {resources.map((res) => (
            <div
              key={res.id}
              className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Title + Author + Date */}
              <div className="flex flex-col gap-1 mb-2">
                <h2 className="text-lg font-bold text-slate-800">{res.title}</h2>
                <p className="text-sm text-slate-500">
                  by <span className="font-medium">{res.author || "You"}</span>{" "}
                  • {new Date(res.createdAt).toLocaleDateString()}
                </p>
                {res.stream && (
                  <span className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded-md text-xs font-bold border border-blue-100/50 w-fit mt-1">
                    {res.stream}
                  </span>
                )}
              </div>

              {/* Description */}
              {res.description && (
                <p className="text-slate-600 text-sm line-clamp-3 mb-3">
                  {res.description}
                </p>
              )}

              {/* Buttons aligned to right */}
<div className="flex justify-end gap-2">
  <button
    onClick={() => console.log("View", res.id)}
    className="bg-blue-400 text-white px-3 py-1.5 rounded-lg text-sm font-bold hover:bg-blue-500 transition-colors shadow-sm"
  >
    View
  </button>
  <button
    onClick={() => console.log("Edit", res.id)}
    className="bg-emerald-400 text-white px-3 py-1.5 rounded-lg text-sm font-bold hover:bg-emerald-500 transition-colors shadow-sm"
  >
    Edit
  </button>
  <button
    onClick={() => console.log("Delete", res.id)}
    className="bg-red-500 text-white px-3 py-1.5 rounded-lg text-sm font-bold hover:bg-red-600 transition-colors shadow-sm"
  >
    Delete
  </button>
</div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}
