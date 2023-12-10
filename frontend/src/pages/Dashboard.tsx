import { useEffect, useState } from "react";
import { useAuthentication } from "@/hooks/useAuthentication";

import DashboardLayout from "@/layouts/Dashboard";
import Table from "@/components/Table";

function Dashboard() {
  const authenticated = useAuthentication();
  const [userDetails, setUserDetails] = useState({});
  //const authenticated = true;
  useEffect(() => {
    console.log("Authenticated:", authenticated);

    setUserDetails(authenticated.data);
    console.log(authenticated.data);
  }, [authenticated]);

  return (
    <DashboardLayout userDetails={userDetails}>
      <Table />
    </DashboardLayout>
  );
}

export default Dashboard;
