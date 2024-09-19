import { motion } from "framer-motion";

import GradualSpacing from "../GradualSpacing";
import { blurInVariants } from "../../lib/utils";

export default function HeadingSection() {
  return (
    <div className="mt-14 md:mt-32">
      <GradualSpacing
        text="Mr Cap's Store"
        className="text-4xl font-medium tracking-[-0.1em] text-primary sm:text-[3.5rem] md:text-[4rem] md:leading-[5rem]"
      />
      <motion.h2
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5, delay: 0.2 }}
        variants={blurInVariants}
        className="text-pretty py-2 text-lg font-light leading-6 text-muted-foreground md:py-4 md:text-xl"
      >
        Check out our full collection of products tailored to your needs
      </motion.h2>
    </div>
  );
}
