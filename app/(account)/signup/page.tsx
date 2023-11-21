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
import createCustomer from "@/actions/createCustomer";
import checkExistingCustomer from "@/actions/checkExistingCustomer";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

const formSchema = z.object({
  fullName: z.string().min(4, {
    message: "Name must be at least 3 characters.",
  }),

  email: z.string().email({
    message: "Please enter a valid email.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 6 characters.",
  }),
});

function SignUpPage({}: any) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { fullName, email, password } = values;

    if (!fullName || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const exisTingCustomer = await checkExistingCustomer(email);

      if (exisTingCustomer[0]?.email === email) {
        toast.error("Account already exists");
        return;
      }
      const data = await createCustomer(values);
      if (data) {
        console.log(data);
        form.reset();
        toast.success("Account created successfully");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  }

  return (
    <div>
      <div className="text-center py-5 space-y-4 md:mt-14 px-4">
        <h1 className="text-3xl font-bold">Create Your Account</h1>
        <p>Create Account to view manage and update your orders</p>
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
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>FullName</FormLabel>
                    <FormControl>
                      <Input placeholder="Full Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your email" {...field} />
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

              <Button type="submit">Register</Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
