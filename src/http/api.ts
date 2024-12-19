//Auth service

import { CreateTenantType, CreateUserType, LoginCredentails } from "../types";
import { api } from "./client";

// Auth
export const login = (loginCredentails: LoginCredentails) =>
  api.post("/auth/login", loginCredentails);
export const self = () => api.get("/auth/self");
export const logout = () => api.post("/auth/logout");

//Users
export const getAllUsers = (queryString: string) =>
  api.get(`/users?${queryString}`);
export const createUser = (userData: CreateUserType) =>
  api.post("/users", userData);

//Tenants
export const getAllTenants = (queryString: string) =>
  api.get(`/tenants?${queryString}`);
export const createTenant = (tenantData: CreateTenantType) =>
  api.post("/tenants", tenantData);
