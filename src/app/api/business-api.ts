import { BusinessEntity } from "@/models/business";
import { api } from "./client";

export namespace BusinessApi {
  export const getBusinessByUserId = async (userId: string) => {
    const res = await api.get<BusinessEntity[]>(`/business/user/${userId}`);
    return res.data;
  };
}
