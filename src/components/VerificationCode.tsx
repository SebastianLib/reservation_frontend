"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { verficationCodeSchema, VerificationCodeSchemaType } from "@/schemas/VerificationCodeSchema";
import { useVerificationUser } from "@/hooks/useVerificationUser";
import { redirect } from "next/navigation";

const VerificationCode = ({ userId }: { userId: number | undefined }) => {
  const form = useForm<VerificationCodeSchemaType>({
    resolver: zodResolver(verficationCodeSchema()),
  });

  const { mutate: verifyUser } = useVerificationUser();

  function onSubmit(values: VerificationCodeSchemaType) {
    
    if (userId !== undefined) {
      verifyUser({ id: userId, code: values.verificationCode });
      redirect("/signin")
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 max-w-[600px] w-full bg-white shadow-2xl p-8 rounded-xl mx-2"
      >
        <h2 className="text-center text-2xl text-cyan-500 font-bold">
          Wpisz 4-cyfrowy kod wysłany na Twój numer telefonu.
        </h2>
        <FormField
          control={form.control}
          name="verificationCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kod Weryfikacyjny</FormLabel>
              <FormControl>
                <Input
                  placeholder="0000"
                  maxLength={4}
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
  );
};

export default VerificationCode;
