import { boolean, z } from "zod";

const openHourSchema = z.object({
  isOpen: z.boolean().default(true),
  open: z.string().regex(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/, { message: "Godzina otwarcia musi być w formacie HH:mm" }),
  close: z.string().regex(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/, { message: "Godzina zamknięcia musi być w formacie HH:mm" }),
});

const weeklyHoursSchema = z.object({
  monday: openHourSchema,
  tuesday: openHourSchema,
  wednesday: openHourSchema,
  thursday: openHourSchema,
  friday: openHourSchema,
  saturday: openHourSchema,
  sunday: openHourSchema,
});

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
    openHours: weeklyHoursSchema.optional(), 
  });
};

export type CreateBusinessSchemaType = z.infer<ReturnType<typeof createBusinessSchema>>;