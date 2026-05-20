import type { CSSProperties } from "react";
import type { ReactGradientTextProps } from "./ReactGradientText.types";

const DEFAULT_DIRECTION = "to right";

/**
 * Builds the linear-gradient CSS value from colors distributed equally.
 * @param colors - Array of CSS color strings
 * @param direction - CSS gradient direction
 * @returns CSS linear-gradient string
 */
function buildGradient({
  colors,
  direction,
}: {
  colors: string[];
  direction: string;
}): string {
  if (colors.length === 0) return "none";
  if (colors.length === 1) return `linear-gradient(${direction}, ${colors[0]} 0%, ${colors[0]} 100%)`;

  const stops = colors
    .map((color, index) => {
      const position = (index / (colors.length - 1)) * 100;
      return `${color} ${position}%`;
    })
    .join(", ");

  return `linear-gradient(${direction}, ${stops})`;
}

/**
 * ReactGradientText renders text with a CSS gradient applied.
 * Colors are distributed equally across the gradient.
 * @param props - Component props
 * @returns JSX element with gradient text
 */
function ReactGradientText({
  text,
  colors,
  direction = DEFAULT_DIRECTION,
  as: Component = "span",
  className,
  style,
  ...rest
}: ReactGradientTextProps) {
  const gradient = buildGradient({ colors, direction });

  const gradientStyle: CSSProperties = {
    backgroundImage: gradient,
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    WebkitTextFillColor: "transparent",
    color: "transparent",
    width: "fit-content",
    ...style,
  };

  return (
    <Component
      className={className}
      style={gradientStyle}
      {...rest}
    >
      {text}
    </Component>
  );
}

export { ReactGradientText, buildGradient };
