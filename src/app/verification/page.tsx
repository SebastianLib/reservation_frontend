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
  verficationCodeSchema,
  VerificationCodeSchemaType,
} from "@/schemas/VerificationCodeSchema";
import { useSession } from "next-auth/react"; // Importuj useSession
import { useRouter } from "next/navigation";
import { useVerificationUserMutation } from "@/hooks/user-queries";

const VerificationPage = () => {
    const { data: session, update } = useSession(); // Uzyskaj sesję użytkownika
    const form = useForm<VerificationCodeSchemaType>({
      resolver: zodResolver(verficationCodeSchema()),
    });
  
    const { mutate: verifyUserMutation } = useVerificationUserMutation();
    const router = useRouter(); // Initialize useRouter
  
    function onSubmit(values: VerificationCodeSchemaType) {
      if (session?.user?.id) {
        verifyUserMutation(
          { id: String(session.user.id), code: values.verificationCode },
          {
            onSuccess:async () => {              
                // const updatedSession = { ...session, user: { ...session.user, status: "ACTIVATED" } };
                // console.log(updatedSession);
                await update({status: "ACTIVATED"});
                router.push("/");
            },
          }
        );
      } else {
        console.error("Nie znaleziono ID użytkownika w sesji.");
      }
    }
  
  return (
      <div className="bg-cyan-500 flex flex-col h-screen justify-center items-center">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 max-w-[600px] w-full bg-white shadow-2xl p-8 rounded-xl mx-2"
          >
            <h2 className="text-center text-2xl text-cyan-500 font-bold">
              Wpisz 6-cyfrowy kod wysłany na Twój numer telefonu.
            </h2>
            <FormField
              control={form.control}
              name="verificationCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kod Weryfikacyjny</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="000000"
                      maxLength={6}
                      {...field}
                      inputMode="numeric"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="bg-cyan-500 hover:bg-cyan-600 text-white w-full text-xl md:text-2xl py-4 md:py-6"
            >
              Potwierdź kod
            </Button>
          </form>
        </Form>
      </div>
  );
};

export default VerificationPage;
