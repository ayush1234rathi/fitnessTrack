import { Router } from "express";
import { getAllUsers, registerUser, loginUser, logoutUser, deleteUser, updateUser, getCurrentUser, uploadProfilePicture } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../config/cloudinary.config.js";

const router = Router();

//getting all users
router.route("/getUsers").get(getAllUsers);

//register users
router.route("/register").post(registerUser);

//login users
router.route("/login").post(loginUser);

//logout users
router.route("/logout").post(verifyJWT, logoutUser);

//delete users
router.route("/delete/:userId").delete(verifyJWT, deleteUser);

//update
router.route("/update/:userId").patch(verifyJWT, updateUser);

//upload profile picture
router.route("/upload-profile-picture").post(verifyJWT, upload.single('profilePicture'), uploadProfilePicture);

//current logged in user
router.route("/CurUser").get(verifyJWT, getCurrentUser);

export default router;
