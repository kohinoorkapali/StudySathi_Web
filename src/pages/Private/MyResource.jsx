// src/pages/MyResources.jsx
import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import UploadCard from "../../components/PersonalUploadCard/PersonalUploadCard"; // import the card we built

export default function MyResources() {
  const [resources, setResources] = useState([]);

  // Fetch resources from backend
  useEffect(() => {
  const userId = localStorage.getItem("user_id"); // saved at login

  fetch(`http://localhost:5000/api/materials/my?user_id=${userId}`)
    .then(res => res.json())
    .then(result => {
      console.log("My materials:", result.data);
      setResources(result.data);
    })
    .catch(err => console.error(err));
}, []);

  return (
    <div>
      <div style={styles.container}>
        <h1 style={styles.title}>My Resources</h1>
        <p style={styles.subtitle}>Here are the materials you've uploaded.</p>

        {resources.length === 0 ? (
          <p>No resources uploaded yet.</p>
        ) : (
          <div style={styles.list}>
            {resources.map((res) => (
              <UploadCard
                key={res.id}
                title={res.title}
                category={res.stream}
                date={new Date(res.createdAt).toLocaleDateString()}
                views={res.views}
                likes={res.likes}
                onDelete={() => console.log("Delete", res.id)}
                onView={() => console.log("View", res.id)}
                onEdit={() => console.log("Edit", res.id)}
              />
            ))}

          </div>
        )}
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