import { UserEntity } from "./user";

export interface BusinessEntity {
  id: number;
  name: string;
  description?: string;
  phone?: string;
  email?: string;
  category: string;
  street?: string;
  buildingNumber?: string;
  postalCode?: string;
  city?: string;
  images?: string[];
  owner: UserEntity;
  workers?: UserEntity[];
}
