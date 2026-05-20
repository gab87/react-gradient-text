import { useRef, useState, useEffect, useCallback } from "react";

const INTERSECTION_THRESHOLD = 0.1;

interface UseIntersectionObserverResult<T extends HTMLElement> {
  ref: React.RefCallback<T>;
  isVisible: boolean;
}

/**
 * Custom hook that detects when an element enters the viewport using IntersectionObserver.
 * Triggers only once and disconnects after the first intersection.
 * @returns An object with a ref callback and a boolean indicating visibility
 */
function useIntersectionObserver<
  T extends HTMLElement = HTMLElement,
>(): UseIntersectionObserverResult<T> {
  const [isVisible, setIsVisible] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const elementRef = useRef<T | null>(null);

  useEffect(() => {
    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  const ref = useCallback((node: T | null) => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    elementRef.current = node;

    if (!node) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          setIsVisible(true);
          observerRef.current?.disconnect();
        }
      },
      { threshold: INTERSECTION_THRESHOLD },
    );

    observerRef.current.observe(node);
  }, []);

  return { ref, isVisible };
}

export { useIntersectionObserver };
export type { UseIntersectionObserverResult };
