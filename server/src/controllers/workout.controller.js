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

  const totalCaloriesBurnt = await Workout.aggregate([
    { $match: { user: userId, date: { $gte: startToday, $lt: endToday }, done: true } },
    {
      $group: {
        _id: null,
        totalCaloriesBurnt: { $sum: "$caloriesBurned" },
      },
    },
  ]);

  const totalWorkouts = await Workout.countDocuments({
    user: userId,
    date: { $gte: startToday, $lt: endToday },
    done: true,
  });

  const avgCaloriesBurntPerWorkout =
    totalWorkouts > 0
      ? totalCaloriesBurnt[0]?.totalCaloriesBurnt / totalWorkouts
      : 0;

  const categoryCalories = await Workout.aggregate([
    { $match: { user: userId, date: { $gte: startToday, $lt: endToday }, done: true } },
    {
      $group: {
        _id: "$category",
        totalCaloriesBurnt: { $sum: "$caloriesBurned" },
      },
    },
  ]);

  const pieChartData = categoryCalories.map((category, index) => ({
    id: index,
    value: category.totalCaloriesBurnt,
    label: category._id,
  }));

  const weeks = [];
  const caloriesBurnt = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    weeks.push(`${date.getDate()}th`);

    const startOfDay = new Date(date.setHours(0, 0, 0, 0));
    const endOfDay = new Date(date.setHours(23, 59, 59, 999));

    const weekData = await Workout.aggregate([
      { $match: { user: userId, date: { $gte: startOfDay, $lt: endOfDay }, done: true } },
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

const ALLOWED_CATEGORIES = [
  "Chest",
  "Back",
  "Shoulders",
  "Biceps",
  "Triceps",
  "Abs / Core",
  "Glutes",
  "Quads",
  "Hamstrings",
  "Calves"
];

const addWorkout = asyncHandler(async (req, res) => {
  const { category, workoutName, sets, reps, weight, duration, dates, dayOfWeek } = req.body;

  if (!category || !workoutName || !dates || !Array.isArray(dates) || dates.length === 0) {
    throw new ApiError(400, "Category, workout name, and dates (array) are required");
  }

  if (!ALLOWED_CATEGORIES.includes(category)) {
    throw new ApiError(400, "Invalid category. Allowed: " + ALLOWED_CATEGORIES.join(", "));
  }

  if (dayOfWeek) {
    const allowedDays = [
      'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
    ];
    if (!allowedDays.includes(dayOfWeek)) {
      throw new ApiError(400, "Invalid dayOfWeek. Allowed: " + allowedDays.join(", "));
    }
  }

  const caloriesBurned = calculateCaloriesBurnt(weight, duration);

  const createdWorkouts = await Promise.all(
    dates.map(dateStr => {
      // Use new Date(dateStr) directly, which will interpret T00:00:00 as local time
      const localDate = new Date(dateStr);
      return Workout.create({
        user: req.user._id,
        category,
        workoutName,
        sets: sets || 0,
        reps: reps || 0,
        weight: weight || 0,
        duration: duration || 0,
        caloriesBurned,
        date: localDate,
        done: false,
        ...(dayOfWeek ? { dayOfWeek } : {}),
      });
    })
  );

  return res.status(201).json(new ApiResponse(201, createdWorkouts, "Workouts added successfully"));
});

const toggleWorkoutDone = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;
  const workout = await Workout.findOne({ _id: id, user: userId });
  if (!workout) {
    throw new ApiError(404, "Workout not found or not authorized");
  }
  workout.done = !workout.done;
  await workout.save();
  return res.status(200).json(new ApiResponse(200, workout, `Workout marked as ${workout.done ? 'done' : 'not done'}`));
});

const getWorkoutsByDate = asyncHandler(async (req, res, next) => {
  const userId = req.user?.id;
  const user = await User.findById(userId);
  
  if (!user) {
    return next(new ApiError(404, "User not found"));
  }

  let dateStr = req.query.date;
  let startOfDay, endOfDay;
  if (dateStr) {
    // Parse as local date
    const [yyyy, mm, dd] = dateStr.split('-').map(Number);
    startOfDay = new Date(yyyy, mm - 1, dd, 0, 0, 0, 0);
    endOfDay = new Date(yyyy, mm - 1, dd, 23, 59, 59, 999);
  } else {
    const now = new Date();
    startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
    endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);
  }

  // Find all workouts for this user where the date matches year, month, day (local)
  const todaysWorkouts = await Workout.find({
    user: userId,
    date: { $gte: startOfDay, $lte: endOfDay }
  });

  const totalCaloriesBurnt = todaysWorkouts.reduce(
    (total, workout) => total + (workout.done ? workout.caloriesBurned : 0),
    0
  );

  return res.status(200).json({ todaysWorkouts, totalCaloriesBurnt });
});

const deleteWorkout = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;
  const workout = await Workout.findOneAndDelete({ _id: id, user: userId });
  if (!workout) {
    throw new ApiError(404, "Workout not found or not authorized");
  }
  return res.status(200).json(new ApiResponse(200, {}, "Workout deleted successfully"));
});

const calculateCaloriesBurnt = (weight, duration) => {
  const weightInKg = parseFloat(weight) || 0;
  const durationInMinutes = parseFloat(duration) || 0;
  const caloriesBurntPerMinute = 5;
  return durationInMinutes * caloriesBurntPerMinute * weightInKg;
};

export { addWorkout, getWorkoutsByDate, getUserDashboard, deleteWorkout, toggleWorkoutDone };