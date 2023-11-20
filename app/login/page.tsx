"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";

import {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";

import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  username: z.string().min(3, {
    message: "Name must be at least 3 characters.",
  }),

  password: z.string().min(4, {
    message: "Password must be at least 6 characters.",
  }),
});

function LoginPage({}: any) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const { toast } = useToast();

  const { data: session } = useSession();
  console.log(session);
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { username, password } = values;
    if (!username || !password) {
      alert("Please fill all fields");
      return;
    }

    const result = await signIn("credentials", {
      username: username,
      password: password,
      redirect: true,
      callbackUrl: "/",
    });
    if (result?.error) {
      () =>
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        });
    }
  }

  return (
    <div>
      <div className="text-center py-5 space-y-4 md:mt-14 px-4">
        <h1 className="text-3xl font-bold">Login Your Account</h1>
        <p>Login Account to view manage and update your orders</p>
      </div>
      <div className="lg:w-1/2 md:w-2/3 mx-auto container px-8 mt-10">
        <div className="flex flex-wrap -m-2">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 w-full"
            >
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>UserName</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your Username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit">Login</Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
