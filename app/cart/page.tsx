"use client";

import { Button } from "@/components/ui/button";
import useCartStore from "@/store/useCart";
import { ArrowBigLeft, Trash, Trash2 } from "lucide-react";
import Link from "next/link";
const Cartpage = () => {
  const cart = useCartStore((state) => state.cart);
  const addToCart = useCartStore((state) => state.addToCart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  return (
    <>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">
              Cart
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
              {cart.length > 0
                ? " This is cart page review it and then proceed to checkout"
                : "Your cart is empty."}
            </p>
          </div>
          <div className="lg:w-2/3 w-full mx-auto overflow-auto">
            {cart.length > 0 && (
              <table className="table-auto w-full text-left whitespace-no-wrap">
                <thead>
                  <tr>
                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">
                      Item
                    </th>
                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                      Price
                    </th>
                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                      Quantity
                    </th>
                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                      Total
                    </th>
                    <th className="w-10 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tr rounded-br">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item: any) => (
                    <tr key={item.id}>
                      <td className="px-4 py-3">{item.name}</td>
                      <td className="px-4 py-3">{item.price} Rs</td>
                      <td className="px-4 py-3">{item.qunatity}</td>
                      <td className="px-4 py-3 text-lg text-gray-900">
                        {item.price * item.qunatity} Rs
                      </td>
                      <td className="w-10  text-center">
                        <Button
                          className="bg-white text-black hover:bg-gray-500 hover:text-white"
                          onClick={() => removeFromCart(item)}
                        >
                          <Trash2 />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
          <div className="flex pl-4 mt-4 lg:w-2/3 w-full mx-auto">
            <Link
              href="/"
              className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0"
            >
              <ArrowBigLeft />
              Back to shop
            </Link>
            {cart.length > 0 && (
              <Link className="flex ml-auto" href="/checkout">
                <button className=" text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
                  Checkout
                </button>
              </Link>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Cartpage;
