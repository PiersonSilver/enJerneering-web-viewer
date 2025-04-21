import React from "react";
import { render, screen } from "@testing-library/react";
import Footer from "@components/Footer";
import { FooterData } from "@components/Footer/types/FooterData";
import { ProjectProvider } from "@providers/ProjectContext";

// Mock footer data
const mockFooterData: FooterData = {
  slogan: "Your trusted partner in innovation.",
  copyRight: "© 2025 Example Inc. All rights reserved.",
  socials: [
    { id: "twitter", name: "Twitter", icon: "/icons/twitter.png", url: "https://twitter.com/example" },
    { id: "github", name: "GitHub", icon: "/icons/github.png", url: "https://github.com/example" },
  ],
  navigation: [
    { title: "Home", href: "/" },
    { title: "About", href: "/about" },
  ],
  polices: [
    { title: "Privacy Policy", url: "/privacy" },
    { title: "Terms of Service", url: "/terms" },
  ],
  showContentFlags: {
    slogan: "on",
    socials: "on",
    copyRight: "on",
  },
  logo: "/logo.png",
};

describe("Footer Component", () => {
 
  test("renders FooterType1 correctly", () => {
    render(
      <ProjectProvider projectId="test-project-id">
        <Footer type={1} data={mockFooterData} />
      </ProjectProvider>
    );
  
    // Check for the correct slogan
    expect(screen.getByText("Your trusted partner in innovation.")).toBeInTheDocument();
    expect(screen.getByText("Home")).toBeInTheDocument();
  });
  

  test("renders FooterType2 correctly", () => {
    render(
      <ProjectProvider projectId="test-project-id"> {/* Added projectId prop */}
        <Footer type={2} data={mockFooterData} />
      </ProjectProvider>
    );
    expect(screen.getByText("We build great websites.")).toBeInTheDocument();
    expect(screen.getByText("Contact")).toBeInTheDocument();
  });

  test("renders FooterType3 correctly", () => {
    render(
      <ProjectProvider projectId="test-project-id"> {/* Added projectId prop */}
        <Footer type={3} data={mockFooterData} />
      </ProjectProvider>
    );
    expect(screen.getByText("Test Company")).toBeInTheDocument();
    expect(screen.getByText("About")).toBeInTheDocument();
  });

  test("renders FooterType4 correctly", () => {
    render(<Footer type={4} data={mockFooterData} />);
    expect(screen.getByText("© 2024 Test Company")).toBeInTheDocument();
  });
});
