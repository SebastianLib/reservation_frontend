import { BusinessApi } from "@/app/api/business-api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useToast } from "./use-toast";
import { CreateBusinessSchemaType } from "@/schemas/CreateBusinessSchema";
import axios from "axios";
import { InviteSchemaType } from "@/schemas/InviteSchema";

export const businessKeys = {
  businessByUserId: (userId: string) => ["businesess", "user", userId],
  getBusinessById: (userId: string) => ["business", "user", userId],
};

export function useBusinessByUserIdQuery(userId: string) {
  return useQuery({
    queryKey: businessKeys.businessByUserId(userId),
    queryFn: () => BusinessApi.getBusinessByUserId(userId),
    enabled: !!userId,
  });
}

export function useGetBusinessByIdQuery(id: string) {
  return useQuery({
    queryKey: businessKeys.getBusinessById(id),
    queryFn: () => BusinessApi.getBusinessById(id),
    enabled: !!id,
  });
}

export const useCreateBusiness = () =>{
  const { toast } = useToast();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateBusinessSchemaType) => BusinessApi.createBusiness(data),
    onSuccess: () => {
        toast({
            title: "Udało się dodać salon!",
        });
        queryClient.invalidateQueries();
    },
    onError: (error: unknown) => {
        let errorMessage = "Wystąpił błąd. Spróbuj ponownie.";
        if (axios.isAxiosError(error)) {
            errorMessage = error.response?.data?.message || errorMessage;
        }
        toast({
            variant: "destructive",
            title: "Błąd podczas dodawania salonu",
            description: errorMessage,
        });
    },
});
}
export const useCreateInvites = () =>{
  const { toast } = useToast();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: InviteSchemaType & {businessId:string}) => BusinessApi.createInvites(data),
    onSuccess: () => {
        toast({
            title: "Udało się stworzyć zaproszenia!",
        });
        queryClient.invalidateQueries();
    },
    onError: (error: unknown) => {
        let errorMessage = "Wystąpił błąd. Spróbuj ponownie.";
        if (axios.isAxiosError(error)) {
            errorMessage = error.response?.data?.message || errorMessage;
        }
        toast({
            variant: "destructive",
            title: "Błąd podczas dodawania salonu",
            description: errorMessage,
        });
    },
});
}