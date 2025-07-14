import { Button } from "@/components/ui/button";
import { useAccountStore } from "../store";

export default function AccountTabs() {
  const { setActiveTab, activeTab } = useAccountStore();

  return (
    <div className="border rounded-md grid grid-cols-3 w-[25rem] ">
      <Button
        variant={activeTab == "General" ? "secondary" : "ghost"}
        onClick={() => setActiveTab("General")}
        className="rounded-l-md rounded-r-none"
        size={"sm"}
      >
        General
      </Button>
      <Button
        variant={activeTab == "Individuals" ? "secondary" : "ghost"}
        onClick={() => setActiveTab("Individuals")}
        size={"sm"}
        className="rounded-none"
      >
        Individuals
      </Button>
      <Button
        variant={activeTab == "Offices" ? "secondary" : "ghost"}
        onClick={() => setActiveTab("Offices")}
        size={"sm"}
        className="rounded-r-md rounded-l-none"
      >
        Offices
      </Button>
    </div>
  );
}
