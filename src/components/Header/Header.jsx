import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/studysathi_2.png";

export default function Header() {
  const token = localStorage.getItem("access_token");
  const role = localStorage.getItem("role"); // read role directly
  const navigate = useNavigate();

  if (!token) return null;

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("role");
    localStorage.removeItem("user_id");
    navigate("/login", { replace: true });
  };

  return (
    <nav className="header">
      <div className="header-left">
        <img src={logo} alt="Logo" className="logo" />
      </div>

      {/* User header */}
      {role === "user" && (
        <>
          <div className="header-center">
            <NavLink to="/dashboard" className="nav-btn">Dashboard</NavLink>
            <NavLink to="/browse" className="nav-btn">Browse</NavLink>
            <NavLink to="/resources" className="nav-btn">My Resources</NavLink>
          </div>

          <div className="header-right">
            <NavLink to="/upload" className="upload-btn">Upload</NavLink>
            <NavLink to="/profile" className="profile-btn">Profile</NavLink>
          </div>
        </>
      )}

      {/* Admin header */}
      {role === "admin" && (
        <div className="header-right">
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      )}
    </nav>
  );
}
