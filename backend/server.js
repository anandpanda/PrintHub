const app = require("./app");

const dotenv = require("dotenv");
const cloudinary = require("cloudinary");
dotenv.config({ path: "./config/config.env" });
const connectDatabase = require("./config/database.js");

connectDatabase();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
});
