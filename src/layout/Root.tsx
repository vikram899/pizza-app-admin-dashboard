import { useQuery } from "@tanstack/react-query";
import { Outlet } from "react-router-dom";
import { useAuthStore } from "../store";
import { self } from "../http/api";
import { useEffect } from "react";
import { AxiosError } from "axios";

const getSelf = async () => {
  const { data } = await self();
  return data;
};

const Root = () => {
  console.log("Rppt elem");
  const { setUser } = useAuthStore();

  const { data, isLoading } = useQuery({
    queryKey: ["key"],
    queryFn: getSelf,
    retry: (failureCount: number, error) => {
      if (error instanceof AxiosError && error.response?.status === 401) {
        return false;
      }

      return failureCount < 3;
    }, //To stop retry if its a refresh
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
