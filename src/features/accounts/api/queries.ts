import { useQuery } from "@tanstack/react-query";
import { invoke } from "@tauri-apps/api/core";
import { Account } from "../types";

export const useFetchAccounts = () =>
  useQuery({
    queryKey: ["accounts"],
    queryFn: () => invoke<Account[]>("get_accounts"),
  });
