import type { ElementType, HTMLAttributes } from "react";

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
}
