import { io } from "socket.io-client";

const SERVER_URL = "http://localhost:5001";

const socket = io(SERVER_URL, {
  transports: ["websocket"],
  withCredentials: true,
});

socket.on("connect", () => {
  console.log("Connected to WebSocket server");
});

socket.on("disconnect", () => {
  console.log("Disconnected from WebSocket server");
});

export default socket;
