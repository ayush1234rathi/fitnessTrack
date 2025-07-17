import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import AlertMessage from "./AlertMessage";
import ProfileAvatar from "./Profile/ProfileAvatar";
import ProfileForm from "./Profile/ProfileForm";
import Loading from "./Loading";

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
      const response = await axios.get("https://fitness-server-0bzg.onrender.com/api/v1/users/CurUser", {
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

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.patch(
        `https://fitness-server-0bzg.onrender.com/api/v1/users/update/${user._id}`,
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
  }, [user]);

  const handleImageUpload = useCallback(async (e) => {
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
        "https://fitness-server-0bzg.onrender.com/api/v1/users/upload-profile-picture",
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
  }, []);

  if (loading)
    return <Loading message="Loading profile..." />;

  return (
    <main className="min-h-screen flex items-center justify-center p-4 ">
      <section className="bg-card shadow-2xl rounded-2xl p-10 max-w-lg w-full border-2 border-primary flex flex-col items-center">
        {/* Heading */}
        <h1 className="text-4xl font-display font-extrabold text-accent mb-8 text-center tracking-widest uppercase drop-shadow-lg">Profile</h1>

        {/* Alerts */}
        <AlertMessage type="error" message={error} />
        <AlertMessage type="success" message={success} />

        <ProfileAvatar user={user} uploading={uploading} handleImageUpload={handleImageUpload} handleKeyDown={handleKeyDown} />
        <ProfileForm user={user} handleChange={handleChange} handleSubmit={handleSubmit} loading={loading} />
      </section>
    </main>
  );
}
