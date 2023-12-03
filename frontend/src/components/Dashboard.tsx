import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { ThemeProvider } from "./theme-provider";
import { ModeToggle } from "./mode-toggle";

function Dashboard() {
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check authentication status on component mount
    checkAuthentication();
  }, [authenticated]);

  const checkAuthentication = async () => {
    try {
      const response = await axios.get("http://localhost:4000/checkAuth", {
        withCredentials: true,
      });

      // Assuming a successful response has a status code in the range 200-299
      if (response.status >= 200 && response.status < 300) {
        console.log("response:", response);
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
        navigate("/login");
        throw new Error("Login failed");
      }
    } catch (error: any) {
      console.error("Login error:", error.message);
      navigate("/login");
    }
  };

  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Navbar />
        <ModeToggle />
        <Sidebar />
      </ThemeProvider>
    </>
  );
}

export default Dashboard;
