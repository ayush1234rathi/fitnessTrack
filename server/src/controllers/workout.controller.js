import { asyncHandler } from "../utils/asyncHandler.js";
import { Workout } from "../models/workout.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// Add Workout with a Specific Date
const addWorkout = asyncHandler(async (req, res) => {
  const {
    category,
    workoutName,
    sets,
    reps,
    weight,
    duration,
    caloriesBurned,
    date,
  } = req.body;

  if (!category || !workoutName || !date) {
    throw new ApiError(400, "Category, workout name, and date are required");
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
    date: new Date(date),
  });

  return res
    .status(201)
    .json(new ApiResponse(201, newWorkout, "Workout added successfully"));
});

// Get Workouts by Date
const getWorkoutsByDate = asyncHandler(async (req, res) => {
  const { date } = req.params;
  const formattedDate = new Date(date).setHours(0, 0, 0, 0);

  const workouts = await Workout.find({
    user: req.user._id,
    date: {
      $gte: formattedDate,
      $lt: new Date(formattedDate).setHours(23, 59, 59, 999),
    },
  }).lean();

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        workouts,
        "Workouts for the selected date fetched successfully"
      )
    );
});

export { addWorkout, getWorkoutsByDate };
