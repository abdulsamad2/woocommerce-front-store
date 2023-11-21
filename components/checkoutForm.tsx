"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import createOrder from "@/actions/createOrder";
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
import { useRouter } from "next/navigation";
import useCartStore from "@/store/useCart";
import { useSession } from "next-auth/react";
import checkExistingCustomer from "@/actions/checkExistingCustomer";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const formSchema = z.object({
  fullName: z.string().min(2, {
    message: "Name must be at least 3 characters.",
  }),
  phone: z.coerce.number().min(10, {
    message: "Phone must be at least 10 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email.",
  }),
  address: z.string().min(10, {
    message: "Address must be at least 10 characters.",
  }),
  city: z.string().min(2, {
    message: "City must be at least 2 characters.",
  }),
});

function CheckoutForm({ total, cart }: any) {
  const { data: session } = useSession();

  const [existingCustomer, setExistingCustomer] = useState({
    id: "",
    email: "",
    first_name: "",
    last_name: "",
    address: "",
    city: "",
  });
  // @ts-ignore
  const email = session?.user?.user_email;
  useEffect(() => {
    let defaultValues = {};
    const data = async () => {
      const data = await checkExistingCustomer(email);
      if (data) {
        setExistingCustomer(data[0]);

        defaultValues = {
          fullName: data[0]?.first_name
            ? data[0]?.first_name + " " + data[0]?.last_name
            : "",
          phone: data[0]?.phone,
          email: data[0]?.email,
          address: data[0]?.billing.address_1,
          city: data[0]?.billing.city,
        };
      }
      form.reset({
        ...defaultValues,
      });
    };
    data();
  }, [email]);
  const data = {
    fullName: "",
    phone: 0,
    email: "",
    address: "",
    city: "",
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: data,
  });
  const router = useRouter();
  const clearCart = useCartStore((state) => state.clearCart);
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const data = await createOrder({
      ...values,
      cart,
      total,
      id: existingCustomer?.id ? existingCustomer?.id : "",
    });
    if (data) {
      useCartStore.getState().clearCart();
      form.reset();
      toast.success("Order placed successfully");
      router.push("/");
    }
  }

  return (
    <div className="text-gray-600 body-font relative">
      <div className="lg:w-1/2 md:w-2/3 mx-auto px-8">
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
                      <Input
                        readOnly={existingCustomer?.first_name ? true : false}
                        placeholder="Full Name"
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
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input required placeholder="Phone Number" {...field} />
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
                      <Input
                        readOnly={existingCustomer?.email ? true : false}
                        placeholder="Enter your email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input
                        readOnly={existingCustomer?.address ? true : false}
                        placeholder="Enter your address"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input
                        readOnly={existingCustomer?.city ? true : false}
                        placeholder="Enter your City Name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit">Place Order</Button>
            </form>
          </Form>

          <div className="p-2 w-full pt-8 mt-8 border-t border-gray-200 text-center">
            <a className="text-indigo-500">example@email.com</a>
            <p className="leading-normal my-5">
              49 Smith St.
              <br />
              Saint Cloud, MN 56301
            </p>
            <span className="inline-flex">
              <a className="text-gray-500">
                <svg
                  fill="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                </svg>
              </a>
              <a className="ml-4 text-gray-500">
                <svg
                  fill="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                </svg>
              </a>
              <a className="ml-4 text-gray-500">
                <svg
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                </svg>
              </a>
              <a className="ml-4 text-gray-500">
                <svg
                  fill="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                </svg>
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutForm;
