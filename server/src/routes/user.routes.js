import { Router } from "express";
import { getAllUsers, registerUser, loginUser, logoutUser, deleteUser, updateUser } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

//getting all users
router.route("/getUsers").get(getAllUsers);

//register users
router.route("/register").post(registerUser);

//login user
router.route("/login").post(loginUser);

//logout user
router.route("/logout").post(verifyJWT, logoutUser);

//delete
router.route("/delete/:userId").delete(verifyJWT, deleteUser);

//update
router.route("/update/:userId").patch(verifyJWT, updateUser);

export default router;
