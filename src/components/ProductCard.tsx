import { Link } from "@tanstack/react-router";
import { Product } from "../lib/types";
import NumberTicker from "./NumberTicker";
import { calculateDiscountPercentage } from "../lib/utils";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const discountPercentage = calculateDiscountPercentage(
    product.price,
    product.discountedPrice,
  );

  return (
    <Link
      to={`/product/${product.id}`}
      className="group relative flex flex-col transition-all duration-300 ease-in-out"
    >
      <img
        src={product.image.url}
        alt={product.image.alt}
        className="aspect-[3/4] rounded-2xl object-cover opacity-95 group-hover:opacity-100"
      />
      <div className="flex items-center justify-between py-4 text-lg font-light md:text-xl">
        <h2>{product.title}</h2>
        <p className="text-muted-foreground">{product.discountedPrice} NOK</p>
      </div>
      {product.price > product.discountedPrice && (
        <div className="group-hover:animate-sway absolute right-4 top-4 origin-top transition-none">
          <div className="relative">
            <img
              src="/src/assets/discount_tag.svg"
              alt="discount tag"
              className=""
            />
            <div className="absolute right-1/2 top-12 translate-x-1/2 -rotate-6 text-white">
              <div className="flex whitespace-nowrap text-3xl">
                <NumberTicker value={discountPercentage} />
                <p> %</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </Link>
  );
}
