"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../supabase/client";

const supabase = createClient();

interface Project {
  projectId: string;
  projectTitle: string;
}

const DebugPage: React.FC = () => {
  const [projectId, setProjectId] = useState("");
  const [projectData, setProjectData] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [recentProjects, setRecentProjects] = useState<Project[]>([]);

  const router = useRouter();

  useEffect(() => {
    const storedProjects = JSON.parse(localStorage.getItem("recentProjects") || "[]");
    setRecentProjects(storedProjects);
  }, []);

  const handleNavigate = () => {
    if (!projectId.trim()) {
      setError("Please enter a valid Project ID.");
      return;
    }
    fetchProjectTitleAndStore(projectId, true);
    router.push(`/viewer/${projectId}`);
  };

  const fetchProjectData = async () => {
    setError(null);
    setProjectData(null);

    if (!projectId.trim()) {
      setError("Please enter a valid Project ID.");
      return;
    }

    const { data, error } = await supabase
      .from("web-elements")
      .select("*")
      .eq("projectId", projectId)
      .single();

    if (error) {
      setError("Failed to fetch data. Ensure the project ID exists.");
      console.error(error);
    } else {
      fetchProjectTitleAndStore(projectId, false);
      setProjectData(data);
    }
  };

  const fetchProjectTitleAndStore = async (id: string, navigate: boolean) => {
    const { data, error } = await supabase
      .from("projects")
      .select("projectTitle")
      .eq("projectId", id)
      .single();

    if (!error && data?.projectTitle) {
      const newProject: Project = { projectId: id, projectTitle: data.projectTitle };
      const updatedProjects = [newProject, ...recentProjects.filter((p) => p.projectId !== id)].slice(0, 5);

      setRecentProjects(updatedProjects);
      localStorage.setItem("recentProjects", JSON.stringify(updatedProjects));
    } else {
      const newProject: Project = { projectId: id, projectTitle: "Unnamed Project" };
      const updatedProjects = [newProject, ...recentProjects.filter((p) => p.projectId !== id)].slice(0, 5);
      setRecentProjects(updatedProjects);
      localStorage.setItem("recentProjects", JSON.stringify(updatedProjects));
    }
  };

  const downloadJson = async () => {
    if (!projectId.trim()) {
      setError("Please enter a valid Project ID.");
      return;
    }
  
    try {
      // 1. Project
      const { data: projectData } = await supabase
        .from("projects")
        .select("*")
        .eq("projectId", projectId)
        .single();
  
      if (!projectData) throw new Error("Project not found");
  
      // 2. Designs
      const { data: designData } = await supabase
        .from("designs")
        .select("*")
        .eq("projectId", projectId);
  
      const designIds = designData?.map((d) => d.designId) || [];
  
      // 3. Pages
      const { data: pagesData } = await supabase
        .from("pages")
        .select("*")
        .in("designId", designIds.length ? designIds : [""]);
  
      const pageIds = pagesData?.map((p) => p.pageId) || [];
  
      // 4. Layers
      const { data: layerData } = await supabase
        .from("layers")
        .select("*")
        .in("pageId", pageIds.length ? pageIds : [""]);
  
      // 5. Footer
      const { data: webElementsData } = await supabase
        .from("web-elements")
        .select("*")
        .eq("projectId", projectId)
        .single();
  
      // 6. Services
      const { data: serviceData } = await supabase
        .from("services")
        .select("*")
        .eq("projectId", projectId);
  

      // 7. Compile export
      const exportData = {
        projectData,
        serviceData,
        footerData: webElementsData?.footerData
          ? JSON.parse(webElementsData.footerData)
          : {},
        designData,
        pagesData,
        layerData,
      };
  
      // 8. Download as file
      const blob = new Blob([JSON.stringify(exportData, null, 2)], {
        type: "application/json",
      });
  
      const title = projectData?.projectTitle || "project";
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${title}.json`;
      link.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Error generating JSON:", err);
      setError("Failed to generate JSON. Check console for details.");
    }
  };
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-6">
      <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg p-8 border border-gray-200">

        {/* Title Section */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-extrabold text-gray-900">enJerneering UI Viewer</h1>
          <h2 className="text-lg font-medium text-gray-600 mt-2">Debug Panel</h2>
        </div>

        <p className="text-gray-600 text-center mb-6">
          Enter a <span className="font-semibold text-gray-800">Project ID</span> to navigate to the viewer, test the data, or export the JSON.
        </p>

        {/* Input */}
        <div className="flex flex-col items-center space-y-4">
          <input
            type="text"
            value={projectId}
            onChange={(e) => setProjectId(e.target.value)}
            placeholder="Enter Project ID"
            className="w-full rounded-lg border border-gray-400 bg-white px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={handleNavigate}
              className="w-48 bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold py-3 rounded-lg transition duration-300"
            >
              Go to Viewer
            </button>

            <button
              onClick={fetchProjectData}
              className="w-48 bg-gray-300 hover:bg-gray-400 text-gray-900 font-semibold py-3 rounded-lg transition duration-300"
            >
              Data Test
            </button>

            <button
              onClick={downloadJson}
              className="w-48 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition duration-300"
            >
              Download JSON
            </button>
          </div>
        </div>

        {/* Project Data Output */}
        {projectData && (
          <div className="mt-6 p-4 bg-white border border-gray-300 rounded-lg overflow-auto max-h-64">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Project Data:</h2>
            <pre className="text-sm text-gray-600 whitespace-pre-wrap">{JSON.stringify(projectData, null, 2)}</pre>
          </div>
        )}

        {/* Recently Tested Projects */}
        {recentProjects.length > 0 && (
          <div className="mt-6 p-4 bg-gray-100 border border-gray-300 rounded-lg">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Recently Tested Projects</h2>
            <div className="space-y-2">
              {recentProjects.map(({ projectId, projectTitle }) => (
                <button
                  key={projectId}
                  onClick={() => setProjectId(projectId)}
                  className="w-full bg-gray-300 hover:bg-gray-400 text-gray-900 font-medium py-2 rounded-lg transition duration-300"
                >
                  {projectTitle || "Unnamed Project"}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DebugPage;
