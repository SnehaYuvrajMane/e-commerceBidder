import express from "express";
import {Server as webServer } from "socket.io";
import cors from "cors";
import http from "http";
import { createBid } from "./controllers/bidController.js";
import router from "./routes/route.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

const server = http.createServer(app);
const io = new webServer(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});


io.on("connection", (socket) => {
    console.log(`Socket connected: ${socket.id}`);

    socket.on("bid", async (data) => {
        socket.join(data);
        const bids = await createBid(data);
        socket.emit("bid", bids);
    });


    socket.on("disconnect", () => {
        console.log(`Socket disconnected: ${socket.id}`);
    }
    );
}
);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
