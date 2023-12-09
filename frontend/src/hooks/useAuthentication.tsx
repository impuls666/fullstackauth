import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const useAuthentication = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
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
          setErrorMessage("Login failed");
          navigate("/login");
        }
      } catch (error: any) {
        console.error("Login error:", error.message);
        setAuthenticated(false);
        setErrorMessage("An error occurred");
        navigate("/login");
      }
    };

    checkAuth();
  }, [navigate]); // Depend on navigate to avoid missing the latest navigate value

  return { authenticated, errorMessage };
};
