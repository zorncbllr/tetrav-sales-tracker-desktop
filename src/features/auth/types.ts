import { z } from "zod";

export const loginSchema = z.object({
  username: z
    .string({ message: "Username is required." })
    .min(1, "Username is required."),
  password: z
    .string({ message: "Password is required." })
    .min(1, "Password is required."),
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
