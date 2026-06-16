const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/categories", require("./config/routes/category"));
app.use("/api/menu", require("./config/routes/menu"));
app.use("/api/admin", require("./config/routes/adminRoutes"));
// Test Route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Restaurant Menu API Running",
  });
});

module.exports = app;
