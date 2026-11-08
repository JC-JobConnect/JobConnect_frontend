import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getCurrentUser } from "../../Services/Auth";

const ProtectedRoute = () => {
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const checkAdmin = async () => {
      const accessToken = sessionStorage.getItem("access_token");

      if (!accessToken) {
        setStatus("unauthorized");
        return;
      }

      try {
        const user = await getCurrentUser();

        if (user.is_staff) {
          setStatus("allowed");
        } else {
          setStatus("forbidden");
        }
      } catch (error) {
        setStatus("unauthorized");
      }
    };

    checkAdmin();
  }, []);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Checking admin access...
      </div>
    );
  }

  if (status === "unauthorized") {
    return <Navigate to="/login" replace />;
  }

  if (status === "forbidden") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;