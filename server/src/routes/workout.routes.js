import { Router } from "express";
import { addWorkout, getUserDashboard, getWorkoutsByDate } from "../controllers/workout.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// Add Workout
router.route("/add").post(verifyJWT, addWorkout);

// Get All Workouts (For Logged-in User)
router.route("/getWorkouts").get(verifyJWT, getUserDashboard);

router.route("/getWorkoutsByDate").get(verifyJWT, getWorkoutsByDate);
export default router;