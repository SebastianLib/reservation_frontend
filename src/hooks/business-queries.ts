import { BusinessApi } from "@/app/api/business-api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useToast } from "./use-toast";
import { CreateBusinessSchemaType } from "@/schemas/CreateBusinessSchema";
import axios from "axios";
import { InviteSchemaType } from "@/schemas/InviteSchema";

export const businessKeys = {
  getBusinessByUserId: () => ["businesess", "user"],
  getBusinessById: (businessId: string) => ["business", "user", businessId],
  getInivtesById: (businessId: string) => ["business", "user", businessId],
};

export function useBusinessByUserIdQuery() {
  return useQuery({
    queryKey: businessKeys.getBusinessByUserId(),
    queryFn: () => BusinessApi.getBusinessByUserId(),
  });
}

export function useGetBusinessByIdQuery(businessId: string) {
  return useQuery({
    queryKey: businessKeys.getBusinessById(businessId),
    queryFn: () => BusinessApi.getBusinessById(businessId),
    enabled: !!businessId,
  });
}

export function useGetInvitesQuery(businessId: string) {
  return useQuery({
    queryKey: businessKeys.getInivtesById(businessId),
    queryFn: () => BusinessApi.getInvitesById(businessId),
    enabled: !!businessId,
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
  return useMutation({
    mutationFn: (data: InviteSchemaType & {businessId:string}) => BusinessApi.createInvites(data),
    onSuccess: (data)=> {
        toast({
            title: "Udało się stworzyć zaproszenia!",
        });
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