import React from "react";
import { useNavigate } from "react-router-dom";
import MaterialCard from "../../components/MaterialCard";


export default function Dashboard() {
  const navigate = useNavigate();

  const stats = [
    { label: "Total Resources", value: 12, bg: "bg-blue-100", icon: "📖" },
    { label: "Total Downloads", value: 2444, bg: "bg-blue-100", icon: "📥" },
    { label: "Contributors", value: 8, bg: "bg-blue-100", icon: "👥" },
  ];

  const uploads = Array.from({ length: 9 }, (_, i) => ({
    title: `Sample Resource ${i + 1}`,
    author: `Author ${i + 1}`,
    downloads: Math.floor(Math.random() * 500),
    tags: ["Science", "Math", "12th"],
  }));

  return (
    <div className="min-h-screen bg-blue-50 px-4 sm:px-6 lg:px-20 py-10">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-blue-900">
          Welcome to StudySasthi 👋
        </h1>
        <p className="text-slate-500 mt-3 text-sm sm:text-base">
          Your hub for sharing and discovering study materials
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-14">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white border border-gray-100 rounded-2xl p-6 sm:p-8 text-center shadow-sm hover:shadow-lg transition-all"
          >
            <div
              className={`mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full ${stat.bg} text-xl`}
            >
              {stat.icon}
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-800">
              {stat.value}
            </div>
            <p className="text-sm sm:text-base font-medium text-blue-600 mt-1">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* Recent Uploads Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6">
        <h2 className="text-xl sm:text-2xl font-semibold text-slate-800">
          Recent Uploads
        </h2>
        <span
          className="text-sm sm:text-base text-blue-600 cursor-pointer hover:underline"
          onClick={() => navigate("/browse")}
        >
          View All →
        </span>
      </div>

      {/* Upload Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
  {uploads.map((item, index) => (
    <MaterialCard
      key={index}
      title={item.title}
      author={item.author}
      stream={item.tags[0]}   // optional: show first tag as stream
      onDownload={() => console.log("Download", item.title)}
    />
  ))}
</div>

    </div>
  );
}
