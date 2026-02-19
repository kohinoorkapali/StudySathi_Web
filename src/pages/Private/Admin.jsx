import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useApi } from "../../Hooks/useApi"; // your API helper

export default function AdminUsers() {
  const { callApi } = useApi();
  const [users, setUsers] = useState([]);

  // Fetch all users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await callApi("GET", "/users");
        setUsers(res.data || []);
      } catch (err) {
        console.error("Failed to fetch users", err);
      }
    };
    fetchUsers();
  }, [callApi]);

  // Table columns
  const columns = [
    { name: "Name", selector: (row) => row.name, sortable: true },
    { name: "Email", selector: (row) => row.email, sortable: true },
    { name: "Role", selector: (row) => row.role || "student", sortable: true },
    { name: "Joined", selector: (row) => new Date(row.createdAt).toLocaleDateString(), sortable: true },
  ];

  // Custom styles for react-data-table-component using Tailwind
  const customStyles = {
    rows: {
      style: {
        minHeight: "60px",
      },
    },
    headCells: {
      style: {
        fontSize: "16px",
        fontWeight: "600",
        backgroundColor: "#f3f4f6", // Tailwind bg-gray-100
        color: "#1f2937", // Tailwind text-gray-800
        paddingLeft: "16px",
        paddingRight: "16px",
      },
    },
    cells: {
      style: {
        fontSize: "14px",
        paddingLeft: "16px",
        paddingRight: "16px",
      },
    },
  };

  return (
    <div className="p-6 bg-blue-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Admin - All Users</h1>
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <DataTable
          columns={columns}
          data={users}
          pagination
          highlightOnHover
          striped
          customStyles={customStyles}
          noHeader
        />
      </div>
    </div>
  );
}
