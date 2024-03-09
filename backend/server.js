const app = require("./app");

const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });
const connectDatabase = require("./config/database.js");

connectDatabase();

app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
});
