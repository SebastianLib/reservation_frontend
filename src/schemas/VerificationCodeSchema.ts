import { z } from "zod";

export const verficationCodeSchema = () => {
  return z
    .object({
        verificationCode: z
        .string()
        .length(4, { message: "Kod musi mieć dokładnie 4 cyfry" })
        .regex(/^\d{4}$/, { message: "Kod musi zawierać tylko cyfry" }),
    })

};


export type VerificationCodeSchemaType = z.infer<ReturnType<typeof verficationCodeSchema>>;
