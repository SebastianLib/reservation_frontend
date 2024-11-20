import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { HiUserAdd } from "react-icons/hi";
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
import { useParams } from "next/navigation";
import { useCreateInvites } from "@/hooks/business-queries";
import { useState } from "react";
import { cn } from "@/lib/utils";
import InviteCodes from "./InviteCodes";

const InvitePeople = () => {
  const [step, setStep] = useState<number>(1);
  const { id } = useParams();
  const { mutate: createInvites } = useCreateInvites();

  const form = useForm<InviteSchemaType>({
    resolver: zodResolver(inviteSchema()),
  });

  function onSubmit(data: InviteSchemaType) {
    createInvites(
      { ...data, businessId: id as string },
      {
        onSuccess: () => {
          setStep(2);
        },
      }
    );
  }

  return (
    <Dialog>
      <DialogTrigger className="text-lg font-semibold flex items-center gap-2">
        <HiUserAdd className="text-xl text-center" /> Zaproś Pracowników
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <div className="flex gap-4 pb-4">
            <p
              className={cn(
                "font-bold border-2 text-lg border-cyan-500 cursor-pointer transition-colors py-1 px-2",
                step === 1
                  ? "bg-cyan-500 text-white"
                  : "text-cyan-500 hover:bg-cyan-500 hover:text-white"
              )}
              onClick={() => setStep(1)}
            >
              Zaproś
            </p>
            <p
              className={cn(
                "font-bold  border-2 text-lg border-cyan-500 cursor-pointer transition-colors py-1 px-2",
                step === 2
                  ? "bg-cyan-500 text-white"
                  : "text-cyan-500 hover:bg-cyan-500 hover:text-white"
              )}
              onClick={() => setStep(2)}
            >
              Zaproszenia
            </p>
          </div>
          {step === 1 ? (
            <div>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4 text-black"
                >
                  <h2 className="text-2xl font-bold">
                    Zaproś nowych pracowników
                  </h2>
                  <FormField
                    control={form.control}
                    name="quantity"
                    render={() => (
                      <FormItem className="w-full">
                        <FormLabel className="text-lg text-black">
                          Liczba zaproszen
                        </FormLabel>
                        <Select
                          onValueChange={(e) =>
                            form.setValue("quantity", Number(e))
                          }
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
                  <Button
                    type="submit"
                    className="bg-cyan-500 hover:bg-cyan-600 text-white py-6 text-xl w-full font-bold"
                  >
                    Generuj Zaproszenia!
                  </Button>
                </form>
              </Form>
            </div>
          ) : <InviteCodes/>}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default InvitePeople;
