import { useState } from "react";
import { Link } from "@tanstack/react-router";

import { Product } from "../../lib/types";
import DiscountTag from "../DiscountTag";

interface ProductCardProps {
  product: Product;
}

/**
 * Renders a product card with image, title, price, and discount tag.
 *
 * This component applies a "sway" animation to the discount tag when the
 * product card is hovered, using React state to control the animation.
 *
 * @param {ProductCardProps} props - The product information passed to the component.
 * @returns The rendered product card component.
 */
export default function ProductCard({ product }: ProductCardProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleMouseEnter = () => {
    setIsAnimating(true);
  };

  const handleAnimationEnd = () => {
    setIsAnimating(false);
  };

  return (
    <Link
      to={`/product/${product.id}`}
      className="group relative flex flex-col transition-all duration-300 ease-in-out"
      onMouseEnter={handleMouseEnter}
    >
      <img
        src={product.image.url}
        alt={product.image.alt}
        className="aspect-[3/4] rounded-2xl object-cover opacity-95 transition-all duration-200 group-hover:opacity-100"
      />
      <div className="flex items-center justify-between py-4 text-lg font-light md:text-xl">
        <h2>{product.title}</h2>
        <p className="text-muted-foreground">{product.discountedPrice} NOK</p>
      </div>
      {product.price > product.discountedPrice && (
        <DiscountTag
          originalPrice={product.price}
          discountedPrice={product.discountedPrice}
          isAnimating={isAnimating}
          onAnimationEnd={handleAnimationEnd}
          displayType="percentage" // Displays discount percentage
        />
      )}
    </Link>
  );
}
