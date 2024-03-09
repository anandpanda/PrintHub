const mongoose = require("mongoose") ;

const connectDatabase = async() => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Connection Successful, ${conn.connection.host}`);
    } catch (error) {
        console.log("Connection Failed");
    }
}

module.exports = connectDatabase;