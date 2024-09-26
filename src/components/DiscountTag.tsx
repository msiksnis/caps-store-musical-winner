import { useEffect, useState } from "react";
import NumberTicker from "./NumberTicker";

import { cn } from "../lib/utils";

interface DiscountTagProps {
  originalPrice: number;
  discountedPrice: number;
  isAnimating: boolean;
  onAnimationEnd: () => void;
  /** Determines whether to display discount as 'percentage' or 'amount' */
  displayType: "percentage" | "amount";
  /** Currency symbol, e.g., 'NOK', default is empty string */
  currency?: string;
}

/**
 * Renders a discount tag that displays either the discount percentage or amount.
 *
 * @param {DiscountTagProps} props - The props for the DiscountTag component.
 * @returns A JSX element representing the discount tag.
 */
export default function DiscountTag({
  originalPrice,
  discountedPrice,
  isAnimating,
  onAnimationEnd,
  displayType,
  currency = "",
}: DiscountTagProps) {
  const [displayValue, setDisplayValue] = useState<number>(0);

  useEffect(() => {
    if (displayType === "percentage") {
      const discountPercentage = Math.round(
        ((originalPrice - discountedPrice) / originalPrice) * 100,
      );
      setDisplayValue(discountPercentage);
    } else if (displayType === "amount") {
      const discountAmount = originalPrice - discountedPrice;
      setDisplayValue(discountAmount);
    }
  }, [originalPrice, discountedPrice, displayType]);

  return (
    <div
      className={cn("absolute right-4 top-4 origin-top transition-none", {
        "animate-sway": isAnimating,
      })}
      onAnimationEnd={onAnimationEnd}
    >
      <div className="relative">
        <img src="/assets/discount_tag.svg" alt="discount tag" />
        <div className="absolute right-1/2 top-12 translate-x-1/2 -rotate-6">
          <div className="flex flex-col whitespace-nowrap text-3xl">
            <div className="flex items-center text-white">
              -
              <NumberTicker value={displayValue} />
              {displayType === "percentage" ? "%" : ` ${currency}`}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
