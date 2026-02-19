import React, { useState } from "react";
import pdfIcon from "./../assets/pdf.png";
import docIcon from "./../assets/doc.png";
import pptIcon from "./../assets/ppt.png";
import defaultIcon from "./../assets/file.png";
import descIcon from "./../assets/description.png";
import streamIcon from "./../assets/stream.png";
import authorIcon from "./../assets/author.png";
import dateIcon from "./../assets/date.png";

export default function MaterialCard({
  title,
  author,
  date,
  description,
  stream,
  filePath, // <-- for the modal
  onView,
  onDownload,
}) {
  const [showPreview, setShowPreview] = useState(false);

  // Get file image based on extension
  const getFileIcon = (filePath) => {
    if (!filePath) return defaultIcon;
    const ext = filePath.split(".").pop().toLowerCase();
    switch (ext) {
      case "pdf":
        return pdfIcon;
      case "doc":
      case "docx":
        return docIcon;
      case "ppt":
      case "pptx":
        return pptIcon;
      default:
        return defaultIcon;
    }
  };

  const fileType = filePath ? filePath.split(".").pop().toUpperCase() : "FILE";

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all group">
      {/* Card Content */}
      <div className="flex flex-col gap-2 mb-5">
        <h4 className="font-bold text-slate-800 text-lg group-hover:text-blue-600 transition-colors">
          {title}
        </h4>

        {(author || date) && (
          <div className="flex items-center gap-2 text-sm text-slate-500">
            {author && <span>by <span className="font-medium">{author}</span></span>}
            {author && date && <span className="mx-1">•</span>}
            {date && <span>{date}</span>}
          </div>
        )}

        {description && <p className="text-slate-600 text-sm line-clamp-3">{description}</p>}

        {stream && (
          <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-md text-xs font-bold border border-blue-100/50 inline-block w-fit">
            {stream}
          </span>
        )}
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-4 border-t border-gray-50">
        <button
          onClick={() => setShowPreview(true)}
          className="bg-blue-400 text-white px-5 py-2 rounded-lg text-sm font-bold hover:bg-blue-500 transition-colors shadow-sm active:scale-95"
        >
          View
        </button>
        <button
          onClick={onDownload}
          className="bg-[#1d4ed8] text-white px-5 py-2 rounded-lg text-sm font-bold hover:bg-blue-800 transition-colors shadow-sm active:scale-95"
        >
          Download
        </button>
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <div
          className="fixed inset-0 bg-black/40 flex items-start justify-center z-50 p-4 pt-10 overflow-y-auto"
          onClick={(e) => e.target.classList.contains("fixed") && setShowPreview(false)}
        >
          <div className="bg-white rounded-2xl max-w-lg w-full min-h-[500px] p-6 relative shadow-lg">
            {/* Close Button */}
            <button
              onClick={() => setShowPreview(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 font-bold text-xl"
            >
              &times;
            </button>

            {/* Title */}
            <h3 className="text-3xl font-bold mb-6">{title}</h3>

            {/* File Card with Image Icon */}
            <div className="border rounded-lg p-6 mb-8 bg-gray-50 border-gray-200 text-center">
              <div className="mb-3">
                <img
                  src={getFileIcon(filePath)}
                  alt="File Icon"
                  className="w-16 h-16 mx-auto"
                />
              </div>
              <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-md text-sm font-bold border border-blue-100/50">
                {fileType}
              </span>
              {filePath && <p className="mt-2 text-sm text-gray-600">{filePath}</p>}
            </div>

            {/* Details with image icons */}
            <div className="flex flex-col gap-6 text-gray-700 text-sm">
              {description && (
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2 mb-1">
                    <img src={descIcon} alt="Description" className="w-5 h-5" />
                    <h4 className="font-semibold text-gray-700">Description</h4>
                  </div>
                  <p className="text-gray-600">{description}</p>
                </div>
              )}

              {stream && (
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2 mb-1">
                    <img src={streamIcon} alt="Stream" className="w-5 h-5" />
                    <h4 className="font-semibold text-gray-700">Stream</h4>
                  </div>
                  <span className="text-blue-600 px-2 py-1 bg-blue-50 rounded-md w-fit">
                    {stream}
                  </span>
                </div>
              )}

              {author && (
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2 mb-1">
                    <img src={authorIcon} alt="Author" className="w-5 h-5" />
                    <h4 className="font-semibold text-gray-700">Uploaded By</h4>
                  </div>
                  <span>{author}</span>
                </div>
              )}

              {date && (
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2 mb-1">
                    <img src={dateIcon} alt="Upload Date" className="w-5 h-5" />
                    <h4 className="font-semibold text-gray-700">Upload Date</h4>
                  </div>
                  <span>{date}</span>
                </div>
              )}

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
