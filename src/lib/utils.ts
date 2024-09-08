import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateDiscountPercentage(
  originalPrice: number,
  discountedPrice: number,
): number {
  if (originalPrice <= 0) return 0;
  const discount = ((originalPrice - discountedPrice) / originalPrice) * 100;
  return Math.round(discount);
}

export const blurInVariants = {
  hidden: { filter: "blur(3px)", opacity: 0 },
  visible: { filter: "blur(0px)", opacity: 1 },
};

export const FILTER_OPTIONS = ["all-products", "top-rated", "sale"] as const;
