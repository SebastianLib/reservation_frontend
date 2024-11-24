import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CreateBusinessSchemaType } from "@/schemas/CreateBusinessSchema";
import { UseFormReturn } from "react-hook-form";

export default function AddBusinessStep2({
  form,
}: {
  form: UseFormReturn<CreateBusinessSchemaType>;
}) {
  return (
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
  );
}
