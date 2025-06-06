import { Button } from "@/components/ui/button";
import { SignInForm } from "../components/SignInForm";
import { FuelIcon } from "lucide-react";

function SignIn() {
  return (
    <div className="h-full flex justify-center items-center relative">
      <div className="absolute hidden md:flex gap-4 items-center top-8 left-8">
        <Button>
          <FuelIcon />
        </Button>

        <h1 className="font-semibold">Tetra V Inc.</h1>
      </div>

      <SignInForm className="w-[25rem]" />
    </div>
  );
}

export default SignIn;
