import { create } from "zustand";

export const useAuthStore = create((set) => ({
  isAuthenticated: !!localStorage.getItem("authToken"),
  login: (username, password) => {
    if (username === "test" && password === "password") {
      localStorage.setItem("authToken", "fake-token");
      set({ isAuthenticated: true });
      return true;
    }
    return false;
  },
  logout: () => {
    localStorage.removeItem("authToken");
    set({ isAuthenticated: false });
  },
}));
