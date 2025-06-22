import { invoke } from "@tauri-apps/api/core";
import Cookies from "js-cookie";

export const useAuth = () => {
  const login = async (username: string, password: string) => {
    try {
      const response = await invoke<{ token: string; user_id: string }>(
        "login",
        {
          credentials: { username, password },
        }
      );

      Cookies.set("auth_token", response.token, { expires: 1 }); // 1 day expiry
      return { success: true, user: response.user_id };
    } catch (error) {
      return { success: false, error: error as string };
    }
  };

  const verifyToken = async () => {
    const token = Cookies.get("auth_token");
    if (!token) return { valid: false };

    try {
      const userId = await invoke<string>("verify_token", { token });
      return { valid: true, userId };
    } catch {
      Cookies.remove("auth_token");
      return { valid: false };
    }
  };

  const logout = () => {
    Cookies.remove("auth_token");
  };

  return { login, verifyToken, logout };
};
