import axios from "axios";

  export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL ,
  withCredentials: true,
});

export const logout = async () => {
  try {
    await api.post("/auth/logout");
  } catch (error) {
    console.error("Error during logout:", error);
  }
};