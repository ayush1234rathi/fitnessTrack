import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const TokenGenerator = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = await user.generateAccessToken();

    await user.save({ validateBeforeSave: false });
    return accessToken;
  } catch (error) {
    throw new ApiError(500, "Internal Server Error");
  }
};

const getCurrentUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return res.status(200).json(new ApiResponse(200, user, "User fetched successfully"));
});


const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password").lean();
  return res.json(users);
});

const registerUser = asyncHandler(async (req, res) => {
  const { fullname, email, password } = req.body;
  if ([fullname, email, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  const existedUser = await User.findOne({
    $or: [{ email }],
  });

  if (existedUser) {
    throw new ApiError(409, "User already exist");
  }

  const user = await User.create({
    fullname,
    email,
    password,
  });

  const createdUser = await User.findById(user._id).select("-password");

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    throw new ApiError(400, "email required");
  }

  const user = await User.findOne({
    $or: [{ email }],
  });

  if (!user) {
    throw new ApiError(404, "Email not found.");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(404, "Password is invalid");
  }

  const accessToken = await TokenGenerator(user._id);

  const loggedInUser = await User.findById(user._id).select("-password").lean();

  const options = {
    httpOnly: true,
    secure: true,
    sameSite: 'None'
  };

  console.log(loggedInUser);

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
        },
        "User logged in successfully"
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  // console.log(req.user)
  const options = {
    httpOnly: true,
    secure: true,
    sameSite: 'None'
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .json(new ApiResponse(200, {}, "User logged Out"));
});

const deleteUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const user = await User.findByIdAndDelete(userId);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "User deleted successfully"));
});

const updateUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const updates = req.body;
  console.log(updates);
  if (updates.password) {
    throw new ApiError(400, "Use password change endpoint to update password");
  }

  const updatedUser = await User.findByIdAndUpdate(userId, updates, {
    new: true,
    runValidators: true,
  }).select("-password");

  if (!updatedUser) {
    throw new ApiError(404, "User not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, updatedUser, "User updated successfully"));
});

const uploadProfilePicture = asyncHandler(async (req, res) => {
  try {
    if (!req.file) {
      throw new ApiError(400, "No file uploaded");
    }

    // Validate file type
    if (!req.file.mimetype.startsWith('image/')) {
      throw new ApiError(400, "Only image files are allowed");
    }

    // Validate file size (5MB limit)
    if (req.file.size > 5 * 1024 * 1024) {
      throw new ApiError(400, "File size should be less than 5MB");
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { img: req.file.path },
      { new: true }
    ).select("-password");

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    return res
      .status(200)
      .json(new ApiResponse(200, user, "Profile picture uploaded successfully"));
  } catch (error) {
    console.error("Profile picture upload error:", error);
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(500, "Failed to upload profile picture: " + error.message);
  }
});

export {
  registerUser,
  getAllUsers,
  loginUser,
  logoutUser,
  deleteUser,
  updateUser,
  getCurrentUser,
  uploadProfilePicture,
};
