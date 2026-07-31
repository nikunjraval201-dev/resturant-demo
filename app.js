require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  req.io = req.app.get("io");   // dynamically request time પર read કરે
  next();
});

app.use("/api/categories", require("./routes/categoryRoutes"));
app.use("/api/menuItems", require("./routes/menuRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/menu", require("./routes/groupRoutes"));
app.use("/api", require("./routes/uploadRoutes"));

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Restaurant API Running",
  });
});

module.exports = app;