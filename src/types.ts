export type LoginCredentails = {
  email: string;
  password: string;
};

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  tenant?: Tenant;
};
export type Tenant = {
  id: number;
  name: string;
  address: string;
};
