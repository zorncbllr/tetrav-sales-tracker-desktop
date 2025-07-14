import useBreadCrumb from "@/hooks/use-breadcrumb";
import Layout from "@/layouts/layout";

import { Button } from "@/components/ui/button";
import { ArrowUpDown, MoreHorizontal, Plus, UserSearch } from "lucide-react";
import AccountTabs from "./components/tabs";
import { DataTable } from "@/components/data-table";
import { Separator } from "@/components/ui/separator";
import { CardDescription, CardTitle } from "@/components/ui/card";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Account } from "./types";
import { useFetchAccounts } from "./api/queries";

export const columns: ColumnDef<Account>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "account_name",
    header: "Account Name",
    cell: ({ row }) => <div>{row.getValue("account_name")}</div>,
  },
  {
    accessorKey: "account_type",
    header: "Type",
    cell: ({ row }) => <div>{row.getValue("account_type")}</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const account = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="dark">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() =>
                navigator.clipboard.writeText(account.account_id.toString())
              }
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

function AccountsPage() {
  useBreadCrumb([
    {
      active: true,
      label: "Accounts",
      href: "/accounts",
    },
  ]);

  const { data } = useFetchAccounts();

  return (
    <Layout>
      <div className="space-y-4">
        <div className="flex flex-col gap-8">
          <div className="flex gap-4 items-start">
            <UserSearch className="p-2 rounded-full bg-secondary" size={35} />
            <div className="space-y-2">
              <CardTitle>Accounts</CardTitle>
              <CardDescription>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Veritatis quae non repellendus accusantium!
              </CardDescription>
            </div>
          </div>

          <AccountTabs />
        </div>

        <Separator />

        {data && (
          <DataTable
            filter="account_name"
            columns={columns}
            data={data}
            actions={[
              <Button variant={"outline"}>
                <Plus /> Add Account
              </Button>,
            ]}
          />
        )}
      </div>
    </Layout>
  );
}

export default AccountsPage;
