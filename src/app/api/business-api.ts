import { BusinessEntity } from "@/models/business";
import { api } from "./client";
import { CreateBusinessSchemaType } from "@/schemas/CreateBusinessSchema";
import { getSession } from "next-auth/react";

export namespace BusinessApi {
  export const getBusinessByUserId = async (userId: string) => {
    const res = await api.get<BusinessEntity[]>(`/business/user/${userId}`);
    return res.data;
  };

  export const getBusinessById = async (id: string) => {
    const res = await api.get<BusinessEntity>(`/business/${id}`);
    return res.data;
  };

  export const createBusiness = async (data: CreateBusinessSchemaType): Promise<BusinessEntity> => {
    const session = await getSession();

    const token = session?.accessToken;

    if (!token) {
      throw new Error('Brak tokenu autoryzacji');
    }
  
    const response = await api.post(`/business`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    return response.data;
  };
}
