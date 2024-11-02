import { BusinessApi } from "@/app/api/business-api";
import { useQuery } from "@tanstack/react-query";
import { useCallback } from "react";

export const businessKeys = {
  businessByUserId: (userId: string) => ["business", "user", userId],
};

export function useBusinessByUserIdQuery(userId: string) {
  return useQuery({
    queryKey: businessKeys.businessByUserId(userId),
    queryFn: () => BusinessApi.getBusinessByUserId(userId),
    enabled: !!userId,
  });
}