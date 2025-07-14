import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Loader, Plus, UserPlus2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { accountSchema } from "../types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAddAccount } from "../api/mutations";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";

function AddAccountButton() {
  const { mutate, isPending } = useAddAccount();

  const form = useForm<z.infer<typeof accountSchema>>({
    defaultValues: {
      accountName: "",
      accountType: undefined,
    },
    resolver: zodResolver(accountSchema),
  });

  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button variant={"outline"}>
          <Plus /> Add Account
        </Button>
      </DialogTrigger>
      <DialogContent className="dark text-foreground">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((data) => {
              mutate(data);
              setOpen(false);
            })}
          >
            <DialogHeader>
              <div className="flex gap-4 items-start">
                <UserPlus2
                  className="p-2 rounded-full bg-secondary"
                  size={40}
                />

                <div className="space-y-2">
                  <DialogTitle>Add New Account</DialogTitle>
                  <DialogDescription>
                    Please provide all required fields to continue creating a
                    new acccount.
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>

            <Separator />

            <div className="space-y-4 py-4">
              <FormField
                control={form.control}
                name="accountName"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Account Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter account name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="accountType"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Account Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select account type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="dark">
                        <SelectItem value="Individual">Individual</SelectItem>
                        <SelectItem value="Office">Office</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <DialogClose>
                <Button type="button" variant={"outline"}>
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit">
                {isPending ? (
                  <>
                    Creating <Loader className="animate-spin" />
                  </>
                ) : (
                  "Create"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default AddAccountButton;
