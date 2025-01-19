import { Router } from "express";
import { getAllUsers, registerUser, loginUser } from "../controllers/user.controller.js";


const router = Router();

//getting all users
router.route("/getUsers").get(getAllUsers);

//register users
router.route("/register").post(registerUser);

//login user
router.route("/login").post(loginUser);
router.route("/logout").post(verifyJWT, logout);

export default router;
