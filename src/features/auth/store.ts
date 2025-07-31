import Cookies from "js-cookie";
import { create } from "zustand";

interface AuthStore {
  token?: string;

  setToken: (token: string | undefined) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  token: Cookies.get("auth_token"),

  setToken: (token) => set((_) => ({ token })),
}));
