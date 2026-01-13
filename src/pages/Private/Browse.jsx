// src/pages/Browse.jsx
import React from "react";
import Header from "../../components/Header/Header"; 

export default function Browse() {
  return (
    <div>
        <div style={styles.container}>
      <h1 style={styles.title}>Browse Resources</h1>
      <p style={styles.subtitle}>Explore educational content shared by others.</p>

      <div style={styles.grid}>
        <div style={styles.card}>📘 Math Notes</div>
        <div style={styles.card}>🧪 Chemistry Flashcards</div>
        <div style={styles.card}>🗺️ Geography Maps</div>
      </div>
    </div>
    </div>
  );
}

const styles = {
  container: { padding: "40px", textAlign: "center" },
  title: { fontSize: "2rem", marginBottom: "10px" },
  subtitle: { fontSize: "1.2rem", marginBottom: "30px" },
  grid: { display: "flex", gap: "20px", justifyContent: "center" },
  card: {
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    width: "200px",
    fontSize: "1rem",
  },
};