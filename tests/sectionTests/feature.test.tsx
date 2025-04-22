import { render, screen } from "@testing-library/react";
import Featured from "@components/Navbar/elements/Featured";
import { FeaturedData } from "@components/Navbar/types/NavbarData";
import React from "react";

const mockFeaturedData: FeaturedData[] = [
  {
    blogUrl: "/blog/post-1",
    imgUrl: "/images/blog1.jpg",
    title: "How to Build a UI",
    subTitle: "A quick dive into React components",
  },
  {
    blogUrl: "/blog/post-2",
    imgUrl: "/images/blog2.jpg",
    title: "Testing Made Simple",
    subTitle: "Understanding unit vs integration testing",
  },
];

describe("Featured Component", () => {
  it("renders section title", () => {
    render(<Featured data={mockFeaturedData} />);
    expect(screen.getByText("Featured")).toBeInTheDocument();
  });

  it("renders all blog items", () => {
    render(<Featured data={mockFeaturedData} />);
    expect(screen.getByText("How to Build a UI")).toBeInTheDocument();
    expect(screen.getByText("Testing Made Simple")).toBeInTheDocument();
  });

  it("renders blog subtitles", () => {
    render(<Featured data={mockFeaturedData} />);
    expect(screen.getByText("A quick dive into React components")).toBeInTheDocument();
    expect(screen.getByText("Understanding unit vs integration testing")).toBeInTheDocument();
  });

  it("renders blog images", () => {
    render(<Featured data={mockFeaturedData} />);
    const images = screen.getAllByAltText("blog");
    expect(images.length).toBe(2);
  });

  it("renders 'See all articles' link", () => {
    render(<Featured data={mockFeaturedData} />);
    const link = screen.getByText("See all articles");
    expect(link).toBeInTheDocument();
    expect(link.closest("a")).toHaveAttribute("href", "/");
  });
});