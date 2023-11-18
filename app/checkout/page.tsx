"use client";
import CheckoutForm from "@/components/checkoutForm";
import { Separator } from "@/components/ui/separator";
import useCartStore from "@/store/useCart";
import Image from "next/image";
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
            CASH ON DELIVERY
          </p>
          <section className="text-gray-600 body-font">
            <div className="container px-5 py-24 mx-auto space-y-4 flex flex-wrap">
              {cart.length > 0 &&
                cart.map((item: any) => (
                  <div
                    key={item.id}
                    className="flex relative  sm:items-center md:w-2/3 mx-auto"
                  >
                    <div className="flex-grow md:pl-8 pl-6 justify-between flex sm:items-center items-start flex-col sm:flex-row">
                      <div className="flex-shrink-0 w-24 h-24 bg-indigo-100  rounded-full inline-flex items-center justify-center">
                        <Image src={"/"} alt="logo" width={64} height={64} />
                      </div>
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
      <CheckoutForm total={total} cart={cart} />
    </>
  );
}
