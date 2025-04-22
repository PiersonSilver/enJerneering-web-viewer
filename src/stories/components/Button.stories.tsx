import type { Meta, StoryObj } from "@storybook/react";

import { Button as ButtonComp } from "@internalComponents/Button";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Components/Button",
  component: ButtonComp,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    variant: {
      control: "radio",
      options: ["primary", "secondary", "dark", "outline", "soft"],
    },
    size: {
      control: "radio",
      options: ["xs", "sm", "md", "lg", "xl"],
    },
    iconPos: {
      control: "radio",
      options: ["left", "top", "bottom", "right"],
    },
    loading: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof ButtonComp>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Button: Story = {
  args: {
    label: "Button",
    variant: "primary",
    size: "md",
    icon: "pi pi-plus",
    iconPos: "left",
    loading: false,
  },
};

export const IconButton: Story = {
  args: {
    variant: "secondary",
    icon: "pi pi-plus",
  },
};
