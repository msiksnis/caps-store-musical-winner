import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { cn } from "../../lib/utils";
import { useCartStore } from "../../stores/cartStore";
import { useNavigate } from "@tanstack/react-router";
import { ChevronsUpDownIcon, LoaderCircleIcon } from "lucide-react";
import { Button } from "../Button";
import { useSEO } from "../../hooks/useSEO";

/**
 * Schema for form validation using Zod
 */
const checkoutSchema = z.object({
  firstName: z.string().min(3, "Required"),
  lastName: z.string().min(3, "Required"),
  email: z.string().email("Invalid email format"),
  address: z.string().min(3, "Required"),
  postCode: z.string().min(4, "Required").max(4),
  country: z.string().min(2, "Required"),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

/**
 * PaymentForm component handles user input, validates data, and processes payment with Stripe.
 */
export default function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);
  const clearCart = useCartStore((state) => state.clearCart);
  const [loading, setLoading] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Sets SEO properties for the Checkout page
  useSEO({
    title: "Cap's Store | Checkout",
    description:
      "Complete your purchase at Cap's Store. Enter your details to finish the checkout process.",
    keywords: "Cap's Store, Checkout, Online Shopping",
    currentPath: "/checkout",
    ogTitle: "Cap's Store | Checkout",
    ogDescription:
      "Complete your purchase at Cap's Store. Enter your details to finish the checkout process.",
    ogImage: "/assets/logo.png",
    ogUrl: window.location.href,
  });

  /**
   * React Hook Form setup with Zod validation.
   */
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
  });

  /**
   * List of available countries to select in the dropdown.
   */
  const countries = [
    { label: "Norway", value: "NO" },
    { label: "Sweden", value: "SE" },
    { label: "Denmark", value: "DK" },
    { label: "Finland", value: "FI" },
  ];

  /**
   * Get total price from the cart and format it to 2 decimal places.
   */
  const totalAmount = getTotalPrice().toFixed(2);

  // To watch for the selected country
  const selectedCountry = watch("country", "NO");

  /**
   * To handle the selection of a country from the dropdown.
   */
  const handleSelect = (country: { label: string; value: string }) => {
    setValue("country", country.value); // Update form value directly
    setIsDropdownOpen(false);
  };

  /**
   * Handles the submission of the payment form.
   * Sends the payment request to Stripe and handles responses.
   * @param {CheckoutFormData} data - The validated form data.
   */
  const paymentHandler = async (data: CheckoutFormData) => {
    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      toast.error("Please enter your card details.");
      return;
    }

    setLoading(true);

    try {
      const amount = Math.round(getTotalPrice() * 100); // Converts to smallest currency unit
      const response = await fetch(
        "/.netlify/functions/create-payment-intent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ amount }),
        },
      ).then((res) => res.json());

      const {
        paymentIntent: { client_secret },
      } = response;

      const paymentResult = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: `${data.firstName} ${data.lastName}`,
            email: data.email,
            address: {
              line1: data.address,
              postal_code: data.postCode,
              country: data.country,
            },
          },
        },
      });

      if (paymentResult.error) {
        console.error(paymentResult.error.message);
        toast.error("Payment failed. Please try again.");
      } else if (paymentResult.paymentIntent?.status === "succeeded") {
        toast.success("Payment succeeded!");
        clearCart();
        navigate({ to: "/purchase-complete" });
      }
    } catch (error) {
      toast.error("An error occurred during payment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto mt-14 max-w-xl p-8 px-4 md:mt-32 md:px-10">
      <h1 className="mb-2 text-3xl md:text-4xl">Checkout</h1>
      <p className="mb-8 text-pretty text-lg font-light leading-6 text-gray-600">
        Please enter your details to complete the payment.
      </p>
      <form onSubmit={handleSubmit(paymentHandler)} aria-disabled={loading}>
        {/* User Details Inputs */}
        <div className="mt-8 flex h-full flex-col gap-8">
          <div className="flex gap-4">
            {/* First Name */}
            <div className="relative flex-1">
              <input
                id="firstName"
                type="text"
                aria-label="First name"
                placeholder="First name"
                className={cn(
                  "w-full rounded-lg border border-gray-200 bg-card px-4 py-2.5 text-primary shadow-sm outline-none placeholder:text-gray-600 focus:border-muted-foreground",
                  { "border-red-500": errors.firstName },
                )}
                {...register("firstName")}
              />
              {errors.firstName && (
                <div className="absolute -bottom-6 left-0 text-sm text-red-500">
                  {errors.firstName.message}
                </div>
              )}
            </div>
            {/* Last Name */}
            <div className="relative flex-1">
              <input
                id="lastName"
                type="text"
                aria-label="Last name"
                placeholder="Last name"
                className={cn(
                  "w-full rounded-lg border border-gray-200 bg-card px-4 py-2.5 text-primary shadow-sm outline-none placeholder:text-gray-600 focus:border-muted-foreground",
                  { "border-red-500": errors.lastName },
                )}
                {...register("lastName")}
              />
              {errors.lastName && (
                <div className="absolute -bottom-6 left-0 text-sm text-red-500">
                  {errors.lastName.message}
                </div>
              )}
            </div>
          </div>
          {/* Email */}
          <div className="relative flex-1">
            <input
              id="email"
              type="email"
              aria-label="Email"
              placeholder="Email"
              className={cn(
                "w-full rounded-lg border border-gray-200 bg-card px-4 py-2.5 text-primary shadow-sm outline-none placeholder:text-gray-600 focus:border-muted-foreground",
                { "border-red-500": errors.email },
              )}
              {...register("email")}
            />
            {errors.email && (
              <div className="absolute -bottom-6 left-0 text-sm text-red-500">
                {errors.email.message}
              </div>
            )}
          </div>

          {/* Address */}
          <div className="relative flex-1">
            <input
              id="address"
              type="text"
              aria-label="Address"
              placeholder="Address"
              className={cn(
                "w-full rounded-lg border border-gray-200 bg-card px-4 py-2.5 text-primary shadow-sm outline-none placeholder:text-gray-600 focus:border-muted-foreground",
                { "border-red-500": errors.address },
              )}
              {...register("address")}
            />
            {errors.address && (
              <div className="absolute -bottom-6 left-0 text-sm text-red-500">
                {errors.address.message}
              </div>
            )}
          </div>

          {/* Post code */}
          <div className="relative flex-1">
            <input
              id="postCode"
              type="text"
              aria-label="Post code"
              placeholder="Post Code"
              className={cn(
                "w-full rounded-lg border border-gray-200 bg-card px-4 py-2.5 text-primary shadow-sm outline-none placeholder:text-gray-600 focus:border-muted-foreground",
                { "border-red-500": errors.postCode },
              )}
              {...register("postCode")}
            />
            {errors.postCode && (
              <div className="absolute -bottom-6 left-0 text-sm text-red-500">
                {errors.postCode.message}
              </div>
            )}
          </div>

          {/* Country Dropdown */}
          <div className="relative flex-1">
            <div
              aria-label="Open country selection"
              className={cn(
                "w-full cursor-pointer rounded-lg border border-gray-200 bg-card px-4 py-2.5 text-primary shadow-sm outline-none",
                { "border-red-500": errors.country },
              )}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              {countries.find((c) => c.value === selectedCountry)?.label}
              <ChevronsUpDownIcon
                className="pointer-events-none absolute right-4 top-1/2 size-5 -translate-y-1/2 transform text-muted-foreground"
                strokeWidth={1.5}
              />
            </div>
            {isDropdownOpen && (
              <div className="absolute left-0 z-10 mt-2 w-full rounded-lg border border-gray-200 bg-white shadow-lg">
                {countries.map((country) => (
                  <div
                    aria-label={`Select ${country.label}`}
                    key={country.value}
                    className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                    onClick={() => handleSelect(country)}
                  >
                    {country.label}
                  </div>
                ))}
              </div>
            )}
            {errors.country && (
              <div className="absolute -bottom-6 left-0 text-sm text-red-500">
                {errors.country.message}
              </div>
            )}
            {/* Hidden input to pass the value to form */}
            <input
              type="hidden"
              {...register("country")}
              value={selectedCountry}
            />
          </div>

          {/* Card Element */}
          <div className="relative flex-1">
            <div className="mb-2">
              <strong>Use Stripe test card details!</strong>
              <p className="">Card number: 4242 4242 4242 4242</p>
              <p className="">Expiry: Any future date</p>
              <p className="">CVC: Any 3 digits</p>
            </div>
            <div className="rounded-lg border p-3">
              <CardElement
                id="card-element"
                options={{
                  style: {
                    base: {
                      fontSize: "16px",
                      color: "#495057",
                      "::placeholder": {
                        color: "#6c757d",
                      },
                    },
                  },
                  hidePostalCode: true,
                }}
              />
            </div>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between">
          {/* Display total amount */}
          <p className="text-xl font-semibold text-primary">
            Total: {totalAmount} NOK
          </p>

          <Button
            type="submit"
            aria-label="Pay now"
            rounded="lg"
            disabled={loading || !stripe || !elements}
            className="h-fit px-10 py-2.5 text-white"
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <LoaderCircleIcon className="size-4 animate-spin" />
                Paying...
              </div>
            ) : (
              "Pay Now"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
