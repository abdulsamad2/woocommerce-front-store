import SingleProduct from "@/components/singleProduct";

const SingleProductPage = ({ params }: { params: { productSlug: string } }) => {
  return <div>{<SingleProduct slug={params.productSlug} />}</div>;
};
export default SingleProductPage;
