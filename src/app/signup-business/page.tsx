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
import { createSignupSchema, SignupSchemaType } from "@/schemas/SignupSchema";
import { PhoneInput } from "@/components/ui/PhoneInput";
import { signIn} from "next-auth/react";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { ROLES } from "@/models/user";
import { useCreateUserMutation } from "@/hooks/user-queries";

const SignupBusinessPage = () => {
  const router = useRouter();
  const formSchema = createSignupSchema();
  const form = useForm<SignupSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues:{
      role: ROLES.OWNER
    }
  });
  const { mutate: createUserMutation } = useCreateUserMutation();

  async function onSubmit(values: SignupSchemaType) {  
    const { confirmPassword, ...rest } = values;
      
    createUserMutation(rest, {
      onSuccess: async () => {
        const result = await signIn("credentials", {
          phone: values.phone.substring(3),
          password: values.password,
          role: values.role,
          redirect: false,
        });

        if (result?.error) {
          toast({
            variant: "destructive",
            title: "Błąd logowania",
            description: "Zły numer telefonu albo hasło.",
          });
        } else {
          router.push("/verification");
        }
      },
    });
  }

  return (
    <div className="min-h-screen pt-32 bg-cyan-500">
      <div className="container mx-auto flex flex-col justify-center items-center">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 max-w-[600px] w-full bg-white shadow-2xl p-8 rounded-xl mx-2"
          >
            <h2 className="text-center text-2xl md:text-4xl text-cyan-500 font-bold">
              Rejestracja konta biznesowego
            </h2>

            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-xl font-semibold text-black/70">
                    Imię
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Jan" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="surname"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-xl text-black/70 font-semibold">
                    Nazwisko
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Kowalski" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-xl text-black/70 font-semibold">
                    Telefon
                  </FormLabel>
                  <FormControl>
                    <PhoneInput
                      value={field.value}
                      onChange={(value) => field.onChange(value)}
                      placeholder="Numer telefonu"
                      defaultCountry="PL"
                      international
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-xl text-black/70 font-semibold">
                    Hasło
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Wprowadź hasło"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-xl text-black/70 font-semibold">
                    Powtórz Hasło
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Potwierdź hasło"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="bg-cyan-500 hover:bg-cyan-600 text-white w-full text-xl md:text-2xl py-4 md:py-8"
            >
              Zarejestruj konto biznesowe!
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default SignupBusinessPage;
