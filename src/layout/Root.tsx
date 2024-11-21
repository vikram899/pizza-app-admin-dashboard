import { useQuery } from "@tanstack/react-query";
import { Outlet } from "react-router-dom";
import { useAuthStore } from "../store";
import { self } from "../http/api";
import { useEffect } from "react";

const getSelf = async () => {
  const { data } = await self();
  return data;
};

const Root = () => {
  const { setUser } = useAuthStore();

  const { data, isLoading } = useQuery({
    queryKey: ["key"],
    queryFn: getSelf,
  });

  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data, setUser]);

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <>
      <Outlet />
    </>
  );
};

export default Root;
