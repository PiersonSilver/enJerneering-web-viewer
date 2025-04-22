import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Blog from "@components/blog";
import { BlogData, BlogItem } from "@components/blog/types/BlogData";
import BlogItemType1 from "@components/blog/elements/BlogItem/_BlogItemType1";
import BlogItemType2 from "@components/blog/elements/BlogItem/_BlogItemType2";

const mockAuthor = {
  name: "John Doe",
  avatarUrl: "https://example.com/avatar.jpg",
  href: "https://example.com/johndoe",
};

const mockBlogItem: BlogItem = {
  title: "AI in 2025",
  subtitle: "How AI is shaping the future",
  category: "Technology",
  thumbnailUrl: "https://example.com/ai-thumbnail.jpg",
  publishedAt: "2025-03-17",
  timeRead: "5 min",
  author: mockAuthor,
  href: "https://example.com/ai-2025",
  type: 1,
};

const mockBlogData: BlogData = {
  title: "Tech Insights",
  subtitle: "Latest trends in technology",
  isShowAuthor: true,
  blogList: [mockBlogItem],
};

describe("Blog Component", () => {
  it("renders blog title and subtitle", () => {
    render(<Blog type={1} data={mockBlogData} />);
    expect(screen.getByText("Tech Insights")).toBeInTheDocument();
    expect(screen.getByText("Latest trends in technology")).toBeInTheDocument();
  });

  it("renders blog items", () => {
    render(<Blog type={1} data={mockBlogData} />);
    expect(screen.getByText("AI in 2025")).toBeInTheDocument();
    expect(screen.getByText("How AI is shaping the future")).toBeInTheDocument();
  });

  it("shows author information if enabled", () => {
    render(<Blog type={1} data={mockBlogData} />);
    // Match author name by function since it may be split across elements
    expect(screen.getByText((content) => content.includes("John Doe"))).toBeInTheDocument();
  });

  it("throws an error for unsupported types", () => {
    expect(() => render(<Blog type={99} data={mockBlogData} />)).toThrowError(
      "Blog type 99 is not supported"
    );
  });
  it("renders BlogType2 correctly", () => {
    render(<Blog type={2} data={mockBlogData} />);
    expect(screen.getByText("Tech Insights")).toBeInTheDocument();
    expect(screen.getByText("AI in 2025")).toBeInTheDocument();
  });
  
  it("renders BlogType3 correctly", () => {
    render(<Blog type={3} data={mockBlogData} />);
    expect(screen.getByText("Tech Insights")).toBeInTheDocument();
    expect(screen.getByText("AI in 2025")).toBeInTheDocument();
  });
  
  it("renders BlogType4 correctly", () => {
    render(<Blog type={4} data={mockBlogData} />);
    expect(screen.getByText("Tech Insights")).toBeInTheDocument();
    expect(screen.getByText("AI in 2025")).toBeInTheDocument();
  });
  
});

describe("BlogItemType1", () => {
  it("renders title, subtitle, category, and author name", () => {
    render(<BlogItemType1 data={mockBlogItem} viewOptions={{ isShowAuthor: true, direction: "row" }} />);
    expect(screen.getByText("AI in 2025")).toBeInTheDocument();
    expect(screen.getByText("How AI is shaping the future")).toBeInTheDocument();
    expect(screen.getByText("Technology")).toBeInTheDocument();
    expect(screen.getByText((content) => content.includes("John Doe"))).toBeInTheDocument();
  });
});

describe("BlogItemType2", () => {
  it("renders title, subtitle, category, and author name", () => {
    render(<BlogItemType2 data={mockBlogItem} />);
    expect(screen.getByText("AI in 2025")).toBeInTheDocument();
    expect(screen.getByText("How AI is shaping the future")).toBeInTheDocument();
    expect(screen.getByText("Technology")).toBeInTheDocument();
    expect(screen.getByText((content) => content.includes("John Doe"))).toBeInTheDocument();
  });
});
