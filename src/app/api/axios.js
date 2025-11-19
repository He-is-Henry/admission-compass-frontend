import axios from "axios";

export default axios.create({
  // baseURL: "http://localhost:5000",
  baseURL: "https://admission-compass-backend.onrender.com",
  withCredentials: true,
});
