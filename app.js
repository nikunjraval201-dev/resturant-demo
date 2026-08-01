require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");

const app = express();

connectDB();

app.get("/", (req, res) => {
  res.status(200).send("Server is alive!");
});

app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174","https://gloriousdays.netlify.app/"],
  credentials: true
}));
app.use(express.json());

app.use("/api/categories", require("./routes/categoryRoutes"));
app.use("/api/menuItems", require("./routes/menuRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/menu", require("./routes/groupRoutes"));
app.use("/api", require("./routes/uploadRoutes"));

module.exports = app;   // ✅ Bas app export karo — server/socket.io atlyaan na banavo