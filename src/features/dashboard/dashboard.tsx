import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useAuth } from "../auth/hooks/auth-hook";

function Dashboard() {
  const { logout } = useAuth();
  return (
    <div className="w-full, h-screen grid place-items-center">
      <div className="flex flex-col gap-4 items-center">
        <Label className="text-xl font-semibold">Welcome User</Label>
        <Button onClick={logout}>Log out</Button>
      </div>
    </div>
  );
}

export default Dashboard;
