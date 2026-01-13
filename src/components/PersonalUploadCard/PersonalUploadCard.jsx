import React from "react";
import "./PersonalUploadCard.css";
import eyeIcon from "../../assets/eye_open.png";   // your asset
import editIcon from "../../assets/edit.png";      // optional
import deleteIcon from "../../assets/delete.png";  // optional

const UploadCard = ({ title, category, date, onDelete, onView, onEdit }) => {
  return (
    <div className="upload-card">
      {/* Info */}
      <div className="upload-info">
        <h3 className="upload-title">{title}</h3>
        <p className="upload-category">{category}</p>
        <p className="upload-date">Uploaded on {date}</p>
      </div>

      {/* Actions */}
      <div className="upload-actions">
        {onView && (
          <button className="icon-btn" onClick={onView} title="View">
            <img src={eyeIcon} alt="View" />
          </button>
        )}

        <button className="icon-btn" onClick={onEdit} title="Edit">
          <img src={editIcon} alt="Edit" />
        </button>

        <button className="icon-btn delete" onClick={onDelete} title="Delete">
          <img src={deleteIcon} alt="Delete" />
        </button>
      </div>
    </div>
  );
};

export default UploadCard;
