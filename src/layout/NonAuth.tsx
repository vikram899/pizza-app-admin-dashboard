import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store";

const NonAuth = () => {
  const { user } = useAuthStore();
  if (user) {
    return <Navigate to="/" replace={true} />;
  }

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default NonAuth;
