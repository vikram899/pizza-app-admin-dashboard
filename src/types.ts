export type LoginCredentails = {
  email: string;
  password: string;
};
export type CreateUserType = {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  tenant?: number;
};

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  tenant?: Tenant | null;
};
export type Tenant = {
  id: number;
  name: string;
  address: string;
};

export type CreateTenantType = {
  name: string;
  address: string;
};

export type FieldData = {
  name: string[];
  value?: string;
};
