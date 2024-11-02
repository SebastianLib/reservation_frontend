"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
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

interface AddBusinessProps {
  categories?: CategoryEntity[];
}

const AddBusinessForm = ({ categories }: AddBusinessProps) => {
  const { data: session, status } = useSession();
  const [step, setStep] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [images, setImages] = useState<File[]>([]); // Przechowuj przesyłane obrazy
  const uploadMutation = useCreateUploadMutation();

  const form = useForm<CreateBusinessSchemaType>({
    resolver: zodResolver(createBusinessSchema()),
    defaultValues: {
      ownerId: Number(session?.user.id),
      categoriesIds: [],
      images: [],
    },
  });

  async function onSubmit(values: CreateBusinessSchemaType) {
    if (images.length === 0) {
      console.error("No images to upload.");
      return;
    }

    const formData = new FormData();
    images.forEach((image) => {
      formData.append("file", image);
    });

    const imagesIds = await uploadMutation.mutateAsync(formData as any);
    console.log(imagesIds);
  }

  const toggleCategory = (categoryId: number) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
    form.setValue("categoriesIds", selectedCategories);
  };

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => s - 1);

  const onDrop = (acceptedFiles: File[]) => {
    setImages((prev) => [...prev, ...acceptedFiles]);
    form.setValue("images", [...images, ...acceptedFiles]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 5,
    accept: { "image/*": [] },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <h2 className="text-center text-2xl md:text-3xl font-semibold">
            Krok {step} z 5
          </h2>
          <Progress value={(step / 5) * 100} />
        </div>

        {/* Krok 1: Nazwa i opis */}
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

        {/* Krok 3: Kategorie */}
        {step === 3 && (
          <>
            <FormField
              control={form.control}
              name="categoriesIds"
              render={({ field }) => (
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
                        {categories?.map((category) => (
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
          </>
        )}

        {/* Krok 4: Adres */}
        {step === 4 && (
          <>
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
          </>
        )}

        {/* Krok 5: Miasto i zdjęcia */}
        {step === 5 && (
          <>
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

            {/* <FormField
              control={form.control}
              name="images"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-xl text-black/70 font-semibold">Obrazy (przeciągnij i upuść)</FormLabel>
                  <FormControl> */}
            <div className="flex flex-col space-y-2">
              <FormLabel className="text-xl text-black/70 font-semibold">
                Dodaj zdjęcia salonu
              </FormLabel>
              <div {...getRootProps({ className: "dropzone" })}>
                <input {...getInputProps()} />
                {isDragActive ? (
                  <Button className="bg-cyan-500 hover:bg-cyan-500 text-lg">Upuść zdjęcia tutaj ...</Button>
                ) : (
                  <Button className="bg-cyan-500 hover:bg-cyan-500 text-lg">Przeciągnij zdjęcia lub kliknij, aby wybrać.</Button>
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
                        onClick={() => setImages(prev => prev.filter((_, i) => i !== index))} 
                          className="text-sm text-white w-full"
                        >Usuń</Button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            {/* </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
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
          {step < 5 ? (
            <Button
              type="button"
              onClick={nextStep}
              className="bg-cyan-500 hover:bg-cyan-600 text-white px-10 py-6 text-xl"
            >
              Dalej
            </Button>
          ) : (
            <Button
              type="submit"
              className="bg-cyan-500 hover:bg-cyan-600 text-white px-10 py-6 text-xl"
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