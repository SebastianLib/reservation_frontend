"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  createBusinessSchema,
  CreateBusinessSchemaType,
} from "@/schemas/CreateBusinessSchema";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { CategoryEntity } from "@/models/category";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDropzone } from "react-dropzone";
import { cn } from "@/lib/utils";
import { useCreateUploadMutation } from "@/hooks/upload-queries";
import Image from "next/image";
import { useGenerateHours } from "@/hooks/useGenerateHours";
import OpeningHours from "./OpeningHours";
import { useCreateBusiness } from "@/hooks/business-queries";

interface AddBusinessProps {
  categories?: CategoryEntity[];
}

const AddBusinessForm = ({ categories }: AddBusinessProps) => {
  const { data: session} = useSession();
  const [step, setStep] = useState<number>(1);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [images, setImages] = useState<File[]>([]);
  const [allowedStep, setAllowedStep] = useState<number>(1);
  const uploadMutation = useCreateUploadMutation();
  const hours = useGenerateHours();
  const { mutate: createBusiness } = useCreateBusiness();

  type WeekDays =
    | "monday"
    | "tuesday"
    | "wednesday"
    | "thursday"
    | "friday"
    | "saturday"
    | "sunday";
  const openHours: Record<
    WeekDays,
    { isOpen: boolean; open: string; close: string }
  > = {
    monday: {
      isOpen: true,
      open: "08:00",
      close: "16:00",
    },
    tuesday: {
      isOpen: true,
      open: "08:00",
      close: "16:00",
    },
    wednesday: {
      isOpen: true,
      open: "08:00",
      close: "16:00",
    },
    thursday: {
      isOpen: true,
      open: "08:00",
      close: "16:00",
    },
    friday: {
      isOpen: true,
      open: "08:00",
      close: "16:00",
    },
    saturday: {
      isOpen: false,
      open: "08:00",
      close: "16:00",
    },
    sunday: {
      isOpen: false,
      open: "08:00",
      close: "16:00",
    },
  };
  const [openHoursState, setOpenHoursState] = useState(openHours);

  const handleHoursChange = (
    updatedHours: Record<
      WeekDays,
      { isOpen: boolean; open: string; close: string }
    >
  ) => {
    setOpenHoursState(updatedHours);
    form.setValue("openHours", updatedHours);
  };

  const form = useForm<CreateBusinessSchemaType>({
    resolver: zodResolver(createBusinessSchema()),
    defaultValues: {
      ownerId: Number(session?.user.id),
      categoriesIds: [],
      images: [],
      openHours: openHours,
    },
  });

  async function handleFinalSubmit() {
    setAllowedStep(step);
    const values = form.getValues();

    const formData = new FormData();
    images.forEach((image) => {
      formData.append("file", image);
    });
    let imagesIds: { ids: number[] } = {ids: []};
    
    if(images.length > 0){
      imagesIds = await uploadMutation.mutateAsync(formData as any);
    }
    values.images = imagesIds.ids;
    createBusiness(values);
  }

  const toggleCategory = (categoryId: number) => {
    setSelectedCategories((prev) => {
      const updatedCategories = prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId];

      setTimeout(() => form.setValue("categoriesIds", updatedCategories), 0);

      return updatedCategories;
    });
  };

  const nextStep = async () => {
    setAllowedStep(step);
    let isValid = false;

    switch (step) {
      case 1:
        isValid = await form.trigger(["name", "description"]);
        break;

      case 2:
        isValid = await form.trigger(["phone", "email"]);
        break;

      case 3:
        isValid = await form.trigger(["categoriesIds", "city"]);
        break;

      case 4:
        isValid = await form.trigger(["street","buildingNumber",]);
        break;

      case 5:
        isValid = await form.trigger(["postalCode", "images"]);
        break;

      case 6:
        isValid = true;
        break;

      default:
        console.error("Unknown step");
    }

    if (isValid || allowedStep - 1 >= step) {
      setStep((s) => s + 1);
    } else {
      console.error("Validation failed for current step.");
    }
  };
  const prevStep = () => setStep((s) => s - 1);

  const onDrop = (acceptedFiles: File[]) => {
    setImages((prev) => [...prev, ...acceptedFiles]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 5,
    accept: { "image/*": [] },
  });

  return (
    <Form {...form}>
      <form className="space-y-4">
        <div className="space-y-2">
          <h2 className="text-center text-2xl md:text-3xl font-semibold">
            Krok {step} z 6
          </h2>
          <Progress value={(step / 6) * 100} />
        </div>

        {step === 1 && (
          <>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-xl text-black/70 font-semibold">
                    Nazwa
                  </FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Nazwa salonu" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-xl text-black/70 font-semibold">
                    Opis
                  </FormLabel>
                  <FormControl>
                    <Textarea placeholder="Opis salonu" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}

        {/* Krok 2: Kontakt */}
        {step === 2 && (
          <>
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-xl text-black/70 font-semibold">
                    Numer telefonu
                  </FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="Numer telefonu" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-xl text-black/70 font-semibold">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Email salonu" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}

        {step === 3 && (
          <>
            <div className="flex flex-col gap-4">
              <FormField
                control={form.control}
                name="categoriesIds"
                render={() => (
                  <FormItem className="space-y-1 flex flex-col items-start">
                    <FormLabel className="text-xl text-black/70 font-semibold">
                      Kategorie
                    </FormLabel>
                    <FormControl>
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <Button
                            variant="outline"
                            className="w-fit px-10 py-6 md:px-20 cursor-pointer text-lg"
                          >
                            Wybierz kategorie
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuLabel className="text-xl">
                            Wybierz kategorie
                          </DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          {categories
                            ?.filter(
                              (category) =>
                                !selectedCategories.includes(category.id)
                            )
                            ?.map((category) => (
                              <DropdownMenuItem
                                key={category.id}
                                onClick={() => toggleCategory(category.id)}
                                className={cn(
                                  "md:w-[300px] w-full cursor-pointer text-lg p-2 my-1",
                                  selectedCategories.includes(category.id)
                                    ? "bg-cyan-500 text-white"
                                    : ""
                                )}
                              >
                                {category.name}
                              </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div>
                <h2 className="text-xl font-bold">Wybrane Kategorie</h2>
                {selectedCategories.map((categoryId) => {
                  const category = categories?.find(
                    (cat) => cat.id === categoryId
                  );
                  return (
                    category && (
                      <div
                        key={categoryId}
                        className="flex items-center text-lg my-2 font-semibold"
                      >
                        {category.name}
                        <button
                          onClick={() => toggleCategory(categoryId)}
                          className=" bg-red-500 hover:bg-red-600 text-white text-sm p-1 ml-2 cursor-pointer rounded-sm transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    )
                  );
                })}
              </div>
            </div>

            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-xl text-black/70 font-semibold">
                    Miasto
                  </FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Miasto" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}

        {/* Krok 4: Adres */}
        {step === 4 && (
          <>
            <FormField
              control={form.control}
              name="street"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-xl text-black/70 font-semibold">
                    Ulica
                  </FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Ulica" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="buildingNumber"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-xl text-black/70 font-semibold">
                    Numer budynku
                  </FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Numer budynku" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}

        {/* Krok 5: Miasto i zdjęcia */}
        {step === 5 && (
          <>
            <FormField
              control={form.control}
              name="postalCode"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-xl text-black/70 font-semibold">
                    Kod pocztowy
                  </FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Kod pocztowy" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="images"
              render={() => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-xl text-black/70 font-semibold">
                    Obrazy (przeciągnij i upuść)
                  </FormLabel>
                  <FormControl>
                    <>
                      <div {...getRootProps({ className: "dropzone" })}>
                        <input {...getInputProps()} />
                        {isDragActive ? (
                          <Button className="bg-cyan-500 hover:bg-cyan-500 text-lg cursor-pointer">
                            Upuść zdjęcia tutaj ...
                          </Button>
                        ) : (
                          <p className="text-cyan-500 text-lg">
                            Przeciągnij zdjęcia lub kliknij, aby wybrać.
                          </p>
                        )}
                      </div>
                      {images.length > 0 && (
                        <div className="flex flex-col gap-4">
                          <h2 className="text-lg mt-4">Przesłane obrazy:</h2>
                          <ul className="grid grid-cols-2 gap-4">
                            {images.map((file, index) => (
                              <li
                                key={file.name}
                                className="flex flex-col items-center cursor-pointer"
                              >
                                <Image
                                  src={URL.createObjectURL(file)}
                                  alt={file.name}
                                  className="object-cover mb-2"
                                  width={400}
                                  height={150}
                                />
                                <Button
                                  size="icon"
                                  variant="destructive"
                                  onClick={() =>
                                    setImages((prev) =>
                                      prev.filter((_, i) => i !== index)
                                    )
                                  }
                                  className="text-sm text-white w-full"
                                >
                                  Usuń
                                </Button>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}

        {step === 6 && (
          <>
            <h2 className="text-center text-2xl md:text-3xl font-bold">
              Godziny otwarcia
            </h2>
            <OpeningHours
              initialHours={openHoursState}
              onHoursChange={handleHoursChange}
              hoursOptions={hours}
            />
          </>
        )}

        {/* Przycisk nawigacyjny */}
        <div className="flex justify-between">
          <Button
            type="button"
            disabled={step <= 1}
            onClick={prevStep}
            className="bg-gray-300 hover:bg-gray-500 text-white px-10 py-6 text-xl"
          >
            Wróć
          </Button>
          {step < 6 ? (
            <Button
              type="button"
              onClick={nextStep}
            >
              Dalej
            </Button>
          ) : (
            <Button
              type="button"
              onClick={handleFinalSubmit}
            >
              Dodaj Salon!
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
};

export default AddBusinessForm;
