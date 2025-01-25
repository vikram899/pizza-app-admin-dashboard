//Auth service

import { CreateTenantType, CreateUserType, LoginCredentails } from "../types";
import { api } from "./client";

export const AUTH_SERVICE = "/api/auth";
export const CATALOG_SERVICE = "/api/catalog";

// Auth
export const login = (loginCredentails: LoginCredentails) =>
  api.post(`${AUTH_SERVICE}/auth/login`, loginCredentails);
export const self = () => api.get(`${AUTH_SERVICE}/auth/self`);
export const logout = () => api.post(`${AUTH_SERVICE}/auth/logout`);

//Users
export const getAllUsers = (queryString: string) =>
  api.get(`${AUTH_SERVICE}/users?${queryString}`);
export const createUser = (userData: CreateUserType) =>
  api.post(`${AUTH_SERVICE}/users`, userData);
export const updateUser = (userData: CreateUserType, userId: number) => {
  return api.patch(`${AUTH_SERVICE}/users/${userId}`, userData);
};

//Tenants
export const getAllTenants = (queryString: string) =>
  api.get(`${AUTH_SERVICE}/tenants?${queryString}`);
export const createTenant = (tenantData: CreateTenantType) =>
  api.post(`${AUTH_SERVICE}/tenants`, tenantData);

//Categories
export const getAllCategories = () => api.get(`${CATALOG_SERVICE}/categories`);
