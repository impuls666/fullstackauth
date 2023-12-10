import { useEffect } from "react";
import { useAuthentication } from "@/hooks/useAuthentication";

import DashboardLayout from "@/layouts/Dashboard";
import Table from "@/components/Table";

function Dashboard() {
  const authenticated = useAuthentication();
  //const authenticated = true;
  useEffect(() => {
    console.log("Authenticated:", authenticated);
  }, [authenticated]);

  return (
    <DashboardLayout>
      <Table />
    </DashboardLayout>
  );
}

export default Dashboard;
