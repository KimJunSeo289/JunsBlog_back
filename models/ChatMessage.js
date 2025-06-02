import mongoose from "mongoose";

const ChatMessageSchema = new mongoose.Schema({
  user: String,    // 보낸 사람
  text: String,    // 메시지 본문
  createdAt: {     // 보낸 시간
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("ChatMessage", ChatMessageSchema);
