import React from "react";

export default function Dashboard() {
  const stats = [
    { label: "Total Resources", value: 8, bg: "bg-indigo-100", icon: "📖" },
    { label: "Total Downloads", value: 2444, bg: "bg-green-100", icon: "📥" },
    { label: "Total Likes", value: 533, bg: "bg-red-100", icon: "❤️" },
    { label: "Contributors", value: 8, bg: "bg-purple-100", icon: "👥" },
  ];

  const uploads = [
    { title: "Complete Physics Chapter 5", author: "Rahul Kumar", downloads: 234, tags: ["Science", "Physics", "12th"] },
    { title: "Organic Chemistry Reactions", author: "Priya Sharma", downloads: 189, tags: ["Science", "Chemistry", "Sem 2"] },
    { title: "Calculus Formula Sheet", author: "Amit Patel", downloads: 456, tags: ["Science", "Mathematics", "12th"] },
  ];

  return (
    <div className="min-h-screen bg-slate-50 px-4 sm:px-6 lg:px-20 py-10">

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
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-14">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 text-center shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <div className={`mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full ${stat.bg} text-xl`}>
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
        <span className="text-sm sm:text-base text-blue-600 cursor-pointer hover:underline">
          View All →
        </span>
      </div>

      {/* Upload Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {uploads.map((item, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <div className="flex gap-3 items-start">
              <div className="text-2xl sm:text-3xl">📄</div>
              <div>
                <h4 className="font-semibold text-slate-800 text-base sm:text-lg">
                  {item.title}
                </h4>
                <p className="text-sm text-slate-500 mt-1">{item.author}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-1">
              {item.tags.map(tag => (
                <span
                  key={tag}
                  className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs sm:text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-auto flex justify-between items-center border-t border-gray-100 pt-3">
              <span className="text-sm text-slate-600">
                📥 {item.downloads}
              </span>
              <button className="bg-blue-600 text-white text-sm sm:text-base px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                Download
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
