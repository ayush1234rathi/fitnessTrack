import React from "react";

const ProfileAvatar = ({ user, uploading, handleImageUpload, handleKeyDown }) => (
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
);

export default ProfileAvatar; 