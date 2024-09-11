import { motion } from "framer-motion";
import { blurInVariants } from "../../lib/utils";

export default function ContactDetails() {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.5, delay: 0.3 }}
      variants={blurInVariants}
      className="my-6 flex w-full flex-col-reverse justify-center gap-6 md:flex-row"
    >
      <div className="flex flex-col gap-6 md:w-1/3">
        <div className="flex h-full min-h-64 flex-col rounded-2xl bg-muted p-6 text-xl font-light text-muted-foreground md:min-h-max">
          <span className="pb-1">Phone number</span>
          <span className="">+47 941 28 174</span>
          <span className="mt-auto text-pretty text-lg leading-6 text-gray-700">
            Call us directly. We will provide information, answer technical
            questions, or schedule an appointment.
          </span>
        </div>
        <div className="flex h-full min-h-64 flex-col rounded-2xl bg-muted p-6 text-xl font-light text-muted-foreground md:min-h-max">
          <span className="pb-1">E-mail</span>
          <a href="mailto:devmarty@gmail.com">devmarty@gmail.com</a>
          <span className="mt-auto text-pretty text-lg leading-6 text-gray-700">
            Use email to provide information about the project. We will respond
            as soon as possible, providing comprehensive support.
          </span>
        </div>
      </div>
      <div className="flex aspect-square flex-col rounded-2xl bg-muted p-6 md:w-2/3">
        <span className="text-xl font-light text-muted-foreground">
          Drop us a message
        </span>
        <span className="text-balance pt-2 text-lg font-light leading-6 text-gray-700">
          We're always here to assist you at Cap&apos;s Store. Our customer
          support team is dedicated to addressing your inquiries.
        </span>
      </div>
    </motion.div>
  );
}
