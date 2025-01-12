const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const db = require("./config/db");
const slotRoutes = require("./routes/slotRoutes");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", slotRoutes);

// Start Server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
