import React from "react";
import { Outlet } from "react-router-dom";

const NonAuth = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default NonAuth;
