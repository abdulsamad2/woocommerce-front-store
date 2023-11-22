import getProducts from "@/actions/getProducts";
import { ShoppingBasketIcon, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import AddToCartButton from "./ui/addToCartButton";

const Products = async () => {
  const products = await getProducts(50);

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-10  md:py-24 mx-auto">
        <div className="flex justify-center md:justify-start flex-wrap -m-4">
          {products.map((product: any) => (
            <div
              key={product.permalink}
              className="lg:w-1/4 md:w-1/2 p-4  border-2 border-gray-200"
            >
              <Link
                href={product?.permalink}
                className="block relative h-48 rounded overflow-hidden"
              >
                <Image
                  height={260}
                  width={400}
                  alt="ecommerce"
                  className="object-cover object-center w-full h-full block"
                  src={product.images[0].src}
                />
              </Link>
              <div className="mt-4">
                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                  {product.categories[0].name}
                </h3>
                <h2 className="text-gray-900 title-font text-lg font-medium">
                  <Link href={product?.permalink}>{product.name}</Link>
                </h2>
                <div className="flex flex-col justify-start  md:flex-row  md:justify-between item-start space-y-2 md:space-y-0">
                  <p dangerouslySetInnerHTML={{ __html: product.price_html }} />
                  <AddToCartButton
                    text=""
                    id={product.id}
                    name={product.name}
                    qunatity={1}
                    price={product.price}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Products;
