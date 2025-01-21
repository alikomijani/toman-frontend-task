import axios from "axios";
const baseURL = "http://localhost:8000/";
const api = axios.create({
  baseURL: baseURL,
  validateStatus: function (status) {
    return status >= 200 && status < 400;
  },
});

export default api;
