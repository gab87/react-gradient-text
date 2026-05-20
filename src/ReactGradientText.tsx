import type { CSSProperties } from "react";
import type { ReactGradientTextProps } from "./ReactGradientText.types";
import { isFadeIn, getFadeInStartStyle, getFadeInEndStyle } from "./Animations";
import { useIntersectionObserver } from "./UseIntersectionObserver";
import { useScrambleAnimation } from "./UseScrambleAnimation";

const DEFAULT_DIRECTION = "to right";
const DEFAULT_DURATION = 500;

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
 * Computes the animation-specific inline styles based on the current visibility state.
 * @param params - Object with animation type, duration, and visibility flag
 * @returns CSSProperties for the current animation state
 */
function getAnimationStyle({
  animation,
  duration,
  isVisible,
}: {
  animation: ReactGradientTextProps["animation"];
  duration: number;
  isVisible: boolean;
}): CSSProperties {
  if (!animation) return {};
  if (!isFadeIn(animation)) return {};

  return isVisible
    ? getFadeInEndStyle({ duration })
    : getFadeInStartStyle({ animation, duration });
}

/**
 * ReactGradientText renders text with a CSS gradient applied.
 * Colors are distributed equally across the gradient.
 * Supports fade-in and scramble animations triggered by IntersectionObserver.
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
  animation,
  duration = DEFAULT_DURATION,
  ...rest
}: ReactGradientTextProps) {
  const { ref, isVisible } = useIntersectionObserver<HTMLElement>();
  const isScramble = animation === "scramble";
  const scrambleActive = isScramble && isVisible;

  const displayText = useScrambleAnimation({
    text,
    duration,
    isActive: scrambleActive,
  });

  const gradient = buildGradient({ colors, direction });
  const animationStyle = getAnimationStyle({ animation, duration, isVisible });

  const gradientStyle: CSSProperties = {
    backgroundImage: gradient,
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    WebkitTextFillColor: "transparent",
    color: "transparent",
    width: "fit-content",
    ...animationStyle,
    ...style,
  };

  const renderedText = isScramble ? displayText : text;

  return (
    <Component
      ref={animation ? ref : undefined}
      className={className}
      style={gradientStyle}
      {...rest}
    >
      {renderedText}
    </Component>
  );
}

export { ReactGradientText, buildGradient };
