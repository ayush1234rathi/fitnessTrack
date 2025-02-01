import { Router } from "express";
import { addWorkout, getWorkouts, updateWorkout, deleteWorkout } from "../controllers/workout.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// Add Workout
router.route("/add").post(verifyJWT, addWorkout);

// Get All Workouts (For Logged-in User)
router.route("/getWorkouts").get(verifyJWT, getWorkouts);

// Update Workout
router.route("/update/:workoutId").patch(verifyJWT, updateWorkout);

// Delete Workout
router.route("/delete/:workoutId").delete(verifyJWT, deleteWorkout);

export default router;