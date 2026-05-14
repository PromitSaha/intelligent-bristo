import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://10.104.130.57:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;