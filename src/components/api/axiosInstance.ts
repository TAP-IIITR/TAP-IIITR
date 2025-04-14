import axios from "axios";

const api = axios.create({
  baseURL: "https://s6dohx6twlodp6xdapdb4q4pea0gsvia.lambda-url.ap-south-1.on.aws/api", // Your backend base URL
  withCredentials: true, // This ensures cookies (like the token) are sent with requests
});

// Add a response interceptor to handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access (e.g., redirect to login)
      console.error("Unauthorized access. Please log in again.");
      // Optionally redirect to login page
      // window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
