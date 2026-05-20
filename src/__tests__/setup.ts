/// <reference types="@testing-library/jest-dom/vitest" />
import "@testing-library/jest-dom/vitest";

type IntersectionCallback = (entries: IntersectionObserverEntry[]) => void;

const intersectionObserverCallbacks: Map<Element, IntersectionCallback> = new Map();

/**
 * Simulates an IntersectionObserver entry for a given element in tests.
 * @param element - The DOM element to simulate intersection for
 * @param isIntersecting - Whether the element is intersecting
 */
export function simulateIntersection(element: Element, isIntersecting = true): void {
  const callback = intersectionObserverCallbacks.get(element);
  if (!callback) return;

  callback([{ isIntersecting, target: element } as IntersectionObserverEntry]);
}

class MockIntersectionObserver implements IntersectionObserver {
  readonly root: Element | Document | null = null;
  readonly rootMargin: string = "";
  readonly thresholds: ReadonlyArray<number> = [];
  private callback: IntersectionCallback;
  private elements: Set<Element> = new Set();

  constructor(callback: IntersectionCallback) {
    this.callback = callback;
  }

  observe(element: Element): void {
    this.elements.add(element);
    intersectionObserverCallbacks.set(element, this.callback);
  }

  unobserve(element: Element): void {
    this.elements.delete(element);
    intersectionObserverCallbacks.delete(element);
  }

  disconnect(): void {
    this.elements.forEach((el) => intersectionObserverCallbacks.delete(el));
    this.elements.clear();
  }

  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
}

globalThis.IntersectionObserver = MockIntersectionObserver as unknown as typeof IntersectionObserver;
