import { ROLES } from "@/models/user";
import { z } from "zod";

export const createSignupSchema = () => {
  return z
    .object({
      username: z
        .string({ message: "Wymagane" })
        .min(2, { message: "Imię musi mieć co najmniej 2 znaki." }),
      surname: z
        .string({ message: "Wymagane" })
        .min(1, { message: "Nazwisko jest wymagane." }) // Wymagana długość 1
        .min(2, { message: "Nazwisko musi mieć co najmniej 2 znaki." }),
      phone: z
        .string({ message: "Wymagane" })
        .min(8, { message: "Numer telefonu musi mieć co najmniej 8 cyfr." }),
      role: z.nativeEnum(ROLES),
      password: z
        .string({ message: "Wymagane" })
        .min(6, { message: "Hasło musi mieć co najmniej 6 znaków." }),
      confirmPassword: z
        .string({ message: "Wymagane" })
        .min(6, { message: "Hasło musi mieć co najmniej 6 znaków." }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Hasła nie są zgodne.",
      path: ["confirmPassword"],
    });
};

export type SignupSchemaType = z.infer<ReturnType<typeof createSignupSchema>>;

