"use client";
import useCartStore from "@/store/useCart";
import { Button } from "./button";
import { ShoppingBagIcon } from "lucide-react";

const AddToCartButton = ({
  id,
  name,
  qunatity,
  price,
}: {
  id: number;
  name: string;
  qunatity: number;
  price: number;
}) => {
  const addToCart = useCartStore((state) => state.addToCart);
  const cart = useCartStore((state) => state.cart);
  return (
    <>
      <Button
        className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
        onClick={() => addToCart({ id, name, qunatity, price })}
      >
        Add to Cart
        <ShoppingBagIcon className="w-4 h-4 ml-1" />
      </Button>
    </>
  );
};

export default AddToCartButton;
