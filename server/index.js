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

// Import routes
const authenticationRoutes = require("./routes/AuthenticationRoutes");

// Use Routes
app.use("/", authenticationRoutes);

// Starting the server
app.listen(PORT, () => {
    console.log("Server is running on Port : " + PORT);
});