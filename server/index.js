// Import dependencies
const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

// Port Number declaration
const PORT = process.env.PORT;

const app = express();

app.set("view engine", "ejs");

// Middleware
app.use(express.json());

// Starting the server
app.listen(PORT, () => {
    console.log("Server is running on Port : " + PORT);
});