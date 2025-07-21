import useBreadCrumb from "@/hooks/use-breadcrumb";
import Layout from "@/layouts/layout";

import { Button } from "@/components/ui/button";
import { UserSearch } from "lucide-react";
import AccountTabs from "./components/tabs";
import { DataTable } from "@/components/data-table";
import { Separator } from "@/components/ui/separator";
import { CardDescription, CardTitle } from "@/components/ui/card";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Account } from "./types";
import { useFetchAccounts } from "./api/queries";
import AddAccountButton from "./components/add-button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useAccountStore } from "./store";

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
    accessorKey: "account_id",
    header: "ID",
    cell: ({ row }) => (
      <div className="w-fit">{row.getValue("account_id")}</div>
    ),
  },
  {
    accessorKey: "account_name",
    header: () => <h1 className="w-full flex justify-center">Account Name</h1>,
    cell: ({ row }) => (
      <div className="w-full flex justify-center">
        {row.getValue("account_name")}
      </div>
    ),
  },
  {
    accessorKey: "account_type",
    header: () => <h1 className="flex justify-center">Type</h1>,
    cell: ({ row }) => (
      <div className="flex justify-center">
        <Badge
          className={cn(
            "text-white backdrop-blur-sm",
            row.original.account_type == "Individual"
              ? "bg-blue-500/20 border border-blue-400/10 shadow-sm shadow-blue-500/5 hover:bg-blue-500/30 transition-all"
              : "bg-green-500/20 border border-green-400/10 shadow-sm shadow-green-500/5 hover:bg-green-500/30 transition-all"
          )}
        >
          {row.getValue("account_type")}
        </Badge>
      </div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const account = row.original;

      return (
        <div className="flex justify-end gap-2">
          <Button>Edit</Button>
          <Button variant={"outline"}>Remove</Button>
        </div>
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
  const { activeTab } = useAccountStore();

  function getActiveTabData(
    activeTab: "General" | "Individuals" | "Offices",
    data: Account[]
  ) {
    if (activeTab == "Individuals") {
      return data.filter((dt) => dt.account_type == "Individual");
    }
    if (activeTab == "Offices") {
      return data.filter((dt) => dt.account_type == "Office");
    }

    return data;
  }

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
            data={getActiveTabData(activeTab, data)}
            actions={[<AddAccountButton />]}
          />
        )}
      </div>
    </Layout>
  );
}

export default AccountsPage;
