// src/pages/Profile.jsx
import React from "react";

export default function Profile() {
  const user = JSON.parse(localStorage.getItem("user")) || {
    fullname: "User",
    email: "user@example.com",
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Profile</h1>
      <div style={styles.card}>
        <p><strong>Name:</strong> {user.fullname}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Member Since:</strong> January 2026</p>
      </div>
    </div>
  );
}

const styles = {
  container: { padding: "40px", textAlign: "center" },
  title: { fontSize: "2rem", marginBottom: "20px" },
  card: {
    margin: "0 auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    width: "300px",
    fontSize: "1rem",
    textAlign: "left",
  },
};