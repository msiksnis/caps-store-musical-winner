import { motion } from "framer-motion";
import { cn } from "../lib/utils";

interface BlurInTextProps {
  text: string;
  className?: string;
  variant?: {
    hidden: { filter: string; opacity: number };
    visible: { filter: string; opacity: number };
  };
  duration?: number;
  delay?: number;
}

const BlurInText = ({
  text,
  className,
  variant,
  duration = 0.5,
  delay = 0.1,
}: BlurInTextProps) => {
  const defaultVariants = {
    hidden: { filter: "blur(3px)", opacity: 0 },
    visible: { filter: "blur(0px)", opacity: 1 },
  };
  const combinedVariants = variant || defaultVariants;

  return (
    <motion.h1
      initial="hidden"
      animate="visible"
      transition={{ duration, delay }}
      variants={combinedVariants}
      className={cn(className, "drop-shadow-sm")}
    >
      {text}
    </motion.h1>
  );
};

export default BlurInText;
