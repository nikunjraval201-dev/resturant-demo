require("dotenv").config();

const app = require("./app");
const connectDB = require("./config/db");

const http = require("http");
const { Server } = require("socket.io");

const PORT = process.env.PORT || 5000;

// Connect Database
connectDB();

// Create HTTP Server
const server = http.createServer(app);

// Socket.io
const io = new Server(server, {
    cors: {
        origin: "*", // Production માં frontend URL આપવી
        methods: ["GET", "POST", "PUT", "DELETE"]
    }
});

console.log("✅ Socket.IO Server Started");

// Save io in Express app
app.set("io", io);
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Connection
io.on("connection", (socket) => {
    console.log("✅ Client Connected:", socket.id);

    socket.on("disconnect", () => {
        console.log("❌ Client Disconnected:", socket.id);
    });
});

// Start Server
server.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});