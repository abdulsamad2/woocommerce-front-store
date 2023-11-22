"use client";
import checkExistingCustomer from "@/actions/checkExistingCustomer";
import CheckoutForm from "@/components/checkoutForm";
import { Separator } from "@/components/ui/separator";
import useCartStore from "@/store/useCart";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Checkout() {
  const cart = useCartStore((state) => state.cart);
  const total = useCartStore((state) =>
    state.cart.reduce(
      (acc: number, item: { price: number; qunatity: number }) =>
        acc + item.price * item.qunatity,
      0
    )
  );

  return (
    <>
      <div className="container px-5  mx-auto">
        <div className="flex flex-col text-center w-full mb-12">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
            Checkout
          </h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
            {cart.length > 0 ? (
              <> CASH ON DELIVERY</>
            ) : (
              <>
                Cart is empty please add items in the cart in order to proceed
              </>
            )}
          </p>
          <section className="text-gray-600 body-font">
            <div className="container px-5 py-24 mx-auto space-y-4 flex flex-wrap">
              {cart.length > 0 &&
                cart.map((item: any) => (
                  <div
                    key={item.id}
                    className="flex relative  sm:items-center md:w-2/3 mx-auto"
                  >
                    <div className="flex-grow md:pl-8 pl-6 justify-around border  flex sm:items-center items-start flex-col sm:flex-row">
                      <div className="flex flex-wrap gap-6 items-center sm:pl-6 mt-6 sm:mt-0">
                        <p className="font-medium underline title-font text-gray-900 mb-1 text-xl">
                          {item.name}
                        </p>
                      </div>
                      <div>Price : {item.price * item.qunatity}</div>
                    </div>
                  </div>
                ))}
              <Separator />
              <div className="flex justify-end container flex-wrap gap-6 items-center sm:pl-6 mt-6 sm:mt-0">
                <p className="font-medium underline title-font text-gray-900 mb-1 text-xl">
                  Total : {total}
                </p>
              </div>
            </div>
            <Separator />
          </section>
        </div>
      </div>
      {cart.length > 0 && <CheckoutForm total={total} cart={cart} />}
    </>
  );
}
