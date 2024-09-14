import { ReactNode, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import {
  ArrowRight,
  ContainerIcon,
  CreditCardIcon,
  HeadsetIcon,
  ShieldCheck,
  TruckIcon,
  Undo2Icon,
} from "lucide-react";
import { motion } from "framer-motion";

import { Product } from "../../lib/types";
import { fetchProductById } from "../../api";
import Loader from "../Loader";
import Reviews from "./Reviews";
import RatingStars from "./RatingStars";
import ErrorLoadingButton from "../ErrorLoadingButton";
import WarrantyContent from "./WarrantyContent";
import ShippingContent from "./ShippingContent";
import SupportContent from "./SupportContent";
import Modal from "../Modal";
import DiscountTag from "../DiscountTag";
import { blurInVariants } from "../../lib/utils";

interface InfoItem {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  modalIcon: React.ComponentType<{ className?: string }>;
  modalTitle: string;
  modalContent: ReactNode;
}

const infoItems: InfoItem[] = [
  {
    label: "Warranty",
    icon: ShieldCheck,
    modalIcon: ShieldCheck,
    modalTitle: "Warranty Information",
    modalContent: <WarrantyContent />,
  },
  {
    label: "Shipping & Delivery",
    icon: ContainerIcon,
    modalIcon: TruckIcon,
    modalTitle: "Shipping & Delivery",
    modalContent: <ShippingContent />,
  },
  {
    label: "Support",
    icon: HeadsetIcon,
    modalIcon: HeadsetIcon,
    modalTitle: "Support",
    modalContent: <SupportContent />,
  },
];

interface ModalData {
  modalIcon: ReactNode;
  modalTitle: string;
  modalContent: ReactNode;
}

/**
 * Renders a detailed view of a single product, including images, pricing, ratings, and reviews.
 *
 * @returns A JSX element representing the single product page.
 */
export default function SingleProduct() {
  const { id } = useParams({ from: "/product/$id" });

  const [isAnimating, setIsAnimating] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState<ModalData | null>(null);

  // Fetch the product data based on the ID from the URL parameters
  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useQuery<Product>({
    queryKey: ["product", id],
    queryFn: () => fetchProductById(id),
    retry: 2,
  });

  if (isLoading) return <Loader />;

  const errorMessage =
    error instanceof Error
      ? `Error loading product: ${error.message}`
      : "An unexpected error occurred while loading the product.";

  if (error) {
    return <ErrorLoadingButton errorMessage={errorMessage} onRetry={refetch} />;
  }

  /**
   * Opens the modal with the specified item's content.
   *
   * @param item - The item containing modal data to display.
   */
  const openModal = (item: (typeof infoItems)[number]) => {
    setModalData({
      modalIcon: <item.modalIcon className="h-6 w-6" />,
      modalTitle: item.modalTitle,
      modalContent: item.modalContent,
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalData(null);
  };

  // Start the discount tag animation when the mouse enters the image area
  const handleMouseEnter = () => {
    setIsAnimating(true);
  };

  // Reset the animation state when the animation ends
  const handleAnimationEnd = () => {
    setIsAnimating(false);
  };

  return (
    <div className="mx-auto mt-20 px-4 sm:max-w-4xl md:mt-40 md:max-w-5xl md:px-10 xl:max-w-7xl">
      {product && (
        <motion.div
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.3, delay: 0.1 }}
          variants={blurInVariants}
        >
          <div className="flex flex-col lg:flex-row">
            <div
              className="relative w-full lg:w-7/12"
              onMouseEnter={handleMouseEnter}
            >
              <img
                src={product.image.url}
                alt={product.image.alt}
                loading="lazy"
                className="size-full max-h-[43rem] rounded-2xl object-cover object-center opacity-95 shadow-sm group-hover:opacity-100"
              />
              {product.price > product.discountedPrice && (
                <DiscountTag
                  originalPrice={product.price}
                  discountedPrice={product.discountedPrice}
                  isAnimating={isAnimating}
                  onAnimationEnd={handleAnimationEnd}
                  displayType="amount" // Displays discount amount
                />
              )}
            </div>
            <div className="flex min-h-[43rem] w-full flex-col pt-10 md:pt-20 lg:w-5/12 lg:pl-10 lg:pt-0">
              <div className="flex-1">
                <h1 className="text-[2.5rem] font-light leading-10">
                  {product.title}
                </h1>
                <h2 className="text-pretty py-4 font-light text-muted-foreground">
                  {product.description}
                </h2>
                {product?.rating > 0 && (
                  <div className="py-2">
                    <RatingStars rating={product.rating} />
                  </div>
                )}
                <p className="flex flex-col pb-8 pt-4 text-3xl font-light">
                  {product.discountedPrice < product.price ? (
                    <>
                      <span className="text-xl text-destructive line-through">
                        {product.price.toFixed(2)} NOK
                      </span>
                      <span>{product.discountedPrice.toFixed(2)} NOK</span>
                    </>
                  ) : (
                    <span>{product.price.toFixed(2)} NOK</span>
                  )}
                </p>

                <button
                  aria-label="Add product to cart"
                  className="w-full rounded-3xl bg-primary py-4 font-semibold text-background shadow-sm transition-colors duration-300 hover:bg-gray-800"
                >
                  Add to cart
                </button>
                <div className="pt-8 text-center font-extralight text-stone-600">
                  <p>Estimate delivery times: 3-6 days (International)</p>
                  <p>
                    Return within 45 days of purchase. Duties &amp; taxes are
                    non-refundable.
                  </p>
                </div>
              </div>

              <div className="flex flex-col divide-y py-10 text-stone-600 lg:py-0">
                {infoItems.map((item) => (
                  <button
                    key={item.label}
                    className="flex w-full items-center justify-between py-6 transition-all duration-200 hover:text-primary"
                    onClick={() => openModal(item)}
                  >
                    <div className="flex items-center space-x-2">
                      <item.icon className="h-6 w-6" />
                      <p>{item.label}</p>
                    </div>
                    <ArrowRight className="h-5 w-5" />
                  </button>
                ))}
              </div>
            </div>
          </div>
          <motion.div
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.3, delay: 0.3 }}
            variants={blurInVariants}
            className="mt-12 flex flex-col items-center justify-around space-y-10 rounded-2xl bg-muted py-10 lg:flex-row lg:space-y-0"
          >
            <div className="flex flex-col items-center gap-2 lg:flex-row lg:gap-4">
              <TruckIcon
                strokeWidth={1.5}
                className="size-16 rounded-2xl bg-card p-4 text-muted-foreground shadow-sm"
              />
              <div className="text-center lg:text-start">
                <p className="text-lg">Free Shipping</p>
                <p className="font-light text-muted-foreground">
                  200 NOK + orders ship free
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
          </motion.div>
          {product.reviews?.length > 0 && (
            // Render the Reviews component if there are reviews
            <motion.div
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.3, delay: 0.5 }}
              variants={blurInVariants}
            >
              <Reviews reviews={product.reviews} />
            </motion.div>
          )}
        </motion.div>
      )}
      {modalData && (
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          title={modalData.modalTitle}
          icon={modalData.modalIcon}
        >
          {modalData.modalContent}
        </Modal>
      )}
    </div>
  );
}
