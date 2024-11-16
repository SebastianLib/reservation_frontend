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
    name: z.string({ message: "Nazwa jest wymagana" }),
    description: z.string().optional(),
    phone: z.string({ message: "Numer telefonu jest wymagany" }),
    email: z.string().email({ message: "Niepoprawny format e-maila" }).optional(),
    categoriesIds: z
      .array(z.number().int().positive(), {
        required_error: "Musisz wybrać co najmniej jedną kategorię",
      })
      .min(1, { message: "Musisz wybrać co najmniej jedną kategorię" }),

    city: z.string({ message: "Miasto jest wymagane" }),
    street: z.string({ message: "Ulica jest wymagana" }),
    buildingNumber: z.string({ message: "Numer budynku jest wymagany" }),
    postalCode: z.string({ message: "Kod pocztowy jest wymagany" }),

    images: z.array(z.number()).optional(),
    ownerId: z.number().int().positive({ message: "Id właściciela jest wymagane" }),
    workersIds: z.array(z.number().int().positive()).optional(),
    openHours: weeklyHoursSchema.optional(),
  });
};



export type CreateBusinessSchemaType = z.infer<ReturnType<typeof createBusinessSchema>>;