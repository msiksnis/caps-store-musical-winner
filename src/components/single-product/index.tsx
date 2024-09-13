import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";

import { fetchProductById } from "../../api";
import Loader from "../Loader";
import { calculateDiscount, cn } from "../../lib/utils";
import NumberTicker from "../NumberTicker";
import {
  ArrowRight,
  ContainerIcon,
  CreditCardIcon,
  HeadsetIcon,
  ShieldCheck,
  TruckIcon,
  Undo2Icon,
  Star,
  StarHalf,
  Star as EmptyStar,
} from "lucide-react";

export default function SingleProduct() {
  const { id } = useParams({ from: "/product/$id" });

  const [isAnimating, setIsAnimating] = useState(false);

  const handleMouseEnter = () => {
    setIsAnimating(true);
  };

  const handleAnimationEnd = () => {
    setIsAnimating(false);
  };

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
    <div className="mx-auto mt-40 px-4 sm:max-w-4xl md:max-w-5xl md:px-10 xl:max-w-7xl">
      {product && (
        <>
          <div className="flex flex-col lg:flex-row">
            <div
              className="relative w-full lg:w-7/12"
              onMouseEnter={handleMouseEnter}
            >
              <img
                src={product.image.url}
                alt={product.image.alt}
                className="size-full max-h-[43rem] rounded-2xl object-cover object-center opacity-95 shadow-sm group-hover:opacity-100"
              />
              {product.price > product.discountedPrice && (
                <div
                  className={cn(
                    "absolute right-4 top-4 origin-top transition-none",
                    {
                      "animate-sway": isAnimating,
                    },
                  )}
                  onAnimationEnd={handleAnimationEnd}
                >
                  <div className="relative">
                    <img
                      src="/assets/discount_tag.svg"
                      alt="discount tag"
                      className=""
                    />
                    <div className="absolute right-1/2 top-12 translate-x-1/2 -rotate-6 text-white">
                      <div className="flex flex-col whitespace-nowrap text-3xl">
                        <div className="flex">
                          -
                          <NumberTicker
                            value={calculateDiscount(
                              product?.price,
                              product?.discountedPrice,
                            )}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="flex min-h-[43rem] w-full flex-col pt-10 md:pt-20 lg:w-5/12 lg:pl-10 lg:pt-0">
              <div className="flex-1">
                <h1 className="text-[2.5rem] font-light leading-10">
                  {product?.title}
                </h1>
                <h2 className="text-pretty py-4 font-light text-muted-foreground">
                  {product?.description}
                </h2>
                {product?.rating > 0 && (
                  <div className="py-2">
                    <RatingStars rating={product.rating} />
                  </div>
                )}
                <p className="flex flex-col pb-8 pt-4 text-3xl font-light">
                  {product?.price} NOK
                </p>
                <button className="w-full rounded-3xl bg-primary py-4 font-semibold text-background shadow-sm transition-colors duration-300 hover:bg-gray-800">
                  Add to cart
                </button>
                <div className="pt-8 text-center font-extralight text-stone-500">
                  <p>Estimate delivery times: 3-6 days (International)</p>
                  <p>
                    Return within 45 days of purchase. Duties & taxes are
                    non-refundable.
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-6 divide-y py-10 text-stone-500 lg:py-0">
                <div className="flex w-full items-center justify-between pt-6">
                  <div className="flex items-center space-x-2">
                    <ShieldCheck className="size-6" />
                    <p className="">Warranty</p>
                  </div>
                  <ArrowRight className="size-5" />
                </div>
                <div className="flex w-full items-center justify-between pt-6">
                  <div className="flex items-center space-x-2">
                    <ContainerIcon className="size-6" />
                    <p className="">Shipping & delivery</p>
                  </div>
                  <ArrowRight className="size-5" />
                </div>
                <div className="flex w-full items-center justify-between pt-6">
                  <div className="flex items-center space-x-2">
                    <HeadsetIcon className="size-6" />
                    <p className="">Support</p>
                  </div>
                  <ArrowRight className="size-5" />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-12 flex flex-col items-center justify-around space-y-10 rounded-2xl bg-muted py-10 lg:flex-row lg:space-y-0">
            <div className="flex flex-col items-center gap-2 lg:flex-row lg:gap-4">
              <TruckIcon
                strokeWidth={1.5}
                className="size-16 rounded-2xl bg-card p-4 text-muted-foreground shadow-sm"
              />
              <div className="text-center lg:text-start">
                <p className="text-lg">Free Shipping</p>
                <p className="font-light text-muted-foreground">
                  200+ orders ship free
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-2 lg:flex-row lg:gap-4">
              <CreditCardIcon
                strokeWidth={1.5}
                className="size-16 rounded-2xl bg-card p-4 text-muted-foreground shadow-sm"
              />
              <div className="text-center lg:text-start">
                <p className="text-lg">Secure Payments</p>
                <p className="font-light text-muted-foreground">
                  Trusted payment options
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-2 lg:flex-row lg:gap-4">
              <Undo2Icon
                strokeWidth={1.5}
                className="size-16 rounded-2xl bg-card p-4 text-muted-foreground shadow-sm"
              />
              <div className="text-center lg:text-start">
                <p className="text-lg">45 Days Free Return</p>
                <p className="font-light text-muted-foreground">
                  Easy, risk-free returns
                </p>
              </div>
            </div>
          </div>
          {product.reviews.length > 0 && (
            <div className="p-10">reviews here</div>
          )}
        </>
      )}
    </div>
  );
}

interface RatingStarsProps {
  rating: number; // The rating to render
}

function RatingStars({ rating }: RatingStarsProps) {
  // To round the rating to the nearest half for rendering purposes
  const roundedRating = Math.round(rating * 2) / 2;

  const renderStars = () => {
    const stars = [];

    // Generates the stars based on the rounded rating
    for (let i = 1; i <= 5; i++) {
      if (i <= roundedRating) {
        stars.push(
          <Star
            key={i}
            className="inline size-5 fill-yellow-500 text-primary"
          />,
        );
      } else if (i - 0.5 === roundedRating) {
        stars.push(
          <div className="relative inline-flex">
            <StarHalf
              key={i}
              className="inline size-5 fill-yellow-500 text-primary"
              strokeWidth={1.5}
            />
            <EmptyStar
              key={i}
              className="absolute inset-0 inline size-5 text-primary"
            />
          </div>,
        );
      } else {
        stars.push(
          <EmptyStar key={i} className="inline size-5 text-primary" />,
        );
      }
    }

    return stars;
  };

  return <div className="flex">{renderStars()}</div>;
}
