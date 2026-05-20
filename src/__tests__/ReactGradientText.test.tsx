/// <reference types="@testing-library/jest-dom/vitest" />
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ReactGradientText } from "../ReactGradientText";

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
