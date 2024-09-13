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
              className="relative w-full lg:w-1/2"
              onMouseEnter={handleMouseEnter}
            >
              <img
                src={product.image.url}
                alt={product.image.alt}
                className="max-h-[36rem] w-full rounded-2xl object-cover object-center opacity-95 shadow-sm group-hover:opacity-100"
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
            <div className="flex min-h-[36rem] w-full flex-col pt-10 md:pt-20 lg:w-1/2 lg:pl-10 lg:pt-0">
              <div className="flex-1">
                <h1 className="text-[2.5rem] font-light leading-10">
                  {product?.title}
                </h1>
                <h2 className="text-pretty pt-4 font-light text-muted-foreground">
                  {product?.description}
                </h2>
                <p className="flex flex-col py-8 text-3xl font-light">
                  {product?.price} NOK
                </p>
                <button className="w-full rounded-3xl bg-primary py-4 font-semibold text-background shadow-sm transition-colors duration-300 hover:bg-gray-800">
                  Buy Now
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
        </>
      )}
    </div>
  );
}
