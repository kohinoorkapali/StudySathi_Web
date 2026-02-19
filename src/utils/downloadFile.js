// src/utils/downloadFile.js
import axios from "axios";

export const downloadFile = async (id) => {
  try {
    const token = localStorage.getItem("access_token");

    const response = await axios.get(
      `http://localhost:5000/api/materials/download/${id}`,
      {
        responseType: "blob",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      }
    );

    const contentDisposition = response.headers["content-disposition"];
    let fileName = "material";

    if (contentDisposition) {
      const match = contentDisposition.match(/filename="?(.+)"?/);
      if (match) fileName = match[1];
    }

    const url = window.URL.createObjectURL(response.data);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url); // free memory
  } catch (err) {
    console.error("Download failed:", err);
  }
};
