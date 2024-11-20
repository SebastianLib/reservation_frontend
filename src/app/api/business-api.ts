import { BusinessEntity, InviteCodeEntity } from "@/models/business";
import { api } from "./client";
import { CreateBusinessSchemaType } from "@/schemas/CreateBusinessSchema";
import { InviteSchemaType } from "@/schemas/InviteSchema";

export namespace BusinessApi {
  export const getBusinessByUserId = async () => {
    const res = await api.get<BusinessEntity[]>(`/business/user/businesses`);
    return res.data;
  };

  export const getBusinessById = async (id: string) => {
    const res = await api.get<BusinessEntity>(`/business/${id}`);
    return res.data;
  };

  export const getInvitesById = async (businessId: string) => {
    const res = await api.get<InviteCodeEntity[]>(`/business/invite/${businessId}`);
    return res.data;
  };

  export const createBusiness = async (data: CreateBusinessSchemaType): Promise<BusinessEntity> => {

    const response = await api.post(`/business`, data);
  
    return response.data;
  };

  export const createInvites = async (data: InviteSchemaType & {businessId:string}): Promise<InviteCodeEntity[]> => {

    const response = await api.post(`/business/invite`, data);
  
    return response.data;
  };

}
