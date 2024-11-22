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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { inviteSchema, InviteSchemaType } from "@/schemas/InviteSchema";
import { expirationHours } from "@/lib/ExpirationHours";
import { useCreateInvites } from "@/hooks/business-queries";
import { useParams } from "next/navigation";

export default function InvitePeopleForm({
  changeStep,
}: {
  changeStep: () => void;
}) {
  const { mutate: createInvites } = useCreateInvites();
  const { id } = useParams();
  const form = useForm<InviteSchemaType>({
    resolver: zodResolver(inviteSchema()),
  });

  function onSubmit(data: InviteSchemaType) {
    createInvites(
      { ...data, businessId: id as string },
      {
        onSuccess: () => {
          changeStep();
        },
      }
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 text-black"
      >
        <h2 className="text-2xl font-bold">Zaproś nowych pracowników</h2>
        <FormField
          control={form.control}
          name="quantity"
          render={() => (
            <FormItem className="w-full">
              <FormLabel className="text-lg text-black">
                Liczba zaproszen
              </FormLabel>
              <Select
                onValueChange={(e) => form.setValue("quantity", Number(e))}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Wybierz liczbę zaproszeń" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Array.from({ length: 10 }, (_, index) => (
                    <SelectItem
                      key={index + 1}
                      value={(index + 1).toString()}
                      className="text-lg"
                    >
                      {index + 1}
                      {index === 0 && " zaproszenie"}
                      {index > 0 && index < 4 && " zaproszenia"}
                      {index >= 4 && " zaproszeń"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="expirationTime"
          render={() => (
            <FormItem className="w-full">
              <FormLabel className="text-lg text-black">
                Liczba godzin do wygaśnięcia
              </FormLabel>
              <Select
                onValueChange={(e) =>
                  form.setValue("expirationTime", Number(e))
                }
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Wybierz liczbę godzin" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {expirationHours.map((hour, index) => (
                    <SelectItem
                      key={index + 1}
                      value={String(hour.value)}
                      className="text-lg"
                    >
                      {hour.time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Generuj Zaproszenia!
        </Button>
      </form>
    </Form>
  );
}
