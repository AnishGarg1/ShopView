const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const database = require("./config/database");

// middlewares
dotenv.config();
app.use(express.json());
app.use(
    cors({
        origin: "*",
        credentials: true
    })
)

// Connecting to database
database.connect();

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`)
})