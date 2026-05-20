import type { ElementType, HTMLAttributes } from "react";

export type AnimationType =
  | "fade-in-up"
  | "fade-in-down"
  | "fade-in-left"
  | "fade-in-right"
  | "fade-in-top-left"
  | "fade-in-top-right"
  | "fade-in-bottom-left"
  | "fade-in-bottom-right"
  | "scramble";

export interface ReactGradientTextProps
  extends HTMLAttributes<HTMLElement> {
  /** Text to render with gradient */
  text: string;
  /** Array of CSS color strings for the gradient */
  colors: string[];
  /** CSS gradient direction (e.g. "to right", "45deg") */
  direction?: string;
  /** HTML element type to render */
  as?: ElementType;
  /** Animation to apply when the element enters the viewport */
  animation?: AnimationType;
  /** Animation duration in milliseconds */
  duration?: number;
}
