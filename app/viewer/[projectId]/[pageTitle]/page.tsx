"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useParams, useSearchParams } from "next/navigation";
import FooterType1 from "@components/Footer/_FooterType1";
import { createClient } from "@internalSupabase/client";
import TextBoxType from "@components/TextBox/_TextBox";
import PictureType from "@components/Picture/_Picture";
import { ProjectProvider } from "@providers/ProjectContext"
import Header from "@components/Header";
import CallToAction from "@components/CallToAction";
import Contact from "@components/Contact";
import MainContent from "@components/MainContent";
import Footer from "@components/Footer";
import Navbar from "@components/Navbar";

//added for successful build
export const dynamic = "force-dynamic";

console.log("✅ Executing");

const supabase = createClient();

type LayerConfiguration = {
  index: number;
}

const PageViewer = () => {
    const { projectId, pageTitle } = useParams() as { projectId: string; pageTitle: string };;
    const [sections, setSections] = useState<JSX.Element[]>([]);
    const [footer, setFooter] = useState<JSX.Element[]>([]);
    const [navbar, setNavbar] = useState<JSX.Element[]>([]);

    const parsedPageTitle = pageTitle.replace("-", " ");
    
  useEffect(() => {
    console.log("Checking projectId:", projectId);
    
    if (!projectId) {
      console.warn("No projectId found in URL.");
      return;
    }

    const fetchData = async () => {
      console.log(`Fetching data for projectId: ${projectId}`);

      try {
        const { data: webElementsData, error: webElementsErr } = await supabase
          .from("web-elements")
          .select("*")
          .eq("projectId", projectId)
          .single();

        if (webElementsErr) throw new Error(`WebElements error: ${webElementsErr.message}`);

        const { data: designData, error: designErr } = await supabase
          .from("designs")
          .select("*")
          .eq("projectId", projectId);

        if (designErr) throw new Error(`Designs error: ${designErr.message}`);

        let designId = designData?.[designData.length - 1]?.designId;

        const { data: pagesData, error: pagesErr } = await supabase
          .from("pages")
          .select("*")
          .eq("designId", designId);

        if (pagesErr) throw new Error(`Pages error: ${pagesErr.message}`);

        let pageId = pagesData?.find(
          (page) => page.pageTitle === parsedPageTitle,
        )?.pageId;

        if (!pageId) {
            throw new Error(`No page found for title: ${pageTitle}`);
          }

        const { data: layerData, error: layerErr } = await supabase
          .from("layers")
          .select("*")
          .eq("pageId", pageId ?? "")

        if (layerErr) throw new Error(`Layers error: ${layerErr.message}`);
        
        if (layerData) {
          layerData.sort((a, b) => {
            if (!a.configuration || !b.configuration) return 0;
        
            try {
              const aConfig = JSON.parse(a.configuration);
              const bConfig = JSON.parse(b.configuration);
        
              const aIndex = typeof aConfig.index === "number" ? aConfig.index : 0;
              const bIndex = typeof bConfig.index === "number" ? bConfig.index : 0;
        
              return aIndex - bIndex;
            } catch (error) {
              console.error("Error parsing configuration:", error);
              return 0; 
            }
          });
        }

        console.log("Layer Data:", layerData);

        const navBarType = webElementsData?.navbarType? webElementsData.navbarType : 1;

        const parsedNavbarData = webElementsData?.navBarData
          ? JSON.parse(webElementsData.navBarData)
          : null;

        parsedNavbarData? setNavbar([<Navbar type={navBarType} data={parsedNavbarData} typeSubLink={0} />]) : setNavbar([]);

        const footerType = webElementsData?.footerType? webElementsData.footerType : 1;


        const parsedFooterData = webElementsData?.footerData
          ? JSON.parse(webElementsData.footerData)
          : null;

        parsedFooterData? setFooter([<Footer type={footerType} data={parsedFooterData} />]) : setFooter([]);

        console.log("Footer Data:", parsedFooterData);

        const renderedSections = (
          layerData?.map((layer) => renderSection(layer)) || []
        ).filter((section) => section !== null);

        setSections(renderedSections);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [projectId]);

  const renderSection = (layer: { content: string; componentType: string, styleVariant: number}) => {
    try {
      const layerContent = JSON.parse(layer.content);

      switch (layer.componentType) {
        case "Header":
          return <Header type={layer.styleVariant} data={layerContent} />;
        case "MainContent":
          return <MainContent type={layer.styleVariant} data={layerContent} />;
        case "CallToAction":
          return <CallToAction type={layer.styleVariant} data={layerContent} />;
        case "Contact":
          return <Contact type={layer.styleVariant} data={layerContent} />;
        case "TextBox":
          return <TextBoxType key={layer.componentType} data={layerContent} />;
        case "Picture":
          return <PictureType key={layer.componentType} data={layerContent} />;
        default:
          return null;
      }
    } catch (error) {
      console.error(
        `Error rendering section for ${layer.componentType}:`,
        error,
      );
      return null;
    }
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProjectProvider projectId={projectId}>
        <div data-testid="viewer-container" className="h-full w-full">
          {navbar}
          {sections}
          {footer}
        </div>
      </ProjectProvider>
    </Suspense>
  );
};

export default PageViewer;
