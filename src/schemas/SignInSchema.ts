import { ROLES } from "@/types/UserType";
import { z } from "zod";

export const createSignInSchema = () => {
  return z.object({
    phone: z.string({ message: "Wymagane" }),
    password: z.string({ message: "Wymagane" }),
    role: z.nativeEnum(ROLES),
  });
};

export type SignInSchemaType = z.infer<ReturnType<typeof createSignInSchema>>;
