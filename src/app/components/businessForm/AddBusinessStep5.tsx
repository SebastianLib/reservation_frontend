import { Button } from "@/components/ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CreateBusinessSchemaType } from "@/schemas/CreateBusinessSchema";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import { useDropzone } from "react-dropzone";
import { UseFormReturn } from "react-hook-form";

type AddBusinessStep5Props = {
  onDrop: (acceptedFiles: File[]) => void;
  form: UseFormReturn<CreateBusinessSchemaType>;
  images: File[];
  setImages: Dispatch<SetStateAction<File[]>>;
};

export default function AddBusinessStep5({
  onDrop,
  form,
  images,
  setImages,
}: AddBusinessStep5Props) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 5,
    accept: { "image/*": [] },
  });
  return (
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
  );
}
