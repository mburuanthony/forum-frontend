import axios from "axios";

export const axiosconfig = axios.create({
  baseURL: "https://music-forum-backend.herokuapp.com/",
  headers: { "Content-Type": "application/json" },
});
