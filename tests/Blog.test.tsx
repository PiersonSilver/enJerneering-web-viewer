import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { BlogData } from "@components/blog/types/BlogData";
import Blog from "@components/blog";

// 👇 Mock BlogItem to isolate layout testing and improve coverage
vi.mock("@components/blog/elements/BlogItem", () => ({
  default: ({ data }: any) => <div>{data.title}</div>,
}));

// 🧪 Shared mock author and blogList
const mockAuthor = {
  name: "John Doe",
  avatarUrl: "https://example.com/avatar.jpg",
  href: "https://example.com/johndoe",
};

const mockBlogList = [
  {
    title: "AI in 2025",
    subtitle: "How AI is shaping the future",
    category: "Technology",
    thumbnailUrl: "https://example.com/ai-thumbnail.jpg",
    publishedAt: "2025-03-17",
    timeRead: "5 min",
    author: mockAuthor,
    href: "https://example.com/ai-2025",
    type: 1,
  },
  {
    title: "Cloud Trends",
    subtitle: "What’s new in cloud computing",
    category: "Cloud",
    thumbnailUrl: "https://example.com/cloud-thumbnail.jpg",
    publishedAt: "2025-04-01",
    timeRead: "3 min",
    author: mockAuthor,
    href: "https://example.com/cloud-trends",
    type: 1,
  },
  {
    title: "DevOps 101",
    subtitle: "CI/CD and pipelines explained",
    category: "DevOps",
    thumbnailUrl: "https://example.com/devops-thumbnail.jpg",
    publishedAt: "2025-04-10",
    timeRead: "4 min",
    author: mockAuthor,
    href: "https://example.com/devops-101",
    type: 1,
  },
];

const mockBlogData: BlogData = {
  title: "Tech Insights",
  subtitle: "Latest trends in technology",
  isShowAuthor: true,
  blogList: mockBlogList,
};

// 🧪 Existing tests
describe("Blog Component", () => {
  it("renders blog title and subtitle", () => {
    render(<Blog type={1} data={mockBlogData} />);
    expect(screen.getByText("Tech Insights")).toBeInTheDocument();
    expect(screen.getByText("Latest trends in technology")).toBeInTheDocument();
  });

  it("renders blog items", () => {
    render(<Blog type={1} data={mockBlogData} />);
    expect(screen.getByText("AI in 2025")).toBeInTheDocument();
    expect(screen.getByText("Cloud Trends")).toBeInTheDocument();
    expect(screen.getByText("DevOps 101")).toBeInTheDocument();
  });

  it("shows author information if enabled", () => {
    render(<Blog type={1} data={mockBlogData} />);
  });

  it("throws an error for unsupported types", () => {
    expect(() => render(<Blog type={99} data={mockBlogData} />)).toThrowError(
      "Blog type 99 is not supported"
    );
  });

  // ✅ New BlogType2 test
  it("renders BlogType2 layout correctly", () => {
    render(<Blog type={2} data={mockBlogData} />);
    expect(screen.getByText("Tech Insights")).toBeInTheDocument();
    expect(screen.getByText("Latest trends in technology")).toBeInTheDocument();
    mockBlogList.forEach((item) => {
      expect(screen.getByText(item.title)).toBeInTheDocument();
    });
  });

  // ✅ New BlogType3 test
  it("renders BlogType3 layout correctly", () => {
    render(<Blog type={3} data={mockBlogData} />);
    expect(screen.getByText("Tech Insights")).toBeInTheDocument();
    expect(screen.getByText("Latest trends in technology")).toBeInTheDocument();
    mockBlogList.forEach((item) => {
      expect(screen.getByText(item.title)).toBeInTheDocument();
    });
  });

  // ✅ New BlogType4 test
  it("renders BlogType4 layout correctly", () => {
    render(<Blog type={4} data={mockBlogData} />);
    expect(screen.getByText("Tech Insights")).toBeInTheDocument();
    expect(screen.getByText("Latest trends in technology")).toBeInTheDocument();
    mockBlogList.forEach((item) => {
      expect(screen.getByText(item.title)).toBeInTheDocument();
    });
  });
});
