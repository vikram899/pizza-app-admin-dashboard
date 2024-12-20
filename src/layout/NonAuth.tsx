import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "../store";

const NonAuth = () => {
  const { user } = useAuthStore();
  const location = useLocation();
  if (user) {
    const returnTo =
      new URLSearchParams(location.search).get("returnTo") || "/";
    console.log(returnTo);
    return <Navigate to={returnTo} replace={true} />;
  }

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default NonAuth;
