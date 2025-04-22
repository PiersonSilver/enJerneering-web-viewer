import Button from "@components/Button";
import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";

describe("Button Component", () => {
  it("triggers onClick event when clicked", () => {
    let clicked = false;
    const handleClick = () => {
      clicked = true;
    };

    render(<Button label="Click me" onClick={handleClick} />);
    fireEvent.click(screen.getByText("Click me"));

    expect(clicked).toBe(true); // Check if the function was triggered
  });
});
