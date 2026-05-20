import { useState, useEffect, useRef } from "react";

interface UseScrambleAnimationParams {
  text: string;
  duration: number;
  isActive: boolean;
}

/**
 * Shuffles an array of characters in place using Fisher-Yates algorithm.
 * @param chars - Array of characters to shuffle
 * @returns The same array, shuffled
 */
function shuffleChars(chars: string[]): string[] {
  for (let i = chars.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [chars[i], chars[j]] = [chars[j], chars[i]];
  }
  return chars;
}

/**
 * Custom hook that animates text by progressively revealing characters
 * from a scrambled state to the final text.
 * Uses the same characters from the original text as scramble noise.
 * @param params - Object with text, duration (ms), and isActive flag
 * @returns The current display text during the animation
 */
function useScrambleAnimation({
  text,
  duration,
  isActive,
}: UseScrambleAnimationParams): string {
  const [displayText, setDisplayText] = useState(text);
  const rafRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);

  useEffect(() => {
    if (!isActive) {
      setDisplayText(text);
      return;
    }

    const textLength = text.length;
    if (textLength === 0) {
      setDisplayText("");
      return;
    }

    const textChars = text.split("");

    startTimeRef.current = performance.now();

    /**
     * Animation frame callback that computes the current scrambled text.
     * @param now - Current timestamp from requestAnimationFrame
     */
    function animate(now: number): void {
      const elapsed = now - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const revealedCount = Math.floor(progress * textLength);

      if (progress >= 1) {
        setDisplayText(text);
        return;
      }

      const revealed = textChars.slice(0, revealedCount);
      const remaining = textChars.slice(revealedCount);
      const scrambled = shuffleChars([...remaining]);
      setDisplayText(revealed.join("") + scrambled.join(""));

      rafRef.current = requestAnimationFrame(animate);
    }

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
    };
  }, [isActive, text, duration]);

  return displayText;
}

export { useScrambleAnimation };
