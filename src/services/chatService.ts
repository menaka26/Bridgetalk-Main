import axios from "axios";

const API_URL = "http://localhost:5000/api/chat";

export const sendMessage = async (message: string) => {
  const res = await axios.post(API_URL, { message });
  return res.data.reply;
};
