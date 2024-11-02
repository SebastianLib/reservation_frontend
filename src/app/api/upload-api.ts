import { FileEntity } from "@/models/upload";
import { api } from "./client";

export namespace UploadApi {
  export const createUpload = async (files: File[]) => {
    const res = await api.post<{
      ids: number[];
    }>(`/uploads/files`, files);
    return res.data;
  };
}
