const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

exports.isAuthenticatedUser = async (req, res, next) => {
    const token = req.cookies.token ;
    
    if(!token){
        return "please login to acces the resource" ;
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decodedData) ;
    req.user = await User.findById(decodedData.id) ;  
    next() ;
}

exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)){
            //console.log(`${req.user.role} role is not allowed to access this resource`) ;
            return  ;
        }
        next() ;
    }
}