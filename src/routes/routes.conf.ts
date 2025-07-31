import AuthPage from "@/features/auth/page";
import DashboardPage from "@/features/dashboard/page";
import React from "react";

interface Route {
  path: string;
  page: React.FC;
  protected?: boolean;
}

export const getRoutes = (): Route[] => [
  {
    path: "/auth",
    page: AuthPage,
    protected: false,
  },
  {
    path: "/",
    page: DashboardPage,
    protected: true,
  },
];
