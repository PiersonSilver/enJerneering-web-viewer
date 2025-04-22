export {};

import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import MainContentType1 from "@components/MainContent/_MainContentType1";
import MainContentType2 from "@components/MainContent/_MainContentType2";
import MainContentType3 from "@components/MainContent/_MainContentType3";
import { MainContentData } from "@components/MainContent/types/MainContentData";
import React from "react";

const mockData1: MainContentData = {
  title: "Test Title 1",
  subtitle: "Test Subtitle 1",
  tagLine: "Test Tagline",
  imgUrl: "/test-image.jpg",
  subHeading: [
    { title: "Subheading 1", subtitle: "Subsubtitle 1" },
    { title: "Subheading 2", subtitle: "Subsubtitle 2" },
  ],
  gallery: [],
  backgroundColor: "#ffffff",
  textColor: "#000000",
  isTagline: "on",
};

const mockData2: MainContentData = {
  title: "Gallery Title",
  subtitle: "Gallery Subtitle",
  gallery: [
    "/img1.jpg", "/img2.jpg", "/img3.jpg",
    "/img4.jpg", "/img5.jpg", "/img6.jpg"
  ],
  isTagline: "off", 
};


describe("MainContent Components", () => {
  it("renders MainContentType1 correctly", () => {
    render(<MainContentType1 data={mockData1} />);
    expect(screen.getByText("Test Title 1")).toBeInTheDocument();
    expect(screen.getByText("Test Subtitle 1")).toBeInTheDocument();
    expect(screen.getByText("Test Tagline")).toBeInTheDocument();
    expect(screen.getByText("Subheading 1")).toBeInTheDocument();
    expect(screen.getByText("Subheading 2")).toBeInTheDocument();
  });

  it("renders MainContentType2 correctly", () => {
    render(<MainContentType2 data={mockData2} />);
    expect(screen.getByText("Gallery Title")).toBeInTheDocument();
    expect(screen.getByText("Gallery Subtitle")).toBeInTheDocument();
    expect(screen.getAllByRole("img")).toHaveLength(6);
  });

});
