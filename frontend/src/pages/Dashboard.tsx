import { useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import { useAuthentication } from "@/hooks/useAuthentication";

function Dashboard() {
  const authenticated = useAuthentication();
  useEffect(() => {
    console.log("Authenticated:", authenticated);
  }, [authenticated]);

  return (
    <>
      <Sidebar />
    </>
  );
}

export default Dashboard;
