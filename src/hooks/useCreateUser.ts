import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { SignupSchemaType } from "@/schemas/SignupSchema";
import { UserType } from "@/types/UserType";

const createUser = async (data: Partial<SignupSchemaType>):Promise<UserType> => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/signup`, data);

    return response.data;
};

export const useCreateUser = () => {
    const { toast } = useToast();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: Partial<SignupSchemaType>) => createUser(data),
        onSuccess: (data) => {
            toast({
                title: "Użytkownik został zarejestrowany!",
                description: "Aby konto zostało aktywowane potwierdź numer telefonu.",
            });
            queryClient.invalidateQueries();
            return data
        },
        onError: (error: unknown) => {
            let errorMessage = "Wystąpił błąd. Spróbuj ponownie.";

            if (axios.isAxiosError(error)) {
                errorMessage = error.response?.data?.message || errorMessage;
            }
            console.log(errorMessage);

            toast({
                variant: "destructive",
                title: "Błąd rejestracji",
                description: errorMessage,

            });
        },
    });
};
