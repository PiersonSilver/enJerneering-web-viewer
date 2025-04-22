import React from "react";
import { render, screen } from "@testing-library/react";
import Header from "@components/Header";
import HeaderType1 from "@components/Header/_HeaderType1";
import HeaderType2 from "@components/Header/_HeaderType2";
import HeaderType3 from "@components/Header/_HeaderType3";
import { HeaderData } from "@components/Header/types/HeaderData";
import { ProjectProvider } from "@providers/ProjectContext";


const mockData: HeaderData = {
  title: "Test Title",
  subtitle: "Test Subtitle",
  buttons: [],
  imgUrl: "/test-image.jpg",
  background: "image",
  backgroundColor: "#ffffff",
  textColor: "#000000",
};


describe("Header Component", () => {
  // Helper function to wrap components in ProjectProvider
  const renderWithProvider = (ui: React.ReactElement) => {
    return render(
      <ProjectProvider projectId="mockProjectId">{ui}</ProjectProvider>
    );
  };

  it("renders HeaderType1 correctly", () => {
    renderWithProvider(<HeaderType1 data={mockData} />);
    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test Subtitle")).toBeInTheDocument();
  });

  it("renders HeaderType2 correctly", () => {
    renderWithProvider(<HeaderType2 data={mockData} />);
    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test Subtitle")).toBeInTheDocument();
  });

  it("renders HeaderType3 correctly", () => {
    renderWithProvider(<HeaderType3 data={mockData} />);
    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test Subtitle")).toBeInTheDocument();
  });

  it("renders the correct header type based on props", () => {
    renderWithProvider(<Header type={1} data={mockData} />);
    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test Subtitle")).toBeInTheDocument();
  });

  it("throws an error for unsupported header types", () => {
    expect(() =>
      renderWithProvider(<Header type={99} data={mockData} />)
    ).toThrow();
  });
});
