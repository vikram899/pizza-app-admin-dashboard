//Auth service

import { LoginCredentails } from "../types";
import { api } from "./client";

export const login = (loginCredentails: LoginCredentails) =>
  api.post("/auth/login", loginCredentails);
