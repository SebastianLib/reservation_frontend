import { ROLES } from "@/types/UserType";
import { z } from "zod";

export const createSignupSchema = () => {
  return z
    .object({
      username: z
        .string()
        .min(2, { message: "Imię musi mieć co najmniej 2 znaki." }),
      surname: z
        .string()
        .min(2, { message: "Nazwisko musi mieć co najmniej 2 znaki." }),
      phone: z
        .string()
        .min(8, { message: "Numer telefonu musi mieć co najmniej 8 cyfr." }),
        role: z.nativeEnum(ROLES),
      password: z
        .string()
        .min(6, { message: "Hasło musi mieć co najmniej 6 znaków." }),
      confirmPassword: z
        .string()
        .min(6, { message: "Hasło musi mieć co najmniej 6 znaków." }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Hasła nie są zgodne.",
      path: ["confirmPassword"],
    });
};


export type SignupSchemaType = z.infer<ReturnType<typeof createSignupSchema>>;
