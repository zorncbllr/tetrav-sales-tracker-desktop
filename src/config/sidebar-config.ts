import {
  ChartColumnBig,
  DollarSignIcon,
  Frame,
  FuelIcon,
  GalleryVerticalEnd,
  LayoutDashboard,
  Map,
  PenSquareIcon,
  PieChart,
  Settings2,
  UserSearchIcon,
} from "lucide-react";

export const sidebarConfig = {
  user: {
    name: "admin",
    email: "admin@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Tetra-V Inc.",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: LayoutDashboard,
      isActive: true,
    },
    {
      title: "Stock Levels",
      url: "#",
      icon: ChartColumnBig,
      isActive: true,
    },
    {
      title: "Readings",
      url: "#",
      icon: FuelIcon,
      isActive: true,
    },
    {
      title: "Vales",
      url: "#",
      icon: PenSquareIcon,
      isActive: true,
    },
    {
      title: "Accounts",
      url: "/accounts",
      icon: UserSearchIcon,
      isActive: true,
    },

    {
      title: "Sales",
      url: "#",
      icon: DollarSignIcon,
      isActive: true,
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};
