// src/pages/Private/Dashboard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header"; 

export default function Dashboard() {
  const navigate = useNavigate();

  // Fetch user info from localStorage
  const user = JSON.parse(localStorage.getItem("user")) || { fullname: "User" };

  const handleLogout = () => {
    // Remove token and user info
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");

    // Redirect to login page
    navigate("/login", { replace: true });
  };

  return (

    
    <div>

      <div style={styles.container}>
      <h1 style={styles.title}>Welcome to your Dashboard, {user.fullname}!</h1>
      <p style={styles.subtitle}>This is a private page. Only logged-in users can see this.</p>

      <div style={styles.content}>
        <div style={styles.card}>📚 Your Courses</div>
        <div style={styles.card}>🎯 Your Goals</div>
        <div style={styles.card}>📝 Tasks & Assignments</div>
      </div>

      <button style={styles.logoutBtn} onClick={handleLogout}>
        Logout
      </button>
    </div>
    </div>
  );
}

// Simple inline styles (replace with CSS if you want)
const styles = {
  container: {
    maxWidth: "800px",
    margin: "50px auto",
    padding: "20px",
    textAlign: "center",
    fontFamily: "sans-serif",
  },
  title: {
    fontSize: "2rem",
    marginBottom: "10px",
  },
  subtitle: {
    fontSize: "1.2rem",
    marginBottom: "30px",
  },
  content: {
    display: "flex",
    justifyContent: "space-around",
    marginBottom: "30px",
  },
  card: {
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    width: "150px",
    fontSize: "1rem",
  },
  logoutBtn: {
    padding: "10px 20px",
    backgroundColor: "#752e2e",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "1rem",
  },
};
