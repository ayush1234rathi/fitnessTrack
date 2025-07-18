import { Router } from "express";
import { addWorkout, getUserDashboard, getWorkoutsByDate, deleteWorkout, toggleWorkoutDone } from "../controllers/workout.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// Add Workout
router.route("/add").post(verifyJWT, addWorkout);

// Delete Workout
router.route("/delete/:id").delete(verifyJWT, deleteWorkout);

// Get All Workouts (For Logged-in User)
router.route("/getWorkouts").get(verifyJWT, getUserDashboard);

router.route("/getWorkoutsByDate").get(verifyJWT, getWorkoutsByDate);

// Toggle Done Status
router.route("/toggleDone/:id").patch(verifyJWT, toggleWorkoutDone);

export default router;