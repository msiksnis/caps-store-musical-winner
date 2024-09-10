import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

import { cn } from "../lib/utils";

/**
 * NumberTicker component animates a number value using a smooth spring animation.
 *
 * It triggers the animation once the number comes into view and increments or decrements the value
 * based on the provided `direction` prop. The `delay` prop controls the delay before the animation starts.
 *
 * @param {object} props - The props for the NumberTicker component.
 * @param {number} props.value - The target number to animate to.
 * @param {"up" | "down"} [props.direction="up"] - Direction of the animation, either up or down.
 * @param {number} [props.delay=0] - Delay before the animation starts (in seconds).
 * @param {string} [props.className] - Additional class names for styling.
 *
 * @returns {JSX.Element} A span element that displays the animated number.
 */
export default function NumberTicker({
  value,
  direction = "up",
  delay = 0,
  className,
}: {
  value: number;
  direction?: "up" | "down";
  className?: string;
  delay?: number; // delay in seconds
}): JSX.Element {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(direction === "down" ? value : 0);
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100,
  });
  const isInView = useInView(ref, { once: true, margin: "0px" });

  /**
   * Trigger the animation when the number comes into view and after the specified delay.
   */
  useEffect(() => {
    if (isInView) {
      setTimeout(() => {
        motionValue.set(direction === "down" ? 0 : value);
      }, delay * 1000);
    }
  }, [motionValue, isInView, delay, value, direction]);

  /**
   * Updates the displayed number every time the spring value changes.
   * The number is formatted using `Intl.NumberFormat` for better readability.
   */
  useEffect(
    () =>
      springValue.on("change", (latest) => {
        if (ref.current) {
          ref.current.textContent = Intl.NumberFormat("en-US").format(
            Number(latest.toFixed(0)),
          );
        }
      }),
    [springValue],
  );

  return (
    <span
      className={cn(
        "inline-block tabular-nums tracking-wider text-black dark:text-white",
        className,
      )}
      ref={ref}
    />
  );
}
