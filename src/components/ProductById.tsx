import { useQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { fetchProductById } from "../api";
import Loader from "./Loader";
import ProductCard from "./ProductCard";

export default function ProductById() {
  const { id } = useParams({ from: "/product/$id" });

  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProductById(id),
  });

  if (isLoading) return <Loader />;
  if (error) return <div>Error loading product.</div>;

  return (
    <div>
      {product && <ProductCard product={product} />}
      {/* <h1>{product?.title}</h1>
      <p>{product?.description}</p>
      <p>Price: {product?.price}</p>
      <p>Discounted Price: {product?.discountedPrice}</p> */}
    </div>
  );
}
