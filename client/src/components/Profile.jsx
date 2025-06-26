import React, { useState, useEffect } from "react";
import axios from "axios";
import AlertMessage from "./AlertMessage";
import Button from "./Button";

// Utility for focus ring on avatar upload
const handleKeyDown = (e, inputId) => {
  if (e.key === "Enter" || e.key === " ") {
    document.getElementById(inputId).click();
  }
};

export default function Profile() {
  const [user, setUser] = useState({
    fullname: "",
    email: "",
    age: "",
    gender: "",
    weight: "",
    height: "",
    img: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchUserData();
    // eslint-disable-next-line
  }, []);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:8000/api/v1/users/CurUser", {
        withCredentials: true,
      });
      setUser(response.data.data);
      setError("");
    } catch (err) {
      setError("Failed to fetch user data");
      console.error("Error fetching user data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.patch(
        `http://localhost:8000/api/v1/users/update/${user._id}`,
        user,
        {
          withCredentials: true,
        }
      );
      setUser(response.data.data);
      setSuccess("Profile updated successfully!");
      setError("");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile");
      console.error("Error updating profile:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Only image files are allowed");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("File size should be less than 5MB");
      return;
    }
    const formData = new FormData();
    formData.append("profilePicture", file);
    try {
      setUploading(true);
      setError("");
      const response = await axios.post(
        "http://localhost:8000/api/v1/users/upload-profile-picture",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setUser(response.data.data);
      setSuccess("Profile picture updated successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Failed to upload profile picture";
      setError(errorMessage);
      console.error("Error uploading profile picture:", err);
    } finally {
      setUploading(false);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen bg-background">
        <span className="text-lg text-accent animate-pulse">Loading...</span>
      </div>
    );

  return (
    <main className="bg-background min-h-screen flex items-center justify-center p-4">
      <section className="bg-card shadow-2xl rounded-2xl p-10 max-w-lg w-full border-2 border-primary flex flex-col items-center">
        {/* Heading */}
        <h1 className="text-4xl font-display font-extrabold text-accent mb-8 text-center tracking-widest uppercase drop-shadow-lg">Profile</h1>

        {/* Alerts */}
        <AlertMessage type="error" message={error} />
        <AlertMessage type="success" message={success} />

        {/* Profile Avatar */}
        <div className="mb-8 flex flex-col items-center">
          <div className="relative w-32 h-32 mb-2 group">
            <img
              src={user.img || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.fullname || "User")}`}
              alt="Profile"
              className="w-full h-full rounded-full object-cover border-4 border-accent shadow-md transition-transform duration-300 group-hover:scale-105"
            />
            <label
              htmlFor="profilePicture"
              className="absolute bottom-0 right-0 bg-accent text-background p-2 rounded-full cursor-pointer hover:bg-background hover:text-accent focus:outline-none focus:ring-2 focus:ring-accent transition"
              aria-label="Upload profile picture"
              tabIndex={0}
              onKeyDown={(e) => handleKeyDown(e, "profilePicture")}
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" />
              </svg>
            </label>
            <input
              type="file"
              id="profilePicture"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              disabled={uploading}
            />
          </div>
          {uploading && <span className="text-xs text-accent animate-pulse">Uploading...</span>}
        </div>

        {/* Profile Form */}
        <form onSubmit={handleSubmit} className="space-y-6 w-full" autoComplete="off">
          <div>
            <label className="block text-accent font-display mb-1 uppercase tracking-widest" htmlFor="fullname">
              Full Name
            </label>
            <input
              id="fullname"
              type="text"
              name="fullname"
              value={user.fullname}
              onChange={handleChange}
              className="w-full p-3 border-2 border-primary rounded-lg focus:ring-2 focus:ring-accent font-sans text-base bg-background text-text placeholder:text-accent transition"
              required
              autoFocus
            />
          </div>
          <div>
            <label className="block text-accent font-display mb-1 uppercase tracking-widest" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={user.email}
              disabled
              className="w-full p-3 border-2 border-primary bg-card rounded-lg cursor-not-allowed font-sans text-base text-accent"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-accent font-display mb-1 uppercase tracking-widest" htmlFor="age">
                Age
              </label>
              <input
                id="age"
                type="number"
                name="age"
                value={user.age}
                onChange={handleChange}
                className="w-full p-3 border-2 border-primary rounded-lg font-sans text-base bg-background text-text placeholder:text-accent transition"
                min={0}
              />
            </div>
            <div>
              <label className="block text-accent font-display mb-1 uppercase tracking-widest" htmlFor="gender">
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                value={user.gender}
                onChange={handleChange}
                className="w-full p-3 border-2 border-primary rounded-lg font-sans text-base bg-background text-text placeholder:text-accent transition"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-accent font-display mb-1 uppercase tracking-widest" htmlFor="weight">
                Weight (kg)
              </label>
              <input
                id="weight"
                type="number"
                name="weight"
                value={user.weight}
                onChange={handleChange}
                className="w-full p-3 border-2 border-primary rounded-lg font-sans text-base bg-background text-text placeholder:text-accent transition"
                min={0}
              />
            </div>
            <div>
              <label className="block text-accent font-display mb-1 uppercase tracking-widest" htmlFor="height">
                Height (cm)
              </label>
              <input
                id="height"
                type="number"
                name="height"
                value={user.height}
                onChange={handleChange}
                className="w-full p-3 border-2 border-primary rounded-lg font-sans text-base bg-background text-text placeholder:text-accent transition"
                min={0}
              />
            </div>
          </div>
          <Button
            type="submit"
            loading={loading}
            className="w-full"
          >
            Update Profile
          </Button>
        </form>
      </section>
    </main>
  );
}
