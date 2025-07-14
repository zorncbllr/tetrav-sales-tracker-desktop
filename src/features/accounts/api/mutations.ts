import { queryClient } from "@/main";
import { useMutation } from "@tanstack/react-query";
import { invoke } from "@tauri-apps/api/core";
import { z } from "zod";
import { accountSchema } from "../types";

export const useAddAccount = () =>
  useMutation({
    mutationKey: ["accounts"],
    mutationFn: async (data: z.infer<typeof accountSchema>) =>
      invoke("add_account", data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["accounts"],
      });
    },

    onError: (error) => {
      console.log(error);
    },
  });
