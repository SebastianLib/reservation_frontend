import { z } from "zod";

export const verficationCodeSchema = () => {
  return z
    .object({
        verificationCode: z
        .string({message: "Wymagane"})
        .length(6, { message: "Kod musi mieć dokładnie 6 cyfry" })
        .regex(/^\d{6}$/, { message: "Kod musi zawierać tylko cyfry" }),
    })

};


export type VerificationCodeSchemaType = z.infer<ReturnType<typeof verficationCodeSchema>>;
