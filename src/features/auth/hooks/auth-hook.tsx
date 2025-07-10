import { invoke } from "@tauri-apps/api/core";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";
import { AuthError, LoginData, LoginResponse } from "../types";
import { useAuthStore } from "../store";

export const useAuth = () => {
  const navigate = useNavigate();
  const { setToken, token } = useAuthStore();

  const login = async ({ username, password, remember_me }: LoginData) => {
    console.log(username);

    try {
      const response = await invoke<LoginResponse>("attempt_login", {
        username,
        password,
      });

      if (remember_me) {
        Cookies.set("auth_token", response.token, { expires: 7 });
      }

      setToken(response.token);
      navigate("/");
      return { success: true, user: response.user_id };
    } catch (error) {
      return { success: false, error: error as AuthError };
    }
  };

  const verifyToken = async () => {
    console.log("token: " + token);
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
    setToken(undefined);
    navigate("/");
  };

  return { login, verifyToken, logout };
};
