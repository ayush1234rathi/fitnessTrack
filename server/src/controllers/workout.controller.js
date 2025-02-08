import { asyncHandler } from "../utils/asyncHandler.js";
import { Workout } from "../models/workout.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";

const getUserDashboard = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const today = new Date();
  const startToday = new Date(today.setHours(0, 0, 0, 0));
  const endToday = new Date(today.setHours(23, 59, 59, 999));

  // 🔹 Calculate total calories burnt today
  const totalCaloriesBurnt = await Workout.aggregate([
    { $match: { user: userId, date: { $gte: startToday, $lt: endToday } } },
    {
      $group: {
        _id: null,
        totalCaloriesBurnt: { $sum: "$caloriesBurned" },
      },
    },
  ]);

  // 🔹 Calculate total workouts today
  const totalWorkouts = await Workout.countDocuments({
    user: userId,
    date: { $gte: startToday, $lt: endToday },
  });

  // 🔹 Calculate average calories burnt per workout
  const avgCaloriesBurntPerWorkout =
    totalWorkouts > 0
      ? totalCaloriesBurnt[0]?.totalCaloriesBurnt / totalWorkouts
      : 0;

  // 🔹 Get calorie data per workout category (for Pie Chart)
  const categoryCalories = await Workout.aggregate([
    { $match: { user: userId, date: { $gte: startToday, $lt: endToday } } },
    {
      $group: {
        _id: "$category",
        totalCaloriesBurnt: { $sum: "$caloriesBurned" },
      },
    },
  ]);

  // 🔹 Format Pie Chart Data
  const pieChartData = categoryCalories.map((category, index) => ({
    id: index,
    value: category.totalCaloriesBurnt,
    label: category._id,
  }));

  // 🔹 Weekly Calories Burnt Data
  const weeks = [];
  const caloriesBurnt = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    weeks.push(`${date.getDate()}th`);

    const startOfDay = new Date(date.setHours(0, 0, 0, 0));
    const endOfDay = new Date(date.setHours(23, 59, 59, 999));

    const weekData = await Workout.aggregate([
      { $match: { user: userId, date: { $gte: startOfDay, $lt: endOfDay } } },
      {
        $group: {
          _id: null,
          totalCaloriesBurnt: { $sum: "$caloriesBurned" },
        },
      },
    ]);

    caloriesBurnt.push(weekData[0]?.totalCaloriesBurnt || 0);
  }

  return res.status(200).json({
    totalCaloriesBurnt:
      totalCaloriesBurnt.length > 0 ? totalCaloriesBurnt[0].totalCaloriesBurnt : 0,
    totalWorkouts,
    avgCaloriesBurntPerWorkout,
    totalWeeksCaloriesBurnt: {
      weeks,
      caloriesBurned: caloriesBurnt,
    },
    pieChartData,
  });
});

// Add Workout with a Specific Date
const addWorkout = asyncHandler(async (req, res) => {
  const { category, workoutName, sets, reps, weight, duration, date } =
    req.body;

  if (!category || !workoutName || !date) {
    throw new ApiError(400, "Category, workout name, and date are required");
  }

  const caloriesBurned = calculateCaloriesBurnt(weight, duration);

  const newWorkout = await Workout.create({
    user: req.user._id,
    category,
    workoutName,
    sets: sets || 0,
    reps: reps || 0,
    weight: weight || 0,
    duration: duration || 0,
    caloriesBurned,
    date: new Date(date),
  });

  return res
    .status(201)
    .json(new ApiResponse(201, newWorkout, "Workout added successfully"));
});

// Get Workouts by Date
const getWorkoutsByDate = asyncHandler(async (req, res, next) => {
  const userId = req.user?.id;
  const user = await User.findById(userId);
  
  if (!user) {
    return next(new ApiError(404, "User not found"));
  }

  let date = req.query.date ? new Date(req.query.date) : new Date();
  
  // Ensure start and end of the day are properly formatted
  const startOfDay = new Date(date.setHours(0, 0, 0, 0));
  const endOfDay = new Date(date.setHours(23, 59, 59, 999));

  const todaysWorkouts = await Workout.find({
    user: userId, // ✅ FIXED: Using 'user' instead of 'userId'
    date: { $gte: startOfDay, $lt: endOfDay },
  });

  const totalCaloriesBurnt = todaysWorkouts.reduce(
    (total, workout) => total + workout.caloriesBurned,
    0
  );

  return res.status(200).json({ todaysWorkouts, totalCaloriesBurnt });
});


const calculateCaloriesBurnt = (weight, duration) => {
  const weightInKg = parseFloat(weight) || 0;
  const durationInMinutes = parseFloat(duration) || 0;
  const caloriesBurntPerMinute = 5;
  return durationInMinutes * caloriesBurntPerMinute * weightInKg;
};

export { addWorkout, getWorkoutsByDate, getUserDashboard };