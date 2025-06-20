const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const dotenv = require("dotenv");
const PORT = process.env.PORT || 3001;
const memeRoutes = require("./routes/memes.js");

// setup
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "https://meme-marketplace-beryl.vercel.app/",
    methods: ["GET", "POST"],
  },
});

// middlewares
dotenv.config();
app.use(cors({
  origin: ["https://meme-marketplace-beryl.vercel.app/"],
  methods: ["GET", "POST"],
}));
app.use(express.json());
app.use("/api/memes", memeRoutes);

io.on("connection", (socket) => {
  console.log("New socket connected: ", socket.id);

  // listening for new bids
  socket.on("newBid", (bid) => {
    console.log(`Recieved new bid: ${bid.amount} from ${socket.id}`);

    //emitting to all clients
    io.emit("bidUpdate", bid);
  });

  socket.on("disconnect", () => {
    console.log("Socket disconnected: ", socket.id);
  });
});

// routes
app.get("/", (req, res) => {
  res.send("root");
});

server.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
