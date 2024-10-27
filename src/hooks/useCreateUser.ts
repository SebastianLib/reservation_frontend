import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { SignupSchemaType } from "@/schemas/SignupSchema";

const createUser = async (data: Partial<SignupSchemaType>) => {
    await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/signup`, {
        ...data,
        role: data.role ? "USER" : "CUSTOMER",
    });
};

export const useCreateUser = () => {
    const { toast } = useToast();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: Partial<SignupSchemaType>) => createUser(data),
        onSuccess: () => {
            toast({
                title: "Użytkownik został zarejestrowany!",
                description: "Teraz możesz się zalogować.",
            });
            queryClient.invalidateQueries();
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
