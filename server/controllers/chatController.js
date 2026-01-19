
import Chat from "../models/Chat.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    let reply = "";

    const text = message.toLowerCase();

    if (text.includes("name")) {
      reply = "I am BridgeTalk AI 🤖";
    } else if (text.includes("hello")) {
      reply = "Hello 👋 How can I help you?";
    } else if (text.includes("how are you")) {
      reply = "I'm doing great 😊 Thanks for asking!";
    } else {
      reply = "Sorry, I am a free AI. Limited answers only 🙂";
    }

    // 🔥 SAVE TO MONGODB
    const chat = new Chat({ message, reply });
    await chat.save();

    res.json({ reply });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
