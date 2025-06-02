import { Server } from "socket.io";
import ChatMessage from "../models/ChatMessage.js"; // 방금 만든 모델 import
import dotenv from "dotenv";
dotenv.config();

export default function setupSocket(server) {
  const io = new Server(server, {
    cors: { origin: process.env.FRONTEND_URL },
  });

  io.on("connection", async (socket) => {
    // 1. 접속 시 기존 채팅 메시지(예: 최신 50개) 전송
    const history = await ChatMessage.find()
      .sort({ createdAt: 1 })
      .limit(50)
      .lean();
    socket.emit("chat history", history);

    // 2. 메시지 수신 시 MongoDB에 저장 & 전체에 전송
    socket.on("chat message", async (msg) => {
      // msg: { user, text }
      const chat = new ChatMessage(msg);
      await chat.save();

      io.emit("chat message", chat); // 모든 클라이언트에 실시간 전송
    });
  });
}
