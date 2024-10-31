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
import { createSignInSchema, SignInSchemaType } from "@/schemas/SignInSchema";
import { signIn, useSession } from "next-auth/react"; // Używamy useSession do uzyskania sesji
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation"; // Dodajemy useRouter do nawigacji

const SignInPage = () => {
  const { toast } = useToast();
  const router = useRouter();
  const { data: session } = useSession(); 

  const formSchema = createSignInSchema();
  const form = useForm<SignInSchemaType>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: SignInSchemaType) => {
    const result = await signIn("credentials", {
      phone: values.phone,
      password: values.password,
      redirect: false,
    });

    if (result?.error) {
      toast({
        variant: "destructive",
        title: "Błąd logowania",
        description: "Zły numer telefonu albo hasło.",
      });
    } else {
      form.reset(); 
    }
  };

  useEffect(() => {

    if (session) {
      const userStatus = session.user?.status; 
      if (userStatus === "ACTIVATED") {
        router.push("/");
      } else {
        router.push("/verification");
      }
    }
  }, [session, router]);

  return (
    <div className="min-h-screen pt-32 bg-cyan-500 ">
      <div className="container mx-auto flex flex-col justify-center items-center">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 max-w-[600px] w-full bg-white shadow-2xl p-8 rounded-xl mx-2"
          >
            <h2 className="text-center text-2xl md:text-4xl text-cyan-500 font-bold">
              Logowanie
            </h2>

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-xl text-black/70 font-semibold">
                    Numer telefonu
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Wprowadź numer telefonu"
                      {...field}
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

            <Button
              type="submit"
              className="bg-cyan-500 hover:bg-cyan-600 text-white w-full text-xl md:text-2xl py-4 md:py-8"
            >
              Zaloguj się!
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default SignInPage;
