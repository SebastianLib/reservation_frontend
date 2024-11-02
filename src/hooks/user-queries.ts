import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "./use-toast";
import { SignupSchemaType } from "@/schemas/SignupSchema";
import { UserApi } from "@/app/api/user-api";
import axios from "axios";


export const userKeys = {
    createUser: () => ["user", "create"],
  };

  export function useCreateUserMutation() {
    const { toast } = useToast();
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: (data: Partial<SignupSchemaType>) => UserApi.createUser(data),
      onSuccess: (data) => {
        toast({
          title: "Użytkownik został zarejestrowany!",
          description: "Aby konto zostało aktywowane, potwierdź numer telefonu.",
        });
        queryClient.invalidateQueries({ queryKey: userKeys.createUser() }); 
        return data;
      },
      onError: (error) => {
        toast({
          variant: "destructive",
          title: "Błąd rejestracji",
          description: "Wystąpił błąd. Spróbuj ponownie.",
        });
      },
    });
  }

  export const useVerificationUserMutation = () => {
    const { toast } = useToast();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, code }: { id: string; code: string }) =>
            UserApi.verificationUser({ id, code }),
        onSuccess: () => {
            toast({
                title: "Poprawny kod!",
                description: "Twoje konto zostało aktywowane.",
            });
            queryClient.invalidateQueries();
        },
        onError: (error: unknown) => {
            let errorMessage = "Wystąpił błąd. Spróbuj ponownie.";
            if (axios.isAxiosError(error)) {
                errorMessage = error.response?.data?.message || errorMessage;
            }
            console.log(error);

            toast({
                variant: "destructive",
                title: "Błąd weryfikacji",
                description: errorMessage,
            });
        },
    });
};