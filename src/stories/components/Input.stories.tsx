import type { Meta, StoryObj } from "@storybook/react";

import { InputText as InputTextComp } from "@internalComponents/Input";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Components/InputText",
  component: InputTextComp,
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
      options: ["primary", "secondary"],
    },
    size: {
      control: "radio",
      options: ["sm", "md", "lg"],
    },
  },
} satisfies Meta<typeof InputTextComp>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const InputText: Story = {
  args: {
    placeholder: "Input text",
    size: "md",
    variant: "primary",
    disabled: false,
    isSuccess: false,
    isError: false,
  },
};

export const InputTextWithIcon: Story = {
  args: {
    placeholder: "Input text",
    size: "md",
    variant: "primary",
    disabled: false,
    isSuccess: false,
    isError: false,
  },
  decorators: [
    (Story) => (
      <label className="input-icon-left input-icon-right">
        <i className="pi pi-search" />
        <Story />
        {/* <i className="pi pi-search" /> */}
      </label>
    ),
  ],
};
