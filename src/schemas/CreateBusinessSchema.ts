import { z } from "zod";

export const createBusinessSchema = () => {
  return z.object({
    name: z.string().nonempty({ message: "Nazwa jest wymagana" }),
    description: z.string().optional(),
    phone: z.string().optional(),
    email: z.string().email({ message: "Niepoprawny format e-maila" }).optional(),
    categoriesIds: z.array(z.number().int().positive()).optional(),
    street: z.string().optional(),
    buildingNumber: z.string().optional(),
    postalCode: z.string().optional(),
    city: z.string().optional(),
    images: z.array(z.instanceof(File)).optional(),
    ownerId: z.number().int().positive({ message: "Id właściciela jest wymagane" }), 
    workersIds: z.array(z.number().int().positive()).optional(), 
  });
};

export type CreateBusinessSchemaType = z.infer<ReturnType<typeof createBusinessSchema>>;
