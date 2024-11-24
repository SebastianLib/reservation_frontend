import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CreateBusinessSchemaType } from "@/schemas/CreateBusinessSchema";
import { UseFormReturn } from "react-hook-form";

const AddBusinessStep1 = ({ form }: {form: UseFormReturn<CreateBusinessSchemaType>}) => {
  return (
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
  );
};

export default AddBusinessStep1;