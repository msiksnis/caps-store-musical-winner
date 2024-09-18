import { useState } from "react";
import toast from "react-hot-toast";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircleIcon } from "lucide-react";

import { cn } from "../../lib/utils";
import { Button } from "../Button";

interface FormProps {
  fullName: string;
  email: string;
  message: string;
}

// Schema definition using Zod for form validation
const supportFormSchema = z.object({
  fullName: z.string().min(3, "Name is required"),
  email: z.string().email("Invalid email format"),
  message: z
    .string()
    .min(3, "Please include a message of at least 3 characters"),
});

/**
 * A functional component representing a form for support.
 *
 * This form includes input fields for full name, email, and message,
 * and uses Zod for schema validation along with react-hook-form for form state management.
 * Validation errors are shown inline under each field.
 *
 * @component
 * @example
 * return (
 *   <SupportForm />
 * )
 */
export default function SupportForm() {
  const [loading, setLoading] = useState(false);
  // Initialize react-hook-form with Zod schema resolver
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormProps>({
    resolver: zodResolver(supportFormSchema),
  });

  /**
   * Handles form submission.
   * It sends the form data to the Netlify serverless function for sending an email.
   * It displays a success toast if the email is sent successfully.
   * It displays an error toast if the email fails to send.
   * It also logs the form data to the console.
   *
   * @param {FormProps} data - The form data containing fullName, email, and message.
   */
  const onSubmit = async (data: FormProps) => {
    console.log(data);

    setLoading(true);

    try {
      const response = await fetch("/.netlify/functions/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("An error occurred while sending the message");
      }

      toast.success("Your message was sent successfully!");
      reset(); // Reset the form after submission;
    } catch (error) {
      if (typeof error === "string") {
        toast.error(error);
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="mt-8 flex h-full flex-col gap-8"
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* Full Name Field */}
      <div className="flex flex-col gap-8 md:flex-row md:gap-4">
        <div className="relative flex-1">
          <label htmlFor="fullName" className="sr-only">
            Full Name
          </label>
          <input
            placeholder="Full name"
            className={cn(
              "w-full rounded-xl border border-gray-100 bg-gray-100 p-4 text-primary shadow-sm outline-none placeholder:text-gray-600",
              { "border-red-500": errors.fullName },
            )}
            id="fullName"
            {...register("fullName")}
          />
          {errors.fullName && (
            <div className="absolute -bottom-6 left-0 text-sm text-red-500">
              {errors.fullName.message}
            </div>
          )}
        </div>
      </div>

      {/* Email Field */}
      <div className="relative flex-1">
        <label htmlFor="email" className="sr-only">
          Email
        </label>
        <input
          placeholder="Email"
          className={cn(
            "w-full rounded-xl border border-gray-100 bg-gray-100 p-4 text-primary shadow-sm outline-none placeholder:text-gray-600",
            { "border-red-500 focus-visible:ring-0": errors.email },
          )}
          id="email"
          {...register("email")}
        />
        {errors.email && (
          <div className="absolute -bottom-6 left-0 text-sm text-red-500">
            {errors.email.message}
          </div>
        )}
      </div>

      {/* Message Field */}
      <div className="relative flex h-full flex-col">
        <label htmlFor="message" className="sr-only">
          Message
        </label>
        <textarea
          placeholder="Message"
          className={cn(
            "min-h-40 w-full flex-grow resize-none rounded-xl border border-gray-100 bg-gray-100 p-4 text-primary shadow-sm outline-none placeholder:text-gray-600",
            { "border-red-500 focus-visible:ring-0": errors.message },
          )}
          id="message"
          {...register("message")}
        />
        {errors.message && (
          <div className="absolute -bottom-6 left-0 text-sm text-red-500">
            {errors.message.message}
          </div>
        )}
      </div>

      {/* Submit Button */}
      <Button size="full" rounded="xl" disabled={loading}>
        {loading ? (
          <div className="flex items-center justify-center">
            <LoaderCircleIcon className="mr-2 size-5 animate-spin" />
            Sending...
          </div>
        ) : (
          "Send Message"
        )}
      </Button>
    </form>
  );
}
