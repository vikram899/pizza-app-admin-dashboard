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

export type Category = {
  _id: string;
  name: string;
  priceConfiguration: PriceConfiguration;
  attributes: Attribute[];
};

export type Product = {
  _id: string;
  name: string;
  description: string;
  category: Category;
  status: boolean;
  image: string;
  isPublish: boolean;
};

export interface PriceConfiguration {
  [key: string]: {
    priceType: "base" | "additional";
    availableOptions: string[];
  };
}

export interface Attribute {
  name: string;
  widgetType: "switch" | "radio";
  defaultValue: string;
  availableOptions: string[];
}

export type PricingProps = {
  selectedCategory: string;
};

export type ImageField = { file: File };
export type CreateProductData = Product & { image: ImageField };
