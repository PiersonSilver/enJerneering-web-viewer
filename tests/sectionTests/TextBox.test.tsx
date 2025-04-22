import React from "react";
import { render, screen } from "@testing-library/react";
import { TextBoxData } from "@components/TextBox/types/TextBoxData";
import TextBox from "@components/TextBox";

describe("TextBox Component", () => {
  const mockData: TextBoxData = {
    content: "Hello, World!",
    textColor: "red",
    fontSize: "20px",
    isBold: true,
  };

  it("renders TextBox with the correct content", () => {
    render(<TextBox type={1} data={mockData} />);
    const textElement = screen.getByText("Hello, World!");
    if (!textElement) {
      throw new Error("TextBox content is not rendered correctly.");
    }
  });

  it("applies the correct styles", () => {
    render(<TextBox type={1} data={mockData} />);
    const textElement = screen.getByText("Hello, World!");

    if (textElement.style.color !== "red") {
      throw new Error(`Expected text color to be red, but got ${textElement.style.color}`);
    }
    if (textElement.style.fontSize !== "20px") {
      throw new Error(`Expected font size to be 20px, but got ${textElement.style.fontSize}`);
    }
    if (textElement.style.fontWeight !== "bold") {
      throw new Error(`Expected font weight to be bold, but got ${textElement.style.fontWeight}`);
    }
  });

  it("throws an error for unsupported types", () => {
    try {
      render(<TextBox type={99} data={mockData} />);
      throw new Error("Expected an error, but none was thrown.");
    } catch (error: any) {
      if (!error.message.includes("Footer type 99 is not supported")) {
        throw new Error(`Unexpected error message: ${error.message}`);
      }
    }
  });
});
