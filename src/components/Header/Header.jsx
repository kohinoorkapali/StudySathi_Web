import React from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/studysathi_2.png";

export default function Header() {
  return (
    <nav className="header">
      <div className="header-left">
        <img src={logo} alt="Logo" className="logo" />
      </div>

      <div className="header-center">
        <NavLink to="/dashboard" className="nav-btn">
          Dashboard
        </NavLink>
        <NavLink to="/browse" className="nav-btn">
          Browse
        </NavLink>
        <NavLink to="/resources" className="nav-btn">
          My Resources
        </NavLink>
      </div>

      <div className="header-right">
        <button className="upload-btn">Upload</button>
        <div className="profile">
          <span>RK</span>
        </div>
      </div>
    </nav>
  );
}
