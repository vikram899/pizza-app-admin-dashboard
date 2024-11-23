import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "../store";
import { logout } from "../http/api";

const logoutUser = async () => {
  await logout();
};

const useLogout = () => {
  const { logout: logoutStore } = useAuthStore();

  const { mutate: logoutMutate } = useMutation({
    mutationKey: ["logout"],
    mutationFn: logoutUser,
    onSuccess: async () => {
      logoutStore();
      return;
    },
  });

  return {
    logout: logoutMutate,
  };
};

export default useLogout;
