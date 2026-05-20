import type { CSSProperties } from "react";
import type { AnimationType } from "./ReactGradientText.types";

const FADE_OFFSET_PX = 20;

type TranslateOffset = { x: number; y: number };

const FADE_IN_OFFSETS: Record<string, TranslateOffset> = {
  "fade-in-up": { x: 0, y: FADE_OFFSET_PX },
  "fade-in-down": { x: 0, y: -FADE_OFFSET_PX },
  "fade-in-left": { x: FADE_OFFSET_PX, y: 0 },
  "fade-in-right": { x: -FADE_OFFSET_PX, y: 0 },
  "fade-in-top-left": { x: FADE_OFFSET_PX, y: FADE_OFFSET_PX },
  "fade-in-top-right": { x: -FADE_OFFSET_PX, y: FADE_OFFSET_PX },
  "fade-in-bottom-left": { x: FADE_OFFSET_PX, y: -FADE_OFFSET_PX },
  "fade-in-bottom-right": { x: -FADE_OFFSET_PX, y: -FADE_OFFSET_PX },
};

/**
 * Checks whether the given animation is a fade-in variant.
 * @param animation - The animation type to check
 * @returns True if the animation is a fade-in type
 */
function isFadeIn(animation: AnimationType): boolean {
  return animation.startsWith("fade-in-");
}

/**
 * Returns the initial CSS styles for a fade-in animation (hidden state).
 * @param animation - A fade-in animation type
 * @param duration - Transition duration in milliseconds
 * @returns CSSProperties for the hidden state
 */
function getFadeInStartStyle({
  animation,
  duration,
}: {
  animation: AnimationType;
  duration: number;
}): CSSProperties {
  const offset = FADE_IN_OFFSETS[animation];
  if (!offset) return {};

  return {
    display: "inline-block",
    opacity: 0,
    transform: `translate(${offset.x}px, ${offset.y}px)`,
    transition: `opacity ${duration}ms ease-out, transform ${duration}ms ease-out`,
  };
}

/**
 * Returns the final CSS styles for a fade-in animation (visible state).
 * @param duration - Transition duration in milliseconds
 * @returns CSSProperties for the visible state
 */
function getFadeInEndStyle({ duration }: { duration: number }): CSSProperties {
  return {
    display: "inline-block",
    opacity: 1,
    transform: "translate(0, 0)",
    transition: `opacity ${duration}ms ease-out, transform ${duration}ms ease-out`,
  };
}

export { isFadeIn, getFadeInStartStyle, getFadeInEndStyle };
