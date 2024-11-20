import { Roles } from "../constants";
import { User } from "../types";

export const usePermission = () => {
  const allowedRoles = [Roles.Admin, Roles.Manager];

  const _hasPemission = (user: User | null) => {
    if (!user) return false;

    return allowedRoles.includes(user.role);
  };

  return {
    isAllowed: _hasPemission,
  };
};
