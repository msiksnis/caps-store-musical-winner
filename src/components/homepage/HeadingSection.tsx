import { motion } from "framer-motion";

import GradualSpacing from "../GradualSpacing";
import { blurInVariants } from "../../lib/utils";

export default function HeadingSection() {
  return (
    <div className="mt-32">
      <GradualSpacing
        text="Cap's Store"
        className="text-primary text-5xl font-medium tracking-[-0.1em] sm:text-[3.5rem] md:text-[4rem] md:leading-[5rem]"
      />
      <motion.h2
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5, delay: 0.1 }}
        variants={blurInVariants}
        className="text-muted-foreground text-pretty py-4 text-xl font-light"
      >
        Check out our full collection of products tailored to your needs
      </motion.h2>
    </div>
  );
}
