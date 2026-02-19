import React, { useState, useEffect } from "react";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

useEffect(() => {
  const userId = localStorage.getItem("user_id");
  const token = localStorage.getItem("access_token");

  if (!userId) {
    setError("User not logged in");
    setLoading(false);
    return;
  }

  // Fetch user info
  const fetchUser = fetch(`http://localhost:5000/api/users/${userId}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  }).then((res) => {
    if (!res.ok) throw new Error("Failed to fetch user data");
    return res.json();
  });

  // Fetch user's uploaded materials
  const fetchUploads = fetch(
    `http://localhost:5000/api/materials/my?user_id=${userId}`,
    {
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    }
  ).then((res) => {
    if (!res.ok) throw new Error("Failed to fetch uploads");
    return res.json();
  });

  // Wait for both fetches
  Promise.all([fetchUser, fetchUploads])
    .then(([userData, uploadsData]) => {
      const backendUser = userData.data;
      const uploadsCount = uploadsData.data ? uploadsData.data.length : 0;

      setUser({
        name: backendUser.fullname,
        handle: backendUser.username,
        email: backendUser.email,
        stats: { uploads: uploadsCount},
      });
      setLoading(false);
    })
    .catch((err) => {
      setError(err.message);
      setLoading(false);
    });
}, []);


  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user_id");
    localStorage.removeItem("role");
    window.location.href = "/login";
  };

  if (loading) return <div className="p-6 text-center">Loading profile...</div>;
  if (error) return <div className="p-6 text-center text-red-600">Error: {error}</div>;
  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-100 p-6 md:p-12 font-sans text-slate-900">
      <div className="max-w-6xl mt-12 mx-auto bg-white rounded-[2.5rem] shadow-xl p-8 md:p-12 relative overflow-hidden">
        {/* Edit Button */}
        <div className="absolute top-6 right-8 md:top-8 md:right-12">
          <button className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:bg-indigo-700 shadow-lg transition-all flex items-center gap-2">
            Edit Profile
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Side */}
          <div className="lg:col-span-4 flex flex-col items-center lg:border-r border-slate-100 lg:pr-12 mt-8 lg:mt-12 lg:pl-20">
            <div className="w-40 h-40 rounded-full bg-blue-600 flex items-center justify-center text-5xl font-bold text-white shadow-lg mb-6">
              {user?.name ? user.name.split(" ").map((n) => n[0]).join("") : ""}
            </div>
            <h2 className="text-3xl font-black text-slate-800 text-center leading-tight">
              {user?.name || ""}
            </h2>
          </div>

          {/* Right Side - Credentials */}
          <div className="lg:col-span-8 pt-12 lg:pt-15">
            <div className="space-y-2 mb-10">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between py-5 border-b border-slate-300">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">Full Name</span>
                <span className="text-xl font-semibold text-slate-700">{user?.name || ""}</span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between py-5 border-b border-slate-300">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">Username</span>
                <span className="text-xl font-semibold text-slate-700">{user?.handle || ""}</span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between py-5 border-b border-slate-300">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">Email Address</span>
                <span className="text-xl font-semibold text-slate-700">{user?.email || ""}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        {/* Stats Section - Centered */}
<div className="mt-12 flex justify-center">
  <div className="bg-blue-100 rounded-2xl p-6 flex flex-col items-center shadow-sm w-80">
    <span className="text-3xl font-bold text-blue-900">{user?.stats?.uploads || 0}</span>
    <span className="text-sm font-semibold text-blue-600 uppercase tracking-wide mt-2">Total Uploads</span>
  </div>
</div>



        {/* Logout Button */}
        <div className="mt-12 flex justify-end">
          <button
            className="px-5 py-2 bg-red-100 text-red-600 font-semibold rounded-lg hover:bg-red-200 transition-all"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
