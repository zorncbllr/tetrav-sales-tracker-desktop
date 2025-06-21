import { Button } from "@/components/ui/button";
import { CardDescription } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EyeIcon } from "lucide-react";

function LoginForm() {
  return (
    <div className="w-[25rem] grid gap-4 p-4">
      <div className="grid gap-2">
        <Label>Username</Label>
        <Input />
      </div>

      <div className="grid gap-2">
        <Label>Password</Label>
        <div className="grid relative place-items-center">
          <Input />
          <EyeIcon className="absolute right-2" size={18} />
        </div>

        <div className="flex items-center gap-2">
          <Checkbox />
          <CardDescription>Remember me</CardDescription>
        </div>
      </div>

      <Button className="mt-2">Login</Button>
    </div>
  );
}

export default LoginForm;
