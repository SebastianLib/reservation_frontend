import { z } from "zod";

export const createSignInSchema = () => {
  return z.object({
    phone: z.string(), 
    password: z.string(),
  });
};

export type SignInSchemaType = z.infer<ReturnType<typeof createSignInSchema>>;
