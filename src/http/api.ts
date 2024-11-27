//Auth service

import { CreateUserType, LoginCredentails } from "../types";
import { api } from "./client";

export const login = (loginCredentails: LoginCredentails) =>
  api.post("/auth/login", loginCredentails);

export const self = () => api.get("/auth/self");
export const logout = () => api.post("/auth/logout");
export const getAllUsers = () => api.get("/users");
export const getAllTenants = () => api.get("/tenants");
export const createUser = (userData: CreateUserType) =>
  api.post("/users", userData);
