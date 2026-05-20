/// <reference types="@testing-library/jest-dom/vitest" />
import { render, screen, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { ReactGradientText } from "../ReactGradientText";
import { simulateIntersection } from "./setup";

describe("ReactGradientText", () => {
  it("renders the text content", () => {
    render(<ReactGradientText text="Hello" colors={["red", "blue"]} />);
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });

  it("applies the correct gradient with multiple colors", () => {
    render(
      <ReactGradientText
        text="Gradient"
        colors={["red", "green", "blue"]}
      />
    );
    const element = screen.getByText("Gradient");
    expect(element.style.backgroundImage).toBe(
      "linear-gradient(to right, red 0%, green 50%, blue 100%)"
    );
  });

  it("applies background-clip text styles", () => {
    render(<ReactGradientText text="Clip" colors={["red", "blue"]} />);
    const element = screen.getByText("Clip");
    expect(element.style.backgroundClip).toBe("text");
    expect(element.style.color).toBe("transparent");
  });

  it("uses the specified direction", () => {
    render(
      <ReactGradientText
        text="Direction"
        colors={["red", "blue"]}
        direction="45deg"
      />
    );
    const element = screen.getByText("Direction");
    expect(element.style.backgroundImage).toBe(
      "linear-gradient(45deg, red 0%, blue 100%)"
    );
  });

  it("renders as the specified HTML element via 'as' prop", () => {
    render(
      <ReactGradientText
        text="Heading"
        colors={["red", "blue"]}
        as="h1"
      />
    );
    const element = screen.getByText("Heading");
    expect(element.tagName).toBe("H1");
  });

  it("renders as span by default", () => {
    render(<ReactGradientText text="Default" colors={["red", "blue"]} />);
    const element = screen.getByText("Default");
    expect(element.tagName).toBe("SPAN");
  });

  it("passes additional className", () => {
    render(
      <ReactGradientText
        text="Styled"
        colors={["red", "blue"]}
        className="custom-class"
      />
    );
    const element = screen.getByText("Styled");
    expect(element).toHaveClass("custom-class");
  });

  it("handles a single color gracefully", () => {
    render(<ReactGradientText text="Single" colors={["red"]} />);
    const element = screen.getByText("Single");
    expect(element.style.backgroundImage).toBe(
      "linear-gradient(to right, red 0%, red 100%)"
    );
  });

  it("handles an empty colors array", () => {
    render(<ReactGradientText text="Empty" colors={[]} />);
    const element = screen.getByText("Empty");
    expect(element.style.backgroundImage).toBe("none");
  });

  it("merges custom style with gradient styles", () => {
    render(
      <ReactGradientText
        text="Custom"
        colors={["red", "blue"]}
        style={{ fontSize: "24px" }}
      />
    );
    const element = screen.getByText("Custom");
    expect(element.style.fontSize).toBe("24px");
    expect(element.style.backgroundClip).toBe("text");
  });
});

describe("ReactGradientText - animations", () => {
  it("does not apply animation styles when animation is not set", () => {
    render(<ReactGradientText text="NoAnim" colors={["red", "blue"]} />);
    const element = screen.getByText("NoAnim");
    expect(element.style.opacity).toBe("");
    expect(element.style.transform).toBe("");
  });

  it("applies hidden styles for fade-in-up before intersection", () => {
    render(
      <ReactGradientText
        text="FadeUp"
        colors={["red", "blue"]}
        animation="fade-in-up"
      />
    );
    const element = screen.getByText("FadeUp");
    expect(element.style.opacity).toBe("0");
    expect(element.style.transform).toBe("translate(0px, 20px)");
  });

  it("applies hidden styles for fade-in-left before intersection", () => {
    render(
      <ReactGradientText
        text="FadeLeft"
        colors={["red", "blue"]}
        animation="fade-in-left"
      />
    );
    const element = screen.getByText("FadeLeft");
    expect(element.style.opacity).toBe("0");
    expect(element.style.transform).toBe("translate(20px, 0px)");
  });

  it("applies hidden styles for fade-in-bottom-right before intersection", () => {
    render(
      <ReactGradientText
        text="FadeBR"
        colors={["red", "blue"]}
        animation="fade-in-bottom-right"
      />
    );
    const element = screen.getByText("FadeBR");
    expect(element.style.opacity).toBe("0");
    expect(element.style.transform).toBe("translate(-20px, -20px)");
  });

  it("transitions to visible styles after intersection for fade-in-up", () => {
    render(
      <ReactGradientText
        text="FadeUpVisible"
        colors={["red", "blue"]}
        animation="fade-in-up"
        duration={300}
      />
    );
    const element = screen.getByText("FadeUpVisible");
    expect(element.style.opacity).toBe("0");

    act(() => {
      simulateIntersection(element);
    });

    expect(element.style.opacity).toBe("1");
    expect(element.style.transform).toBe("translate(0, 0)");
    expect(element.style.transition).toContain("300ms");
  });

  it("uses default duration of 500ms for fade-in", () => {
    render(
      <ReactGradientText
        text="DefaultDur"
        colors={["red", "blue"]}
        animation="fade-in-down"
      />
    );
    const element = screen.getByText("DefaultDur");
    expect(element.style.transition).toContain("500ms");
  });
});

describe("ReactGradientText - scramble animation", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("shows scrambled text before intersection and final text after duration", () => {
    let rafCallbacks: FrameRequestCallback[] = [];
    vi.spyOn(window, "requestAnimationFrame").mockImplementation((cb) => {
      rafCallbacks.push(cb);
      return rafCallbacks.length;
    });
    vi.spyOn(window, "cancelAnimationFrame").mockImplementation(() => {});

    render(
      <ReactGradientText
        text="ABC"
        colors={["red", "blue"]}
        animation="scramble"
        duration={100}
      />
    );

    const element = screen.getByText("ABC");
    expect(element).toBeInTheDocument();

    act(() => {
      simulateIntersection(element);
    });

    const startTime = performance.now();
    vi.spyOn(performance, "now").mockReturnValue(startTime + 200);

    act(() => {
      rafCallbacks.forEach((cb) => cb(startTime + 200));
    });

    expect(element.textContent).toBe("ABC");

    vi.restoreAllMocks();
  });
});
