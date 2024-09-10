import { AnimatePresence, motion, Variants } from "framer-motion";

import { cn } from "../lib/utils";

interface GradualSpacingProps {
  text: string;
  duration?: number;
  delayMultiple?: number;
  framerProps?: Variants;
  className?: string;
}

/**
 * GradualSpacing component animates the appearance of each character in a given text string.
 *
 * Each character is animated with a slight delay, creating a gradual text reveal effect. The component
 * uses Framer Motion for the animation, and the animation variants can be customized via props.
 *
 * @param {GradualSpacingProps} props - The props for the GradualSpacing component.
 * @param {string} props.text - The text string to animate.
 * @param {number} [props.duration=0.5] - Duration of each character's animation.
 * @param {number} [props.delayMultiple=0.04] - Delay between each character's animation.
 * @param {Variants} [props.framerProps] - Custom animation variants for Framer Motion.
 * @param {string} [props.className] - Additional class names for styling.
 *
 * @returns {JSX.Element} A div element containing animated characters of the given text.
 */
export default function GradualSpacing({
  text,
  duration = 0.5,
  delayMultiple = 0.04,
  framerProps = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  },
  className,
}: GradualSpacingProps): JSX.Element {
  return (
    <div className="flex space-x-1">
      <AnimatePresence>
        {text.split("").map((char, i) => (
          <motion.h1
            key={i}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={framerProps}
            transition={{ duration, delay: i * delayMultiple }}
            className={cn("drop-shadow-sm", className)}
          >
            {char === " " ? <span>&nbsp;</span> : char}
          </motion.h1>
        ))}
      </AnimatePresence>
    </div>
  );
}
