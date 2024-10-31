import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

const verificationUser = async ({ id, code }: { id: string, code: string }) => {
    await axios.patch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/verification/${id}/${code}`);
};

export const useVerificationUser = () => {
    const { toast } = useToast();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, code }: { id: string; code: string }) =>
            verificationUser({ id, code }),
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
