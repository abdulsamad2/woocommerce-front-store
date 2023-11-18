import getProducts from "@/actions/getProducts";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Products = async () => {
  const products = await getProducts(50);

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -m-4">
          {products.map((product: any) => (
            <div
              key={product.permalink}
              className="lg:w-1/4 md:w-1/2 p-4 w-full"
            >
              <Link
                href={product?.permalink}
                className="block relative h-48 rounded overflow-hidden"
              >
                <Image
                  height={260}
                  width={420}
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
                  {product.name}
                </h2>
                <p dangerouslySetInnerHTML={{ __html: product.price_html }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Products;
