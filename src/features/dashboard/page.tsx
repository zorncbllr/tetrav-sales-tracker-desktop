import useBreadCrumb from "@/hooks/use-breadcrumb";
import Layout from "@/layouts/layout";

function Dashboard() {
  useBreadCrumb([
    {
      active: true,
      label: "Dashboard",
      href: "/",
    },
  ]);

  return (
    <Layout>
      <div>Dashboard</div>
    </Layout>
  );
}

export default Dashboard;
