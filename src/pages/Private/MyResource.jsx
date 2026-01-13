// src/pages/MyResources.jsx
import React from "react";
import Header from "../../components/Header/Header"; 

export default function MyResources() {
  return (
    <div>
        <div style={styles.container}>
      <h1 style={styles.title}>My Resources</h1>
      <p style={styles.subtitle}>Here are the materials you've uploaded.</p>

      <ul style={styles.list}>
        <li>📄 English Essay - Grade 10</li>
        <li>📊 Science Project Slides</li>
        <li>📚 History Timeline PDF</li>
      </ul>
    </div>
    </div>
  );
}

const styles = {
  container: { padding: "40px", textAlign: "center" },
  title: { fontSize: "2rem", marginBottom: "10px" },
  subtitle: { fontSize: "1.2rem", marginBottom: "30px" },
  list: { listStyle: "none", padding: 0, fontSize: "1rem" },
};