"use client";
import useCartStore from "@/store/useCart";
import { Button } from "./button";
import { ShoppingBagIcon } from "lucide-react";
import SideModal from "./sideModal";
import toast from "react-hot-toast";

const AddToCartButton = ({
  text = "",
  id,
  name,
  qunatity,
  price,
}: {
  text?: string;
  id: number;
  name: string;
  qunatity: number;
  price: number;
}) => {
  const addToCart = useCartStore((state) => state.addToCart);
  const cart = useCartStore((state) => state.cart);
  const handleAddToCart = () => {
    addToCart({ id, name, qunatity, price });
    toast.success("Item added to cart");
  };
  return (
    <>
      <Button
        className="flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
        onClick={handleAddToCart}
      >
        {text}
        <ShoppingBagIcon className="w-4 h-4 ml-1" />
      </Button>
    </>
  );
};

export default AddToCartButton;
