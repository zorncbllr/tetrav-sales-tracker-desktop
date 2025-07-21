import { FuelIcon } from "lucide-react";
import LoginForm from "./components/login-form";
import { Separator } from "@/components/ui/separator";
import { CardContent, CardDescription, CardTitle } from "@/components/ui/card";

function LoginPage() {
  return (
    <div className="w-full h-screen grid place-items-center">
      <div className="space-y-4 flex flex-col items-center w-[25rem]">
        <CardContent className="flex items-start gap-6">
          <div className="p-3 bg-accent rounded-2xl border">
            <FuelIcon size={24} />
          </div>
          <div className="space-y-2 text-justify">
            <CardTitle>Tetra-V Sales Tracker</CardTitle>
            <CardDescription>
              By continuing, you confirm to agree to our terms and condition.
            </CardDescription>
          </div>
        </CardContent>
        <Separator />
        <LoginForm />
        <Separator />

        <CardDescription>
          Last logged in: {new Date().toLocaleString()}
        </CardDescription>
      </div>
    </div>
  );
}

export default LoginPage;
