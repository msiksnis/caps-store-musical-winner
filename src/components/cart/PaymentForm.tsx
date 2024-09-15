import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { cn } from "../../lib/utils";
import { useCartStore } from "../../stores/cartStore";
import { useNavigate } from "@tanstack/react-router";
import {
  ChevronsDownUpIcon,
  ChevronsUpDownIcon,
  LoaderCircleIcon,
} from "lucide-react";
import { useState } from "react";

const checkoutSchema = z.object({
  firstName: z.string().min(3, "Required"),
  lastName: z.string().min(3, "Required"),
  email: z.string().email("Invalid email format"),
  address: z.string().min(3, "Required"),
  postCode: z.string().min(4, "Required").max(4),
  country: z.string().min(2, "Required"),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

export default function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);
  const clearCart = useCartStore((state) => state.clearCart);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
  });

  const totalAmount = getTotalPrice().toFixed(2);

  const paymentHandler = async (data: CheckoutFormData) => {
    if (!stripe || !elements) return;

    setLoading(true);

    try {
      const amount = Math.round(getTotalPrice() * 100); // Convert to the smallest currency unit (cents)
      const response = await fetch(
        "/.netlify/functions/create-payment-intent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ amount }), // Pass the dynamic amount
        },
      ).then((res) => res.json());

      const {
        paymentIntent: { client_secret },
      } = response;

      const paymentResult = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardElement)!,
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
      console.error("Error processing payment", error);
      toast.error("An error occurred during payment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(paymentHandler)}
      className="mx-auto mt-14 max-w-xl rounded-lg bg-card p-8 px-4 md:mt-32 md:px-10"
    >
      {/* User Details Inputs */}
      <div className="mt-8 flex h-full flex-col gap-8">
        <div className="flex gap-4">
          {/* First Name */}
          <div className="relative flex-1">
            <input
              id="firstName"
              type="text"
              placeholder="First name"
              className={cn(
                "w-full rounded-xl border border-gray-100 bg-gray-100 px-4 py-2.5 text-primary shadow-sm outline-none placeholder:text-gray-600",
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
              placeholder="Last name"
              className={cn(
                "w-full rounded-xl border border-gray-100 bg-gray-100 px-4 py-2.5 text-primary shadow-sm outline-none placeholder:text-gray-600",
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
            placeholder="Email"
            className={cn(
              "w-full rounded-xl border border-gray-100 bg-gray-100 px-4 py-2.5 text-primary shadow-sm outline-none placeholder:text-gray-600",
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
            placeholder="Address"
            className={cn(
              "w-full rounded-xl border border-gray-100 bg-gray-100 px-4 py-2.5 text-primary shadow-sm outline-none placeholder:text-gray-600",
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
            placeholder="Post Code"
            className={cn(
              "w-full rounded-xl border border-gray-100 bg-gray-100 px-4 py-2.5 text-primary shadow-sm outline-none placeholder:text-gray-600",
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

        {/* Country */}
        <div className="relative flex-1">
          <select
            id="country"
            className={cn(
              "w-full cursor-pointer appearance-none rounded-xl border border-gray-100 bg-gray-100 px-4 py-2.5 text-primary shadow-sm outline-none",
              { "border-red-500": errors.country },
            )}
            {...register("country")}
          >
            <option value="NO">Norway</option>
            <option value="SE">Sweden</option>
            <option value="DK">Denmark</option>
            <option value="FI">Finland</option>
          </select>
          <ChevronsUpDownIcon
            className="absolute right-4 top-1/2 size-5 -translate-y-1/2 transform text-muted-foreground"
            strokeWidth={1.5}
          />
          {errors.country && (
            <div className="absolute -bottom-6 left-0 text-sm text-red-500">
              {errors.country.message}
            </div>
          )}
        </div>

        {/* Card Element */}
        <div className="relative flex-1">
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

        <button
          type="submit"
          disabled={loading || !stripe || !elements}
          className="rounded-lg bg-primary px-10 py-2.5 font-semibold text-white shadow-sm transition-all hover:bg-gray-900 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? (
            <div className="flex items-center gap-2">
              <LoaderCircleIcon className="size-4 animate-spin" />
              Paying...
            </div>
          ) : (
            "Pay Now"
          )}
        </button>
      </div>
    </form>
  );
}
