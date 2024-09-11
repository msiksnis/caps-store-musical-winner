import { motion } from "framer-motion";

import { blurInVariants } from "../../lib/utils";

export default function HeadingSection() {
  return (
    <div className="mt-32">
      <motion.h1
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5, delay: 0.1 }}
        variants={blurInVariants}
        className="text-5xl font-medium text-primary sm:text-[3.5rem] md:text-[4rem] md:leading-[5rem]"
      >
        Contact Us
      </motion.h1>
      <motion.h2
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5, delay: 0.2 }}
        variants={blurInVariants}
        className="text-pretty py-4 text-xl font-light text-muted-foreground md:w-2/3"
      >
        We're here to assist you with any inquiries, feedback, or assistance you
        may need. Whether you have questions about products, orders, or general
        inquiries, our dedicated customer support team is ready to help.
      </motion.h2>
    </div>
  );
}
