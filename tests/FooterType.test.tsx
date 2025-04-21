import React from "react";
import Footer from "@components/Footer";
import { FooterData } from "@components/Footer/types/FooterData";
import { render, screen } from "@testing-library/react";
import { ProjectProvider } from "@providers/ProjectContext"; // import the provider

describe("Footer Component", () => {
  const mockFooterData: FooterData = {
    logo: "/logo.png",
    slogan: "Test slogan",
    socials: [
      {
        name: "Facebook",
        url: "https://facebook.com",
        icon: "pi-facebook",
        id: "",
      },
    ],
    navigation: [{ title: "Home", href: "/home" }],
    polices: [{ title: "Privacy Policy", url: "/privacy" }],
    copyRight: "© 2024 Test Company",
    showContentFlags: { slogan: "on", socials: "on", copyRight: "on" },
  };

  const renderWithProviders = (ui: React.ReactElement) => {
    return render(
      <ProjectProvider projectId="mock-project-id">
        {ui}
      </ProjectProvider>
    );
  };
  

  test("renders FooterType1 correctly", () => {
    renderWithProviders(<Footer type={1} data={mockFooterData} />);
    expect(screen.getByText("Test slogan")).toBeInTheDocument();
    expect(screen.getByText("Home")).toBeInTheDocument();
  });

  test("renders FooterType2 correctly", () => {
    render(<Footer type={2} data={mockFooterData} />);
    expect(screen.getByText("Test slogan")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("you@example.com")).toBeInTheDocument();
  });

  test("renders FooterType3 correctly", () => {
    render(<Footer type={3} data={mockFooterData} />);
    expect(screen.getByText("Privacy Policy")).toBeInTheDocument();
  });

  test("renders FooterType4 correctly", () => {
    render(<Footer type={4} data={mockFooterData} />);
    expect(
      screen.getByText("© 2024 My Simple Page. All rights reserved.")
    ).toBeInTheDocument();
  });

  test("throws error for unsupported footer type", () => {
    expect(() => render(<Footer type={5} data={mockFooterData} />)).toThrow(
      "Footer type 5 is not supported"
    );
  });
});
