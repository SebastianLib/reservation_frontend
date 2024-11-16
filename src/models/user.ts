import { BusinessEntity } from "./business";

export interface UserEntity {
    id: number;
    username: string;
    surname: string;
    phone: string;
    prefix: string;
    password: string;
    role: ROLES
    image?: string | null;
    status: USER_STATUS;
    verificationCode: string | null;
    ownedBusinesses: BusinessEntity[];
    businesses: BusinessEntity[];
}

export enum USER_STATUS {
    WAITING_FOR_VERIFICATION = 'WAITING_FOR_VERIFICATION',
    BLOCKED = 'BLOCKED',
    ACTIVATED = 'ACTIVATED',
    DELETED = 'DELETED',
  }
  

  export enum ROLES {
    ADMIN = 'ADMIN',
    WORKER = 'WORKER',
    CUSTOMER = 'CUSTOMER',
    OWNER = "OWNER",
}