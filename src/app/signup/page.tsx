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
import { Checkbox } from "@/components/ui/checkbox"; 
import { createSignupSchema, SignupSchemaType } from "@/schemas/SignupSchema";
import { useCreateUser } from "@/hooks/useCreateUser"; 

const SignupPage = () => {
  const formSchema = createSignupSchema();
  const form = useForm<SignupSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      surname: "",
      email: "",
      phone: "",
      role: false, 
      password: "",
      confirmPassword: "",
    },
  });

  const { mutate: createUserMutation } = useCreateUser(); 

  function onSubmit(values: SignupSchemaType) {
      const { confirmPassword, ...rest } = values; 
       createUserMutation(rest); 
      form.reset();
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
              Rejestracja
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
                    <Input
                      placeholder="Jan"
                      {...field}
                    />
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
                    <Input
                      placeholder="Kowalski"
                      {...field}
                    />
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
                    <Input
                      type="email"
                      placeholder="przyklad@domena.pl"
                      {...field}
                    />
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
                    <Input
                      type="tel"
                      placeholder="123456789"
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
            
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem className="space-y-1 flex items-center">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      id="role"
                    />
                  </FormControl>
                  <FormLabel htmlFor="role" className="ml-2 text-xl text-black/70 font-semibold">
                    Czy jesteś pracownikiem?
                  </FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="bg-cyan-500 hover:bg-cyan-600 text-white w-full text-xl md:text-2xl py-4 md:py-8"
            >
              Zarejestruj się!
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default SignupPage;

