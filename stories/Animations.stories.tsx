import type { Meta, StoryObj } from "@storybook/react";
import { ReactGradientText } from "../src";

const meta: Meta<typeof ReactGradientText> = {
  title: "Components/ReactGradientText/Animations",
  component: ReactGradientText,
  argTypes: {
    animation: {
      control: "select",
      options: [
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

export const FadeInUp: Story = {
  args: {
    text: "Fade In Up",
    colors: ["#667eea", "#764ba2"],
    animation: "fade-in-up",
    duration: 800,
  },
};

export const FadeInDown: Story = {
  args: {
    text: "Fade In Down",
    colors: ["#f093fb", "#f5576c"],
    animation: "fade-in-down",
    duration: 800,
  },
};

export const FadeInLeft: Story = {
  args: {
    text: "Fade In Left",
    colors: ["#ff6b6b", "#4ecdc4"],
    animation: "fade-in-left",
    duration: 800,
  },
};

export const FadeInRight: Story = {
  args: {
    text: "Fade In Right",
    colors: ["#a8edea", "#fed6e3"],
    animation: "fade-in-right",
    duration: 800,
  },
};

export const FadeInTopLeft: Story = {
  args: {
    text: "Fade In Top Left",
    colors: ["#ffecd2", "#fcb69f"],
    animation: "fade-in-top-left",
    duration: 800,
  },
};

export const FadeInTopRight: Story = {
  args: {
    text: "Fade In Top Right",
    colors: ["#a1c4fd", "#c2e9fb"],
    animation: "fade-in-top-right",
    duration: 800,
  },
};

export const FadeInBottomLeft: Story = {
  args: {
    text: "Fade In Bottom Left",
    colors: ["#d4fc79", "#96e6a1"],
    animation: "fade-in-bottom-left",
    duration: 800,
  },
};

export const FadeInBottomRight: Story = {
  args: {
    text: "Fade In Bottom Right",
    colors: ["#f6d365", "#fda085"],
    animation: "fade-in-bottom-right",
    duration: 800,
  },
};

export const Scramble: Story = {
  args: {
    text: "Scramble Animation Effect",
    colors: ["#ff6b6b", "#4ecdc4", "#45b7d1"],
    animation: "scramble",
    duration: 1000,
  },
};
