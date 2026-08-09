require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const authRoutes = require("./routes/auth");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: "1mb" }));

// Home / API status
app.get("/", (req, res) => {
  res.json({
    app: "Kalakaar",
    status: "online",
    message: "Kalakaar API is running."
  });
});

// Database health check
app.get("/api/health", (req, res) => {
  res.json({
    ok: true,
    database:
      mongoose.connection.readyState === 1
        ? "connected"
        : "disconnected"
  });
});

// Authentication routes
app.use("/api/auth", authRoutes);


// Start server
async function startServer() {
  try {

    if (!process.env.MONGODB_URI) {
      throw new Error(
        "MONGODB_URI is missing in environment variables."
      );
    }

    await mongoose.connect(
      process.env.MONGODB_URI
    );

    console.log("MongoDB connected.");

    app.listen(PORT, () => {
      console.log(
        `Kalakaar API running on port ${PORT}`
      );
    });

  } catch (error) {

    console.error(
      "Server startup failed:",
      error.message
    );

    process.exit(1);
  }
}

startServer();
