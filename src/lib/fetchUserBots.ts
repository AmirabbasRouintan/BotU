import axios from "axios";

export async function fetchUserBots() {
  const response = await axios.get("http://localhost:8000/auth/bots/");
  return response.data;
}