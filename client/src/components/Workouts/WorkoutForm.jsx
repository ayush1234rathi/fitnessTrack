import React from "react";
import Button from "../Button";
import AlertMessage from "../AlertMessage";

const WorkoutForm = ({ newWorkout, setNewWorkout, handleSubmit, loading, error }) => (
  <div className="bg-card shadow-xl rounded-xl border-2 border-primary p-8">
    <h2 className="text-xl font-display font-bold mb-4 text-accent uppercase tracking-widest">Add Workout</h2>
    <form onSubmit={handleSubmit} className="space-y-4">
      <AlertMessage type="error" message={error} />
      <input type="text" placeholder="Workout Name" value={newWorkout.workoutName} onChange={(e) => setNewWorkout({ ...newWorkout, workoutName: e.target.value })} className="border-2 border-primary p-3 rounded-lg focus:ring-2 focus:ring-accent w-full text-text bg-background placeholder:text-accent" required/>
      <select
        value={newWorkout.category}
        onChange={(e) => setNewWorkout({ ...newWorkout, category: e.target.value })}
        className="border-2 border-primary p-3 rounded-lg focus:ring-2 focus:ring-accent w-full text-text bg-background placeholder:text-accent"
        required
      >
        <option value="">Select Category</option>
        <option value="Chest">Chest</option>
        <option value="Back">Back</option>
        <option value="Shoulders">Shoulders</option>
        <option value="Biceps">Biceps</option>
        <option value="Triceps">Triceps</option>
        <option value="Abs / Core">Abs / Core</option>
        <option value="Glutes">Glutes</option>
        <option value="Quads">Quads</option>
        <option value="Hamstrings">Hamstrings</option>
        <option value="Calves">Calves</option>
      </select>
      <select
        value={newWorkout.dayOfWeek}
        onChange={(e) => setNewWorkout({ ...newWorkout, dayOfWeek: e.target.value })}
        className="border-2 border-primary p-3 rounded-lg focus:ring-2 focus:ring-accent w-full text-text bg-background placeholder:text-accent"
      >
        <option value="">(Optional) Select Day of Week</option>
        <option value="Sunday">Sunday</option>
        <option value="Monday">Monday</option>
        <option value="Tuesday">Tuesday</option>
        <option value="Wednesday">Wednesday</option>
        <option value="Thursday">Thursday</option>
        <option value="Friday">Friday</option>
        <option value="Saturday">Saturday</option>
      </select>
      <input type="number" placeholder="Sets" value={newWorkout.sets} onChange={(e) => setNewWorkout({ ...newWorkout, sets: e.target.value })} className="border-2 border-primary p-3 rounded-lg focus:ring-2 focus:ring-accent w-full text-text bg-background placeholder:text-accent" required/>
      <input type="number" placeholder="Reps" value={newWorkout.reps} onChange={(e) => setNewWorkout({ ...newWorkout, reps: e.target.value })} className="border-2 border-primary p-3 rounded-lg focus:ring-2 focus:ring-accent w-full text-text bg-background placeholder:text-accent" required/>
      <input type="number" placeholder="Weight (kg)" value={newWorkout.weight} onChange={(e) => setNewWorkout({ ...newWorkout, weight: e.target.value })} className="border-2 border-primary p-3 rounded-lg focus:ring-2 focus:ring-accent w-full text-text bg-background placeholder:text-accent" required/>
      <input type="number" placeholder="Duration (min)" value={newWorkout.duration} onChange={(e) => setNewWorkout({ ...newWorkout, duration: e.target.value })} className="border-2 border-primary p-3 rounded-lg focus:ring-2 focus:ring-accent w-full text-text bg-background placeholder:text-accent" required/>
      <Button type="submit" loading={loading} className="w-full">Add Workout</Button>
    </form>
  </div>
);

export default WorkoutForm; 