import React, { useState } from "react";
import Pagination from "../../components/Pagination";
import MaterialCard from "../../components/MaterialCard";

export default function BrowsePage() {
  const [sortOrder, setSortOrder] = useState("newest");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const streams = [
    "Science",
    "Commerce",
    "Arts",
    "Engineering",
    "Medical",
    "Law",
    "Management",
    "IT",
    "Education",
    "Humanities",
  ];

  const [selectedStreams, setSelectedStreams] = useState([]);

  const allResources = Array.from({ length: 30 }).map((_, i) => ({
    id: i,
    title:
      i % 3 === 0
        ? "Complete Physics Chapter 5"
        : i % 3 === 1
        ? "Calculus Formula Sheet"
        : "Organic Chemistry Reactions",
    description:
      i % 2 === 0
        ? "Comprehensive notes covering the chapter thoroughly."
        : "Concise summary and formulas for quick revision.",
    stream: streams[i % streams.length],
    author: i % 2 === 0 ? "Rahul Kumar" : "Priya Sharma",
    date: new Date(2024, 0, 25 - i).toLocaleDateString(),
    downloads: 124 - i,
  }));

  const toggleStream = (stream) => {
    setSelectedStreams((prev) =>
      prev.includes(stream)
        ? prev.filter((s) => s !== stream)
        : [...prev, stream]
    );
    setCurrentPage(1);
  };

  const filteredResources = allResources.filter((res) => {
    const matchesSearch =
      res.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      res.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStream =
      selectedStreams.length === 0 || selectedStreams.includes(res.stream);
    return matchesSearch && matchesStream;
  });

  const sortedResources = [...filteredResources].sort((a, b) => {
    if (sortOrder === "newest") return new Date(b.date) - new Date(a.date);
    return new Date(a.date) - new Date(b.date);
  });

  const totalPages = Math.ceil(sortedResources.length / itemsPerPage);
  const displayedResources = sortedResources.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const clearFilters = () => {
    setSelectedStreams([]);
    setSearchTerm("");
    setCurrentPage(1);
  };

  return (
    <div className="flex min-h-screen bg-blue-100 font-sans text-slate-700">
      {/* SIDEBAR */}
      <aside className="w-72 hidden lg:flex flex-col bg-blue-200 border-r border-slate-200 sticky top-0 h-screen">
        <div className="p-8 flex-1 overflow-y-auto">
          <h2 className="text-xl font-bold mb-6 text-slate-800">Filters</h2>

          <div className="mb-10">
            <h3 className="font-bold text-sm text-slate-500 uppercase tracking-wider mb-4">
              Stream
            </h3>
            <div className="space-y-3">
              {streams.map((s) => (
                <label key={s} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedStreams.includes(s)}
                    onChange={() => toggleStream(s)}
                    className="w-4 h-4 rounded border-gray-300 text-blue-600"
                  />
                  <span className="text-[15px] text-slate-600">{s}</span>
                </label>
              ))}
            </div>
          </div>

          <button
            onClick={clearFilters}
            className="w-full py-2.5 border border-blue-500 text-blue-600 rounded-lg hover:bg-blue-50 font-semibold text-sm"
          >
            Clear All Filters
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <main className="flex-1 p-6 lg:p-10">
        {/* SEARCH */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search by title or author..."
            className="w-full p-5 rounded-2xl border border-gray-200 bg-white shadow-sm text-lg"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between mb-8 gap-4">
          <span className="text-blue-600 font-bold text-lg">
            {filteredResources.length} resources found
          </span>

          <div className="flex bg-gray-200/60 p-1 rounded-full">
            <button
              onClick={() => setSortOrder("newest")}
              className={`px-6 py-2 rounded-full text-sm font-bold ${
                sortOrder === "newest"
                  ? "bg-[#1d4ed8] text-white"
                  : "text-slate-500"
              }`}
            >
              Newest First
            </button>
            <button
              onClick={() => setSortOrder("oldest")}
              className={`px-6 py-2 rounded-full text-sm font-bold ${
                sortOrder === "oldest"
                  ? "bg-[#1d4ed8] text-white"
                  : "text-slate-500"
              }`}
            >
              Oldest First
            </button>
          </div>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {displayedResources.map((res) => (
            <MaterialCard
              key={res.id}
              title={res.title}
              author={res.author}
              date={res.date}
              description={res.description}
              stream={res.stream}
              onView={() => console.log("view", res.id)}
              onDownload={() => console.log("download", res.id)}
            />
          ))}
        </div>

        {/* PAGINATION */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </main>
    </div>
  );
}
