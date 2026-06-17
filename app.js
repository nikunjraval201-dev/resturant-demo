require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/categories", require("./routes/categoryRoutes"));
app.use("/api/menuItems", require("./routes/menuRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/menu", require("./routes/groupRoutes"));
app.use("/api", require("./routes/uploadRoutes"));
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
