import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Contact from "@components/Contact";
import FormContact from "@components/Contact/elements/FormContact";
import { ContactData } from "@components/Contact/types/ContactData";
import { describe, it, expect, vi } from "vitest";

describe("Contact Component", () => {
  const mockData: ContactData = {
    title: "Contact Us",
    subtitle: "We would love to hear from you!",
    phone: "+123456789",
    mail: "hello@example.com",
    address: "123 Main St, City, Country",
    imgUrl: "/test.jpg",
    contactPhone: true,
    contactEmail: true,
    contactAddress: true,
    nameField: true,
    emailField: true,
    phoneField: true,
    messageField: true,
    textColor: "#000000",
    mapSrc: "https://maps.example.com",
    addressLabel: "Main Office",
    mailLabel: "Support",
    phoneLabel: "Call Us",
  };

  it("renders ContactType1 correctly", () => {
    render(<Contact type={1} data={mockData} />);
    expect(screen.getByText("Contact Us")).toBeInTheDocument();
    expect(screen.getByText("We would love to hear from you!")).toBeInTheDocument();
    expect(screen.getByText("+123456789")).toBeInTheDocument();
    expect(screen.getByText("hello@example.com")).toBeInTheDocument();
    expect(screen.getByText("123 Main St, City, Country")).toBeInTheDocument();
  });

  it("renders ContactType2 correctly", () => {
    render(<Contact type={2} data={mockData} />);
    expect(screen.getByText("Contact Us")).toBeInTheDocument();
    expect(screen.getByText("We would love to hear from you!")).toBeInTheDocument();
  });

  it("renders ContactType3 correctly", () => {
    render(<Contact type={3} data={mockData} />);
    expect(screen.getByText("Contact Us")).toBeInTheDocument();
    expect(screen.getByText("We would love to hear from you!")).toBeInTheDocument();
    expect(screen.getByText("+123456789")).toBeInTheDocument();
    expect(screen.getByText("hello@example.com")).toBeInTheDocument();
    expect(screen.getByText("123 Main St, City, Country")).toBeInTheDocument();
  });

  it("renders ContactType4 correctly", () => {
    render(<Contact type={4} data={mockData} />);
    expect(screen.getByText("Contact Us")).toBeInTheDocument();
    expect(screen.getByText("We would love to hear from you!")).toBeInTheDocument();
  });

  it("renders ContactType5 correctly", () => {
    render(<Contact type={5} data={mockData} />);
    expect(screen.getByText("Contact Us")).toBeInTheDocument();
    expect(screen.getByText("We would love to hear from you!")).toBeInTheDocument();
    expect(screen.getByText("+123456789")).toBeInTheDocument();
    expect(screen.getByText("hello@example.com")).toBeInTheDocument();
    expect(screen.getByText("123 Main St, City, Country")).toBeInTheDocument();
  });
  

  it("throws an error for unsupported type", () => {
    expect(() => render(<Contact type={99} data={mockData} />)).toThrow(
      "Contact type 99 is not supported"
    );
  });

  it("renders FormContact and triggers mailto link", () => {
    global.open = vi.fn(); // Mock window.open

    render(
      <FormContact
        requiredFields={{
          nameField: true,
          emailField: true,
          phoneField: true,
          messageField: true,
          mail: "test@example.com",
        }}
      />
    );

    fireEvent.change(screen.getByLabelText("Name"), { target: { value: "John Doe" } });
    fireEvent.change(screen.getByLabelText("Email"), { target: { value: "john@example.com" } });
    fireEvent.change(screen.getByLabelText("Phone"), { target: { value: "1234567890" } });
    fireEvent.change(screen.getByLabelText("Message"), { target: { value: "Hello world" } });

    fireEvent.click(screen.getByText("Send Message"));

    expect(global.open).toHaveBeenCalled();
  });
});