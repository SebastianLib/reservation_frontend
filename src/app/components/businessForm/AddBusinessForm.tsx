"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
  createBusinessSchema,
  CreateBusinessSchemaType,
} from "@/schemas/CreateBusinessSchema";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { Progress } from "@/components/ui/progress";
import { CategoryEntity } from "@/models/category";
import { useCreateUploadMutation } from "@/hooks/upload-queries";
import { useGenerateHours } from "@/hooks/useGenerateHours";
import OpeningHours from "../OpeningHours";
import { useCreateBusiness } from "@/hooks/business-queries";
import AddBusinessStep1 from "./AddBusinessStep1";
import AddBusinessStep2 from "./AddBusinessStep2";
import AddBusinessStep3 from "./AddBusinessStep3";
import AddBusinessStep4 from "./AddBusinessStep4";
import AddBusinessStep5 from "./AddBusinessStep5";
import { openHours, WeekDays } from "@/lib/OpenHours";
import { useRouter } from "next/navigation";

interface AddBusinessProps {
  categories?: CategoryEntity[];
}

const AddBusinessForm = ({ categories }: AddBusinessProps) => {
  const { data: session } = useSession();
  const [step, setStep] = useState<number>(1);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [images, setImages] = useState<File[]>([]);
  const [allowedStep, setAllowedStep] = useState<number>(1);
  const uploadMutation = useCreateUploadMutation();
  const hours = useGenerateHours();
  const [openHoursState, setOpenHoursState] = useState(openHours);
  const { mutate: createBusiness } = useCreateBusiness();
  const router = useRouter();

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
    let imagesIds: { ids: number[] } = { ids: [] };

    if (images.length > 0) {
      imagesIds = await uploadMutation.mutateAsync(formData as any);
    }
    values.images = imagesIds.ids;
    createBusiness(values, {
      onSuccess: async (data) => {
        router.push(`/business/${data.id}`);
      },
    });
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

  const validationRules: Record<number, () => Promise<boolean>> = {
    1: () => form.trigger(["name", "description"]),
    2: () => form.trigger(["phone", "email"]),
    3: () => form.trigger(["categoriesIds", "city"]),
    4: () => form.trigger(["street", "buildingNumber"]),
    5: () => form.trigger(["postalCode", "images"]),
    6: () => Promise.resolve(true),
  };

  const nextStep = async () => {
    setAllowedStep(step);

    const validateStep = validationRules[step];
    if (!validateStep) {
      console.error("Unknown step");
      return;
    }

    const isValid = await validateStep();

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

  return (
    <Form {...form}>
      <form className="space-y-4">
        <div className="space-y-2">
          <h2 className="text-center text-2xl md:text-3xl font-semibold">
            Krok {step} z 6
          </h2>
          <Progress value={(step / 6) * 100} />
        </div>

        {step === 1 && <AddBusinessStep1 form={form} />}
        {step === 2 && <AddBusinessStep2 form={form} />}

        {step === 3 && (
          <AddBusinessStep3
            categories={categories}
            selectedCategories={selectedCategories}
            toggleCategory={toggleCategory}
            form={form}
          />
        )}
        {step === 4 && <AddBusinessStep4 form={form} />}

        {step === 5 && (
          <AddBusinessStep5
            form={form}
            onDrop={onDrop}
            images={images}
            setImages={setImages}
          />
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
            <Button type="button" onClick={nextStep}>
              Dalej
            </Button>
          ) : (
            <Button type="button" onClick={handleFinalSubmit}>
              Dodaj Salon!
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
};

export default AddBusinessForm;
