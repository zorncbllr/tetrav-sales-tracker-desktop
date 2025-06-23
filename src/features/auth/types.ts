import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().min(1, "Username is required."),
  password: z.string().min(1, "Password is required."),
  remember_me: z.boolean(),
});

export type LoginData = z.infer<typeof loginSchema>;

export interface LoginResponse {
  token: string;
  user_id: number;
}

export interface AuthError {
  username?: string;
  password?: string;
}
