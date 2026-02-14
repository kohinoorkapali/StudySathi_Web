import React from "react";

export default function MaterialCard({
  title,
  author,
  date,
  description,
  stream,
  onView,
  onDownload,
}) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all group">
      <div className="flex flex-col gap-2 mb-5">
        {/* Title */}
        <h4 className="font-bold text-slate-800 text-lg group-hover:text-blue-600 transition-colors">
          {title}
        </h4>

        {/* Author + Date */}
        {(author || date) && (
          <p className="text-sm text-slate-500">
            {author && (
              <>
                by <span className="font-medium">{author}</span>
              </>
            )}
            {author && date && <span className="mx-1">•</span>}
            {date && <span>{date}</span>}
          </p>
        )}

        {/* Description */}
        {description && (
          <p className="text-slate-600 text-sm line-clamp-3">
            {description}
          </p>
        )}

        {/* Stream Tag */}
        {stream && (
          <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-md text-xs font-bold border border-blue-100/50 inline-block w-fit">
            {stream}
          </span>
        )}
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-gray-50">
        {onView && (
          <button
            onClick={onView}
            className="bg-blue-400 text-white px-5 py-2 rounded-lg text-sm font-bold hover:bg-blue-500 transition-colors shadow-sm active:scale-95"
          >
            View
          </button>
        )}
        <button
          onClick={onDownload}
          className="bg-[#1d4ed8] text-white px-5 py-2 rounded-lg text-sm font-bold hover:bg-blue-800 transition-colors shadow-sm active:scale-95"
        >
          Download
        </button>
      </div>
    </div>
  );
}
