"use client";
import useCartStore from "@/store/useCart";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import React from "react";

export const CartIconButton = () => {
  const cart = useCartStore((state) => state.cart);
  const qunatity = useCartStore((state) => state.totalQuantity);
  return (
    <Link href={"/cart"}>
      <button className="inline-flex relative items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
        <ShoppingBag />
        {qunatity > 0 && (
          <span className="ml-1 inset-0 -top-1 text-white bg-red-600 w-4 h-4 rounded-xl left-8 text-xs absolute">
            {qunatity}
          </span>
        )}
      </button>
    </Link>
  );
};
