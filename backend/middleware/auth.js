const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.isAuthenticatedUser = async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        // console.log("token nhi h");
        return res.status(401).json({
            message: "Login first to access this resource",
        });
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(decodedData);
    req.user = await User.findById(decodedData.id);
    next();
};

exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(
                res.status(403).json({
                    message: `Role (${req.user.role}) is not allowed to access this resource`,
                })
            );
        }
        next();
    };
};
