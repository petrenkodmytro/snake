import axios from "axios";

export async function getPlayers() {
  const API_URL = "https://snake-bekend-lfqc.vercel.app/api/players";
  // http://localhost:8080/api/players
  // https://snake-bekend-lfqc.vercel.app/api/players

  try {
    const response = await axios.get(API_URL);
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
}

export async function addPlayer(player) {
  const API_URL = "https://snake-bekend-lfqc.vercel.app/api/players";
  // http://localhost:8080/api/players
  // https://snake-bekend-lfqc.vercel.app/api/players

  try {
    const response = await axios.post(API_URL, player);
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
}
