import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const TokenGenerator = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = await user.generateAccessToken();

    await user.save({validateBeforeSave:false});
    return accessToken;
  } catch (error) {
    
  }
}

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password").lean();
  return res.json(users);
});

const registerUser = asyncHandler(async (req, res) => {
  const { fullname, email, password } = req.body;
  if (
    [fullname, email, password].some((field) => field?.trim() === "")
  ) {
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
  const {email, password} = req.body;

  if (!email){
    throw new ApiError(400, "email required");
  }

  const user = await User.findOne({
    $or: [{ email }],
  });

  if (!user){
    throw new ApiError(404, "Email not found.")
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid){
    throw new ApiError(404, "Password is correct");
  }

  const accessToken = await TokenGenerator(user._id);

  const loggedInUser = await User.findById(user._id).select("-password").lean();

  const options = {
    httpOnly: true,
    secure: true,
  };

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
})

export { registerUser, getAllUsers, loginUser };
