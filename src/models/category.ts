import { BusinessEntity } from "./business";
import { UserEntity } from "./user";

export interface CategoryEntity {
    id: number;
    name: string;
    businesses?: BusinessEntity[];
}
