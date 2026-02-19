// src/pages/BrowsePage/BrowsePage.jsx
import React, { useState, useEffect } from "react";
import Pagination from "../../components/Pagination";
import MaterialCard from "../../components/MaterialCard";
import { useApi } from "../../Hooks/useApi";
import { downloadFile } from "../../utils/downloadFile";
import filterIcon from "../../assets/filter.png"; // <-- your filter image

export default function BrowsePage() {
  const [resources, setResources] = useState([]);
  const [sortOrder, setSortOrder] = useState("newest");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false); // toggle for mobile
  const itemsPerPage = 12;

  const streams = [
    "Science", "Commerce", "Arts", "Engineering", "Medical",
    "Law", "Management", "IT", "Education", "Humanities"
  ];

  const [selectedStreams, setSelectedStreams] = useState([]);
  const { callApi } = useApi();

  // Fetch materials
  useEffect(() => {
    const fetchResources = async () => {
      try {
        const data = await callApi("GET", "/materials");
        setResources(data.data || []);
      } catch (err) {
        console.error("Failed to fetch materials:", err);
      }
    };
    fetchResources();
  }, [callApi]);

  const toggleStream = (stream) => {
    setSelectedStreams(prev =>
      prev.includes(stream)
        ? prev.filter(s => s !== stream)
        : [...prev, stream]
    );
    setCurrentPage(1);
  };

  const filteredResources = resources.filter(res => {
    const matchesSearch =
      res.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (res.author && res.author.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStream =
      selectedStreams.length === 0 || selectedStreams.includes(res.stream);
    return matchesSearch && matchesStream;
  });

  const sortedResources = [...filteredResources].sort((a, b) => {
    const dateA = new Date(a.createdAt || a.date);
    const dateB = new Date(b.createdAt || b.date);
    return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
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

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString();
  };

  return (
    <div className="flex min-h-screen bg-blue-100 font-sans text-slate-700">
      {/* FILTER ICON FOR MOBILE */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
  <img
    src={filterIcon}
    alt="Filters"
    className="w-8 h-8 cursor-pointer rounded-lg"
    onClick={() => setShowFilters(true)}
  />
</div>

      {/* SIDEBAR */}
      <aside
        className={`fixed top-0 left-0 h-full w-72 bg-blue-200 border-r border-slate-200 p-8 overflow-y-auto z-40 transition-transform duration-300
          ${showFilters ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static lg:flex flex-col`}
      >
        {/* Close button for mobile */}
        <div className="lg:hidden mb-6 flex justify-end">
          <button
            onClick={() => setShowFilters(false)}
            className="text-red-600 font-bold text-lg px-3 py-1 rounded-lg hover:bg-red-100 transition"
          >
            X
          </button>
        </div>

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
      </aside>

      {/* OVERLAY FOR MOBILE */}
      {showFilters && (
        <div
          className="fixed inset-0 bg-black/30 z-30 lg:hidden"
          onClick={() => setShowFilters(false)}
        />
      )}

      {/* MAIN CONTENT */}
      <main className="flex-1 p-6 lg:p-10">
        {/* SEARCH */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by title or author..."
            className="w-full p-5 rounded-2xl border border-gray-200 bg-white shadow-sm text-lg
                      focus:outline-none focus:ring-2 focus:ring-orange-100 focus:border-orange-500"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        {/* FILTERS BELOW SEARCH ON MOBILE */}
        {showFilters && (
          <div className="lg:hidden mb-6 p-4 bg-blue-200 rounded-xl">
            <h3 className="font-bold text-sm text-slate-500 uppercase tracking-wider mb-3">
              Stream
            </h3>
            <div className="flex flex-wrap gap-3">
              {streams.map((s) => (
                <label key={s} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedStreams.includes(s)}
                    onChange={() => toggleStream(s)}
                    className="w-4 h-4 rounded border-gray-300 text-blue-600"
                  />
                  <span className="text-sm text-slate-600">{s}</span>
                </label>
              ))}
            </div>
            <button
              onClick={clearFilters}
              className="mt-4 w-full py-2.5 border border-blue-500 text-blue-600 rounded-lg hover:bg-blue-50 font-semibold text-sm"
            >
              Clear All Filters
            </button>
          </div>
        )}

        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between mb-8 gap-4">
          <span className="text-blue-600 font-bold text-lg">
            {filteredResources.length} resources found
          </span>

          <div className="flex bg-gray-200/60 p-1 rounded-full">
            <button
              onClick={() => setSortOrder("newest")}
              className={`px-6 py-2 rounded-full text-sm font-bold ${
                sortOrder === "newest" ? "bg-[#1d4ed8] text-white" : "text-slate-500"
              }`}
            >
              Newest First
            </button>
            <button
              onClick={() => setSortOrder("oldest")}
              className={`px-6 py-2 rounded-full text-sm font-bold ${
                sortOrder === "oldest" ? "bg-[#1d4ed8] text-white" : "text-slate-500"
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
              date={formatDate(res.createdAt || res.date)}
              description={res.description}
              stream={res.stream}
              onView={() => console.log("view", res.id)}
              onDownload={() => downloadFile(res.id)}
              filePath={res.file_path}
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
