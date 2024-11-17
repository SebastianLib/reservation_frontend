import { ROLES } from "@/models/user";
import { z } from "zod";

export const inviteSchema = () => {
  return z.object({
    quantity: z.number({ message: "Wymagane" }).positive(),
    expirationTime: z.number({ message: "Wymagane" }).positive().optional(),
  });
};

export type InviteSchemaType = z.infer<ReturnType<typeof inviteSchema>>;
