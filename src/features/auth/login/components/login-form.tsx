import { Button } from "@/components/ui/button";
import { CardDescription } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { EyeIcon, EyeOffIcon, Loader } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginData, loginSchema } from "../../types";
import { useState } from "react";
import { useAuth } from "../../hooks/auth-hook";

function LoginForm() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      remember_me: false,
    },
  });

  const { login } = useAuth();

  const onSubmit = async (data: LoginData) => {
    setLoading(true);

    setTimeout(async () => {
      const { success, error } = await login(data);

      if (!success) {
        if (error?.username) {
          form.setError("username", {
            message: error.username,
          });
        }

        if (error?.password) {
          form.setError("password", {
            message: error.password,
          });
        }
      }

      setLoading(false);
    }, 1000);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-[25rem] grid gap-4 p-4"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Username<span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Password<span className="text-red-500">*</span>
              </FormLabel>
              <div className="relative">
                <FormControl>
                  <Input type={showPassword ? "text" : "password"} {...field} />
                </FormControl>
                <button
                  type="button"
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOffIcon size={18} />
                  ) : (
                    <EyeIcon size={18} />
                  )}
                </button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="remember_me"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <CardDescription>Remember me</CardDescription>
              </div>
            </FormItem>
          )}
        />

        {loading ? (
          <Button disabled>
            Logging in <Loader className="animate-spin" />
          </Button>
        ) : (
          <Button type="submit">Login</Button>
        )}
      </form>
    </Form>
  );
}

export default LoginForm;
