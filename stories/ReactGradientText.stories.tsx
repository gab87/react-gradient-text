import type { Meta, StoryObj } from "@storybook/react";
import { ReactGradientText } from "../src";

const meta: Meta<typeof ReactGradientText> = {
  title: "Components/ReactGradientText",
  component: ReactGradientText,
  argTypes: {
    direction: {
      control: "text",
      description: "CSS gradient direction",
    },
    as: {
      control: "text",
      description: "HTML element to render",
    },
    animation: {
      control: "select",
      options: [
        undefined,
        "fade-in-up",
        "fade-in-down",
        "fade-in-left",
        "fade-in-right",
        "fade-in-top-left",
        "fade-in-top-right",
        "fade-in-bottom-left",
        "fade-in-bottom-right",
        "scramble",
      ],
      description: "Animation triggered on viewport intersection",
    },
    duration: {
      control: "number",
      description: "Animation duration in milliseconds",
    },
  },
};

export default meta;
type Story = StoryObj<typeof ReactGradientText>;

export const Default: Story = {
  args: {
    text: "Hello Gradient World!",
    colors: ["#ff0000", "#00ff00", "#0000ff"],
  },
};

export const TwoColors: Story = {
  args: {
    text: "Two Color Gradient",
    colors: ["#ff6b6b", "#4ecdc4"],
  },
};

export const DiagonalDirection: Story = {
  args: {
    text: "Diagonal Gradient",
    colors: ["#667eea", "#764ba2"],
    direction: "45deg",
  },
};

export const RainbowGradient: Story = {
  args: {
    text: "Rainbow Text Effect",
    colors: ["#ff0000", "#ff7f00", "#ffff00", "#00ff00", "#0000ff", "#4b0082", "#9400d3"],
    direction: "to right",
  },
};

export const AsHeading: Story = {
  args: {
    text: "I am a heading",
    colors: ["#f093fb", "#f5576c"],
    as: "h1",
  },
};

export const VerticalDirection: Story = {
  args: {
    text: "Vertical Gradient",
    colors: ["#a8edea", "#fed6e3"],
    direction: "to bottom",
  },
};

