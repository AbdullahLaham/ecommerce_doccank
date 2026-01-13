import axios from "axios";

export const api = axios.create({
  baseURL: "https://docank.mahmoudalbatran.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});
