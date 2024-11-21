import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store";

const Dashboard = () => {
  const { user } = useAuthStore();

  if (!user) {
    return <Navigate to="/auth/login" replace={true} />;
  }

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default Dashboard;
