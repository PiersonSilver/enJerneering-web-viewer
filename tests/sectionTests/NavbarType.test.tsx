import { render, screen } from "@testing-library/react";
import Navbar from "@components/Navbar";
import { ProjectProvider } from "@providers/ProjectContext"; // Import the provider
import React from "react";
import { NavbarData } from "@components/Navbar/types/NavbarData";

const mockNavbarData: NavbarData = {
    logo: "/logo.png",
    justifyContent: "start",
    isCtaButton: "on", // Assuming the flag is set to 'on'
    showContentFlags: {
        ctaButton: "on",
    },
    menuList: [
        {
            id: "1",
            title: "Home",
            href: "/",
        },
        {
            id: "2",
            title: "Products",
            href: "/products",
            subLinks: [
                {
                    title: "Product A",
                    href: "/products/a",
                    icon: "pi pi-star",
                    subTitle: "Best Seller",
                },
                {
                    title: "Product B",
                    href: "/products/b",
                    subTitle: "New",
                },
            ],
        },
    ],
    buttons: []
};

describe("Navbar Component", () => {


  it("renders navigation menu items", () => {
    render(
      <ProjectProvider projectId="testProjectId">  {/* Pass projectId prop here */}
        <Navbar type={1} data={mockNavbarData} typeSubLink={0} />
      </ProjectProvider>
    );
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Products")).toBeInTheDocument();
  });
});
