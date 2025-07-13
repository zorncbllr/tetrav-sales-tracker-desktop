import useBreadCrumb from "@/hooks/use-breadcrumb";
import Layout from "@/layouts/layout";

function AccountsPage() {
  useBreadCrumb([
    {
      active: true,
      label: "Accounts",
      href: "/accounts",
    },
  ]);

  return (
    <Layout>
      <div>Accounts</div>
    </Layout>
  );
}

export default AccountsPage;
