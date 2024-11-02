import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UploadApi } from "@/app/api/upload-api";
import { toast } from "./use-toast";

export const UploadKeys = {
    createUpload: () => ["upload"],
  };

  export function useCreateUploadMutation() {
    return useMutation({
      mutationFn: (data: File[]) => UploadApi.createUpload(data),
    });
  }
