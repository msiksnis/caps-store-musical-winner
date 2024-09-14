import toast from "react-hot-toast";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { cn } from "../../lib/utils";

interface FormProps {
  fullName: string;
  subject: string;
  email: string;
  message: string;
}

// Schema definition using Zod for form validation
const supportFormSchema = z.object({
  fullName: z.string().min(3, "Name is required"),
  subject: z.string().min(3, "Subject is required"),
  email: z.string().email("Invalid email format"),
  message: z
    .string()
    .min(3, "Please include a message of at least 3 characters"),
});

/**
 * A functional component representing a form for support.
 *
 * This form includes input fields for full name, subject, email, and message,
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
   * For now, it simply logs the form data and displays a success toast.
   * Console.log can be replaced with actual API calls to handle form data.
   *
   * @param {FormProps} data - The form data containing fullName, subject, email, and message.
   */
  const onSubmit = async (data: FormProps) => {
    console.log(data);

    toast.success("Your message was sent successfully!");
    reset(); // Reset the form after submission
  };

  return (
    <form
      className="mt-8 flex h-full flex-col gap-8"
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* Full Name and Subject Fields */}
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
        <div className="relative flex-1">
          <label htmlFor="subject" className="sr-only">
            Subject
          </label>
          <input
            placeholder="Subject"
            className={cn(
              "w-full rounded-xl border border-gray-100 bg-gray-100 p-4 text-primary shadow-sm outline-none placeholder:text-gray-600",
              { "border-red-500 focus-visible:ring-0": errors.subject },
            )}
            id="subject"
            {...register("subject")}
          />
          {errors.subject && (
            <div className="absolute -bottom-6 left-0 text-sm text-red-500">
              {errors.subject.message}
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
      <button className="w-full rounded-xl bg-primary py-4 font-semibold text-background shadow-sm transition-colors duration-300 hover:bg-gray-800">
        Send Message
      </button>
    </form>
  );
}
