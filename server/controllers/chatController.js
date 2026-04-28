
import Chat from "../models/Chat.js";

export const sendChat = async (req, res) => {
  try {
    const { message } = req.body;
        console.log("API HIT:", message); // 👈 add this

    let reply = "";
   const text = message.toLowerCase();

if (text.includes("weather")) {
  reply = "Currently sunny 🌤️. Temperature around 30°C.";
} 
else if (text.includes("time")) {
  reply = `Current time is ${new Date().toLocaleTimeString()}`;
} 
else if (text.includes("date")) {
  reply = `Today's date is ${new Date().toDateString()}`;
} 
else if (text.includes("hello") || text.includes("hi")) {
  reply = "Hi! How can I assist you?";
} 
else {
  reply = `I understood "${message}". I'm your AI assistant.`;
}

    const chat = await Chat.create({
      question: message,
      answer: reply,
    });

    res.status(200).json({
      reply,
      chat,
    });
  } catch (error) {
    res.status(500).json({
      message: "Chat failed",
      error: error.message,
    });
  }
};
