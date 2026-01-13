import React from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/studysathi_2.png";

export default function Header() {
  const token = localStorage.getItem("access_token");

  if (!token) return null; // don't render Header at all if not logged in

  return (
    <nav className="header">
      <div className="header-left">
        <img src={logo} alt="Logo" className="logo" />
      </div>

      <div className="header-center">
        <NavLink to="/dashboard" className="nav-btn">Dashboard</NavLink>
        <NavLink to="/browse" className="nav-btn">Browse</NavLink>
        <NavLink to="/resources" className="nav-btn">My Resources</NavLink>
      </div>

      <div className="header-right">
        <NavLink to="/upload" className="upload-btn">Upload</NavLink>
        <div className="profile"><span>RK</span></div>
      </div>
    </nav>
  );
}
