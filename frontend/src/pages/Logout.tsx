import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const performLogout = async () => {
      try {
        await axios.post(
          "http://localhost:4000/auth/logout",
          {},
          { withCredentials: true }
        );
      } catch (error) {
        console.error("Logout failed", error);
      } finally {
        setLoading(false);
        navigate("/login");
      }
    };

    performLogout();
  }, [navigate]);

  return (
    <div>
      {loading ? (
        <p>Logging out...</p>
      ) : (
        <p>Logout successful. Redirecting to login page...</p>
      )}
    </div>
  );
};

export default Logout;
