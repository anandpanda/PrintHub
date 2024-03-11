const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const cloudinary = require("cloudinary");

exports.registerUser = async (req, res, next) => {
  try {
    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "avatars",
      width: 150,
      crop: "scale",
    });

    const { name, email, password } = req.body;
    console.log(req.body);
    const user = await User.create({
      name,
      email,
      password,
      avatar: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
    });

    sendToken(user, 201, res);
  } catch (error) {
    next(error);
  }
};

exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return "Please Enter Email and Password";
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return "Invalid Email or Password";
  }

  const isPasswordMatches = user.comparePassword(password);

  if (!isPasswordMatches) {
    res.status(404).json({
      sucess: false,
      message: `incorrect password`,
    });
  }

  sendToken(user, 200, res);
};

exports.logOutUser = async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged out",
  });
};

exports.forgotPassword = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return "User not found with this email";
  }

  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/password/reset/${resetToken}`;

  const message = `Your password reset token is as follow : \n\n${resetPasswordUrl}\n\nIf you have not requested this email, then ignore it.`;

  console.log(resetPasswordUrl, message);

  try {
    await sendEmail({
      email: user.email,
      subject: "Printhub Password Recovery",
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to : ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });
    return "Email could not be sent";
  }
};

exports.resetPassword = async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return "Password reset token is invalid or has been expired";
  }

  if (req.body.password !== req.body.confirmPassword) {
    return "Password does not match";
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(user, 200, res);
};

exports.getUserDetails = async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
};

exports.updatePassword = async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

  if (!isPasswordMatched) {
    return "Old Password is incorrect";
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return "Password does not match";
  }

  user.password = req.body.newPassword;

  await user.save();

  sendToken(user, 200, res);
};

exports.updateProfile = async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };

  const user = User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    newValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
};

exports.updateRole = async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  const user = User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    newValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
};

// admin route
exports.getAllUsers = async (req, res, next) => {
  const users = await User.find();

  if (!users) {
    return "No user found";
  }

  res.status(200).json({
    success: true,
    users,
  });
};

exports.getSingleUser = async (req, res, next) => {
  const user = await User.find();

  if (!user) {
    return "No user found";
  }

  res.status(200).json({
    success: true,
    user,
  });
};

exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(406).json({
        success: false,
        message: "No user found",
      });
    }

    await User.deleteOne({ _id: req.params.id });

    res.status(200).json({
      success: true,
      message: "User is deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
