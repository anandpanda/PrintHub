// const ErrorHandler = require("../utils/errorhandler");
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
    // console.log(req.body);
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
  // console.log(req);
  const { email, password } = req.body;

  if (!email || !password) {
    // console.log("email or pass nhi h");
    return res.status(400).json({
      success: false,
      message: "Please enter email and password",
    });
  }

  try {
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      // console.log("user nhi mila");
      return res.status(401).json({
        success: false,
        message: "Please enter email and password",
      });
    }
    // console.log("user mil gya");
    const isPasswordMatches = await user.comparePassword(password);

    if (!isPasswordMatches) {
      // console.log("password nhi match hua");
      return res.status(401).json({
        success: false,
        message: "Please enter email and password",
      });
    }
    sendToken(user, 200, res);
  } catch (error) {
    // Handle any unexpected errors
    return next(error);
  }
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

  // console.log(resetPasswordUrl, message);

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
  // console.log("after token nhi h");
  // console.log(req);
  const user = await User.findById(req.user.id);
  // console.log(user, "user");
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

  if (req.body.avatar !== "") {
    const user = await User.findById(req.user.id);

    const imageId = user.avatar.public_id;

    await cloudinary.v2.uploader.destroy(imageId);

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "avatars",
      width: 150,
      crop: "scale",
    });

    newUserData.avatar = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };
  }

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
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

  await User.findByIdAndUpdate(req.params.id, newUserData, {
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

    const imageId = user.avatar.public_id;
    await cloudinary.v2.uploader.destroy(imageId);

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
