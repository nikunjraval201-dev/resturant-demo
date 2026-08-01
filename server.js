require("dotenv").config();

const app = require("./app");
const connectDB = require("./config/db");

const http = require("http");
const { Server } = require("socket.io");

const PORT = process.env.PORT || 5000;

connectDB();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",  // ✅ specific origin
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true                  // ✅ credentials add karo
  }
});

console.log("✅ Socket.IO Server Started");

app.set("io", io);
app.use((req, res, next) => {
  req.io = io;
  next();
});

io.on("connection", (socket) => {
  console.log("✅ Client Connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("❌ Client Disconnected:", socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});