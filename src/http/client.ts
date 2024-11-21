import axios from "axios";
import { useAuthStore } from "../store";

export const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API_URL,
  withCredentials: true, //This is needed to store cookies in browser
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

//const refreshToken = () => api.post("/auth/refresh");

async function refreshToken() {
  try {
    await axios.post(
      `${import.meta.env.VITE_BACKEND_API_URL}/auth/refresh`,
      {},
      { withCredentials: true } // Ensure cookies are sent
    );
  } catch (error) {
    console.error("Failed to refresh token", error);
    throw error;
  }
}

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Check if the error is 401 and prevent infinite loops
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      try {
        originalRequest._retry = true;
        await refreshToken();
        return api(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        useAuthStore.getState().logout(); //Advantage of usign Zustand as we can add it here as well
        return Promise.reject(refreshError);
      }
    }
    // Reject other errors
    return Promise.reject(error);
  }
);
