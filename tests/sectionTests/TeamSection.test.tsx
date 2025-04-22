import React from "react";
import { render, screen } from "@testing-library/react";
import TeamSection from "@components/TeamSection";
import { TeamSectionData } from "@components/TeamSection/types/TeamSectionData";

describe("TeamSection Component", () => {
  const mockData: TeamSectionData = {
    description: "We are the dream team!",
    people: [
      {
        name: "Alice",
        role: "Developer",
        imageUrl: "/images/alice.jpg",
        bio: "Frontend wizard",
        socials: [
          { name: "GitHub", icon: "pi-github", url: "https://github.com/alice" },
          { name: "LinkedIn", icon: "pi-linkedin", url: "https://linkedin.com/in/alice" },
        ],
      },
    ],
  };

  test("renders TeamSectionType1 correctly", () => {
    render(<TeamSection type={1} data={mockData} />);
    expect(screen.getByText("Meet our team")).toBeInTheDocument();
    expect(screen.getByText("We are the dream team!")).toBeInTheDocument();
    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("Developer")).toBeInTheDocument();
    expect(screen.getByText("Frontend wizard")).toBeInTheDocument();
  });

  test("renders TeamSectionType2 correctly", () => {
    render(<TeamSection type={2} data={mockData} />);
    expect(screen.getByText("Meet our team")).toBeInTheDocument();
    expect(screen.getByText("We are the dream team!")).toBeInTheDocument();
  });

  test("renders TeamSectionType3 correctly", () => {
    render(<TeamSection type={3} data={mockData} />);
    expect(screen.getByText("Meet our team")).toBeInTheDocument();
    expect(screen.getByText("We are the dream team!")).toBeInTheDocument();
  });

  test("throws an error for unsupported type", () => {
    expect(() => render(<TeamSection type={99} data={mockData} />)).toThrow(
      "TeamSection type 99 is not supported"
    );
  });
});