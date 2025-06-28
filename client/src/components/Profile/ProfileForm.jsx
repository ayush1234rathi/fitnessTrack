import React from "react";
import Button from "../Button";

const ProfileForm = ({ user, handleChange, handleSubmit, loading }) => (
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
);

export default ProfileForm; 