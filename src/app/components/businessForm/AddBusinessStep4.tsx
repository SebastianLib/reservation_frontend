import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CreateBusinessSchemaType } from "@/schemas/CreateBusinessSchema";
import { UseFormReturn } from "react-hook-form";

export default function AddBusinessStep4({
  form,
}: {
  form: UseFormReturn<CreateBusinessSchemaType>;
}) {
  return (
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
  );
}
