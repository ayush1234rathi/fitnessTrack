import { asyncHandler } from "../utils/asyncHandler.js";
import { Workout } from "../models/workout.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// Add Workout
const addWorkout = asyncHandler(async (req, res) => {
  const { category, workoutName, sets, reps, weight, duration, caloriesBurned } = req.body;
  
  if (!category || !workoutName) {
    throw new ApiError(400, "Category and workout name are required");
  }

  const newWorkout = await Workout.create({
    user: req.user._id,
    category,
    workoutName,
    sets,
    reps,
    weight,
    duration,
    caloriesBurned,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, newWorkout, "Workout added successfully"));
});

// Get Workouts (For Logged-in User)
const getWorkouts = asyncHandler(async (req, res) => {
  const workouts = await Workout.find({ user: req.user._id }).lean();

  return res
    .status(200)
    .json(new ApiResponse(200, workouts, "User workouts fetched successfully"));
});

// Update Workout
const updateWorkout = asyncHandler(async (req, res) => {
  const { workoutId } = req.params;

  const updatedWorkout = await Workout.findOneAndUpdate(
    { _id: workoutId, user: req.user._id },
    req.body,
    { new: true, runValidators: true }
  );

  if (!updatedWorkout) {
    throw new ApiError(404, "Workout not found or unauthorized");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, updatedWorkout, "Workout updated successfully"));
});

// Delete Workout
const deleteWorkout = asyncHandler(async (req, res) => {
  const { workoutId } = req.params;

  const deletedWorkout = await Workout.findOneAndDelete({
    _id: workoutId,
    user: req.user._id,
  });

  if (!deletedWorkout) {
    throw new ApiError(404, "Workout not found or unauthorized");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Workout deleted successfully"));
});

export { addWorkout, getWorkouts, updateWorkout, deleteWorkout };