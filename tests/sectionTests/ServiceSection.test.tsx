import { render, screen } from "@testing-library/react";
import ServicesSection from "@components/ServicesSection";
import { ServicesSectionData } from "@components/ServicesSection/types/ServicesSectionData";
import React from "react";

const mockData: ServicesSectionData = {
  title: "Our Services",
  subtitle: "We offer the best services in the industry.",
  tagLine: "What We Do",
  hrefLearnMore: "/learn-more",
  subHeading: [
    { title: "Service 1", subtitle: "Description of service 1." },
    { title: "Service 2", subtitle: "Description of service 2." },
  ],
};

describe("ServicesSection Component", () => {
  it("renders ServicesSectionType1 correctly", () => {
    render(<ServicesSection type={1} data={mockData} />);
    expect(screen.getByText("What We Do")).toBeInTheDocument();
    expect(screen.getByText("Our Services")).toBeInTheDocument();
  });

  it("renders ServicesSectionType2 correctly", () => {
    render(<ServicesSection type={2} data={mockData} />);
    expect(screen.getByText("What We Do")).toBeInTheDocument();
    expect(screen.getByText("Learn more")).toBeInTheDocument();
  });

  it("renders ServicesSectionType3 correctly", () => {
    render(<ServicesSection type={3} data={mockData} />);
    expect(screen.getByText("What We Do")).toBeInTheDocument();
    expect(screen.getByText("Our Services")).toBeInTheDocument();
  });

  it("throws an error for unsupported types", () => {
    expect(() => render(<ServicesSection type={99} data={mockData} />)).toThrow();
  });
});
