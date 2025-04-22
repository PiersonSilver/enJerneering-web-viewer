import React from "react";
import { render, screen } from "@testing-library/react";
import CallToAction from "@components/CallToAction";
import { CallToActionData } from "@components/CallToAction/types/CallToActionData";
import { ButtonSettingsData } from "@components/types";
import { ProjectProvider } from "@providers/ProjectContext";

describe("CallToAction Component", () => {
  const mockButtons: ButtonSettingsData[] = [];

  const mockData: CallToActionData = {
    title: "Test Title",
    subtitle: "Test Subtitle",
    tagLine: "Test Tagline",
    buttons: mockButtons,
    imgUrl: "/test-image.jpg",
    background: "image",
    backgroundColor: "#000000",
    textColor: "#ffffff",
    isTagline: "on",
  };

  const renderWithProjectProvider = (component: React.ReactNode) => {
    return render(
      <ProjectProvider projectId="test-project-id"> {/* Pass a projectId */}
        {component}
      </ProjectProvider>
    );
  };

  test("renders CallToActionType1 correctly", () => {
    renderWithProjectProvider(<CallToAction type={1} data={mockData} />);
    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test Subtitle")).toBeInTheDocument();
    expect(screen.getByText("Test Tagline")).toBeInTheDocument();
  });

  test("renders CallToActionType2 correctly", () => {
    renderWithProjectProvider(<CallToAction type={2} data={mockData} />);
    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test Subtitle")).toBeInTheDocument();
    expect(screen.getByText("Test Tagline")).toBeInTheDocument();
  });

  test("renders CallToActionType3 correctly", () => {
    renderWithProjectProvider(<CallToAction type={3} data={mockData} />);
    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test Subtitle")).toBeInTheDocument();
    expect(screen.getByText("Test Tagline")).toBeInTheDocument();
  });

  test("throws an error for an unsupported type", () => {
    expect(() => renderWithProjectProvider(<CallToAction type={99} data={mockData} />)).toThrow(
      "CallToAction type 99 is not supported"
    );
  });
});