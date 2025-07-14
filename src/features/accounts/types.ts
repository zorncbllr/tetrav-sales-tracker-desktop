import { z } from "zod";

export interface Account {
  account_id: number;
  account_name: string;
  account_type: "Offices" | "Individual" | "Station";
}

export const accountSchema = z.object({
  accountName: z.string().min(1, "Account name is required"),
  accountType: z.enum(["Office", "Individual", "Station"], {
    message: "Account type is required",
  }),
});
