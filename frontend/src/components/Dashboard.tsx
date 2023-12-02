import axios from "axios";
import { useEffect, useState } from "react";

function Dashboard() {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    // Check authentication status on component mount
    checkAuthentication();
  }, []);

  const checkAuthentication = async () => {
    try {
      const response = await axios.get("http://localhost:4000/checkAuth", {
        withCredentials: true,
      });

      // Assuming a successful response has a status code in the range 200-299
      if (response.status >= 200 && response.status < 300) {
        // Save the token in your application state or localStorage
        console.log("response:", response);
        setAuthenticated(true);
        // Example of saving to localStorage

        // Redirect or perform other actions after successful login
      } else {
        throw new Error("Login failed");
      }
    } catch (error) {
      console.error("Login error:", error.message);
      // Handle login error, e.g., show an error message to the user
    }
  };

  return <div>Dashboard</div>;
}

export default Dashboard;
