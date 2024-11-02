import axios from "axios";
import { SignupSchemaType } from "@/schemas/SignupSchema";
import { UserEntity } from "@/models/user";
import { api } from "./client";

export namespace UserApi {
  export const createUser = async (data: Partial<SignupSchemaType>): Promise<UserEntity> => {
    const response = await api.post(`/users/signup`, data);
    return response.data;
  };

  export const verificationUser = async ({ id, code }: { id: string, code: string }) => {
    await axios.patch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/verification/${id}/${code}`);
  };
}