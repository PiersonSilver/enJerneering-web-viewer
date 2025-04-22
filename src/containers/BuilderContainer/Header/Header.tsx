"use client";

import {
  AngleLeftSmallIcon,
  BellIcon,
  CrownBoldIcon,
  EditIcon,
  EnJerneeringLogo,
  EyeOutlineIcon,
  MoreVerticalIcon,
  QuestionSquareIcon,
  ReceiptListIcon,
  ShieldCheckIcon,
  TriangleExclamationBoldIcon,
  UserChangeIcon,
} from "../../../assets/icons";
import { Button } from "@internalComponents/Button";
import { PageMenu } from "./PageMenu";
import { useRouter } from "next/navigation";
import { PublishMenu } from "../elements/PublishMenu";
import { Alert, AlertDescription } from "@internalComponents/Alert";
import { ProgressBar } from "primereact/progressbar";
import { useMemo } from "react";
import { settings } from "@workspace/meta";
import { UserButton } from "@clerk/nextjs";
import { useBuilderStore } from "@stores/builderStore"; // Import useBuilderStore
import { Cart } from "@internalComponents/Cart";
import type { OptionItem } from "@workspace/settings/types/settingsData";
import { createClient } from "../../../../supabase/client";
import { convertImageToBase64 } from "../../../../supabase/images/convertImage";
import { v4 as uuidv4 } from "uuid";

const optionsCard: OptionItem[] = [
  {
    label: "Name on Card",
    value: settings.billing.nameCard,
  },
  {
    label: "Card Number",
    value: settings.billing.numberCard,
  },
  {
    label: "Exp. Date",
    value: settings.billing.expDateCard,
  },
  {
    label: "CVV",
    value: "***",
  },
];

const optionsAddressBilling: OptionItem[] = [
  {
    label: "First Name",
    value: settings.addressBilling.firstName,
  },
  {
    label: "Last Name",
    value: settings.addressBilling.lastName,
  },
  {
    label: "Country",
    value: settings.addressBilling.country,
  },
  {
    label: "Phone Number",
    value: settings.addressBilling.phone,
  },
];

const OptionItem = ({ item }: { item: OptionItem }): JSX.Element => (
  <div className="grid grid-cols-6 gap-4">
    <dt className="text-sm font-medium">{item.label}</dt>
    <dd className="text-sm font-normal text-sub-400">{item.value}</dd>
  </div>
);

const sendToAuth = () => {
  const authUrl = `https://github.com/login/oauth/authorize?client_id=Iv23lixrlLdSxhCiqlmq&redirect_uri=http://localhost:3000/builder`;
  window.location.href = authUrl;
};

const getCodeFromUrl = () => {
  const searchParams = new URLSearchParams(window.location.search);
  return searchParams.get("code");
};

const removeCodeFromUrl = () => {
  const url = new URL(window.location.href);
  url.searchParams.delete("code");
  window.history.replaceState(null, "", url);
};

export const Header = () => {
  const percentUsed = useMemo(() => {
    if (settings.billing.numberCreated) {
      const percentage =
        (settings.billing.numberCreated / settings.billing.totalWebsite) * 100;
      return Math.round(percentage);
    }
    return 0;
  }, [settings]);

  const isFull = useMemo(
    () => settings.billing.numberCreated === settings.billing.totalWebsite,
    [settings]
  );

  const router = useRouter();

  const onBack = () => {
    router.replace("/workspace");
  };

  const sendToAPI = async (code: string) => {
    const response = await fetch("/api/v1/repository", {
      method: "POST",
      body: JSON.stringify({
        code: code,
      }),
    });
  };

  //function for saving the textbox data to the database (removed textbox)

  const getGlobalConfig = useBuilderStore((state) => state.getGlobalConfig);
  const supabase = createClient();

  // Utility function to traverse object and convert image URLs to Base64
  const processImagesInData = async (data: any): Promise<any> => {
    if (!data) return null;

    const processObject = async (obj: any) => {
      const entries = Object.entries(obj);
      for (const [key, value] of entries) {
        if (typeof value === "string" && value.startsWith("blob:")) {
          // Handle Blob URLs
          try {
            const response = await fetch(value);
            const blob = await response.blob();
            obj[key] = await convertImageToBase64(blob);
          } catch (error) {
            console.error(`Error converting Blob URL at key '${key}':`, error);
          }
        } else if (typeof value === "string" && value.startsWith("http")) {
          // Handle regular URLs
          try {
            obj[key] = await convertImageToBase64(value);
          } catch (error) {
            console.error(`Error converting URL at key '${key}':`, error);
          }
        } else if (value instanceof Blob) {
          // Handle Blob objects
          try {
            obj[key] = await convertImageToBase64(value);
          } catch (error) {
            console.error(`Error converting Blob at key '${key}':`, error);
          }
        } else if (typeof value === "object" && value !== null) {
          // Recursively process nested objects
          await processObject(value);
        }
      }
      return obj;
    };

    return await processObject(JSON.parse(JSON.stringify(data))); // Clone to avoid mutation
  };

  /// Pierson - Somewhat working way of saving pages, and the layers within them
  /// Could likely be sent to supabase using a for each page in allPages
  /// Layouts are nowhere in the code, so we may need to work around that with supabase.
  const saveProject = async () => {
    const projectState = useBuilderStore.getState();
    const projectId = projectState.projectId;

    const pagesArray = Object.values(projectState.pages);

    let allPages = [];
    for (const page of pagesArray) {
      let allLayers = [];
      for (const layer of page.layers) {
        const transformedLayer = {
          layerId: layer.id,
          componentType: layer.componentName,
          styleVariant: layer.styleType,
          content: JSON.stringify(await processImagesInData(layer.data)),
          configuration: "",
        };
        console.log(transformedLayer);
        allLayers.push(transformedLayer);
      }
      console.log("All layers:", allLayers);
      const transformedPage = {
        pageId: page.pageId,
        title: page.pageTitle,
        seoEnabled: false,
        seoKeywords: [],
        layers: allLayers,
      };
      allPages.push(transformedPage);
    }
    console.log("All Pages: ", allPages);

    console.log("Footer Data: ", projectState.getGlobalConfig().footer?.data);

    if (!projectId) {
      console.error("No project ID found");
      return;
    }
  };

  //King - New function: testSaveProject
  // This function uses the update-only logic to send the current builder state to the API
  const testSaveProject = async (): Promise<void> => {
    const state = useBuilderStore.getState();
    const projectId = state.projectId;
    if (!projectId) {
      console.error("No project ID found");
      return;
    }

    // Transform pages data for the API payload.
    const pagesArray = Object.values(state.pages);
    const transformedPages = await Promise.all(
      pagesArray.map(async (page) => {
        const transformedLayers = await Promise.all(
          page.layers.map(async (layer) => {
            try {
              const processedContent = await processImagesInData(layer.data);

              return {
                componentType: layer.componentName,
                styleVariant: layer.styleType,
                content: JSON.stringify(processedContent),
                configuration: "",
              };
            } catch (error) {
              console.error("Error processing images:", error);
              return {
                componentType: layer.componentName,
                styleVariant: layer.styleType,
                content: JSON.stringify(layer.data), // Fallback to original data
                configuration: "",
              };
            }
          })
        );

        return {
          title: page.pageTitle,
          seoEnabled: false,
          seoKeywords: [],
          layers: { create: transformedLayers },
        };
      })
    );

    const designData = {
      status: "DRAFT",
      pages: { create: transformedPages },
    };

    let user;
    try {
      const userResponse = await fetch("/api/v1/users/current");
      user = await userResponse.json();
    } catch (error) {
      console.error("Error fetching current user:", error);
      return;
    }

    const projectData = {
      userId: user.id,
      keywords: [],
      status: "DRAFT",
      designs: { create: designData },
    };

    console.log("HEY THIS IS PROJECT DATA", projectData);
    try {
      const response = await fetch(`/api/v1/projects/${projectId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(projectData),
      });
      const updatedProject = await response.json();
      console.log("Project updated:", updatedProject);
    } catch (error) {
      console.error("Error updating project:", error);
    }

    const rawNavBarData = getGlobalConfig().navbar?.data || null;
    const rawFooterData = getGlobalConfig().footer?.data || null;

    // Convert images to Base64 in each object
    const navBarData = rawNavBarData
      ? JSON.stringify(await processImagesInData(rawNavBarData))
      : null;
    const footerData = rawFooterData
      ? JSON.stringify(await processImagesInData(rawFooterData))
      : null;

    const webElementsObject = {
      projectId,
      navBarData,
      footerData,
    };

    console.log("Data", useBuilderStore.getState());

    console.log("Processed Data:", webElementsObject);

    try {
      console.log(webElementsObject);
      await supabase
        .from("web-elements")
        .upsert(webElementsObject, { onConflict: "projectId" });
    } catch (error) {
      console.error("Error saving configs:", error);
    }
    const defaultPage = pagesArray[0].pageTitle.replace(" ", "-");
    //const webViewer = process.env.NEXT_PUBLIC_WEB_VIEWER;
    //window.open(`${webViewer}?projectId=${projectId}`, "_blank");
    window.open(
      `http://localhost:4000/viewer/${projectId}/${defaultPage}`,
      "_blank"
    ); // localhost for testing on non-master branches
  };

  // Pierson - Saves the project and sends it directly to Supabase rather than through API
  // added indexing to the layers that are being sent for most accurate data sending/pulling
  const supabaseSaveProject = async (): Promise<void> => {
    const state = useBuilderStore.getState();
    const projectId = state.projectId;
    if (!projectId) {
      console.error("No project ID found");
      return;
    }

    const designId = uuidv4();

    const pagesArray = Object.values(state.pages);
    const transformedPages = await Promise.all(
      pagesArray.map(async (page) => {
        const transformedLayers = await Promise.all(
          page.layers.map(async (layer) => {
            try {
              const processedContent = await processImagesInData(layer.data);
              return {
                layerId: layer.id,
                pageId: page.pageId,
                componentType: layer.componentName,
                styleVariant: layer.styleType,
                content: JSON.stringify(processedContent),
                configuration: "",
                index: page.layers.indexOf(layer),
              };
            } catch (error) {
              console.error("Error processing images:", error);
              return {
                layerId: layer.id,
                pageId: page.pageId,
                componentType: layer.componentName,
                styleVariant: layer.styleType,
                content: JSON.stringify(layer.data),
                configuration: "",
                index: page.layers.indexOf(layer),
              };
            }
          })
        );
        return {
          pageId: page.pageId,
          designId,
          title: page.pageTitle,
          seoEnabled: false,
          seoKeywords: [],
          layers: transformedLayers,
        };
      })
    );

    try {
      const { error: projectsError } = await supabase
        .from("projects")
        .update({
          lastUpdated: new Date().toISOString(),
        })
        .eq("projectId", projectId);
      if (projectsError) throw projectsError;
    } catch (error) {
      console.error("Error updating project:", error);
      return;
    }

    try {
      const { error: designError } = await supabase.from("designs").upsert({
        designId,
        lastUpdated: new Date().toISOString(),
        projectId,
      });
      if (designError) throw designError;
    } catch (error) {
      console.error("Error saving design:", error);
      return;
    }

    transformedPages.map(async (page) => {
      try {
        const { error: pagesError } = await supabase.from("pages").upsert({
          designId,
          lastUpdated: new Date().toISOString(),
          pageId: page.pageId,
          pageSeoEnabled: page.seoEnabled,
          pageTitle: page.title,
        });
        if (pagesError) throw pagesError;
        await Promise.all(
          page.layers.map(async (layer) => {
            const { error: layersError } = await supabase
              .from("layers")
              .upsert({
                componentType: layer.componentType,
                configuration: JSON.stringify({index: layer.index}),
                content: layer.content,
                lastUpdated: new Date().toISOString(),
                layerId: layer.layerId,
                pageId: page.pageId,
                styleVariant: layer.styleVariant,
              });
            if (layersError) throw layersError;
            console.log(
              "layer sent: " + layer.componentType + " from " + page.title
            );
          })
        );
      } catch (error) {
        console.error("Error saving pages/layers:", error);
        return;
      }
    });

    try {
      const rawNavBarData = getGlobalConfig().navbar?.data || null;
      const rawFooterData = getGlobalConfig().footer?.data || null;
      const navBarData = rawNavBarData
        ? JSON.stringify(await processImagesInData(rawNavBarData))
        : null;
      const footerData = rawFooterData
        ? JSON.stringify(await processImagesInData(rawFooterData))
        : null;

      const { error: webElementsError } = await supabase
        .from("web-elements")
        .upsert(
          {
            projectId,
            navBarData,
            footerData,
          },
          { onConflict: "projectId" }
        );
      if (webElementsError) throw webElementsError;
    } catch (error) {
      console.error("Error saving web elements:", error);
      return;
    }

    const defaultPage = pagesArray[0]?.pageTitle.replace(" ", "-");

    const webViewer = process.env.NEXT_PUBLIC_WEB_VIEWER;
    window.open(`${webViewer}viewer/${projectId}/${defaultPage}`, "_blank");
    //window.open(http://localhost:4000/viewer/${projectId}/${defaultPage}, "_blank");

    //const webViewer = process.env.NEXT_PUBLIC_WEB_VIEWER;
    //window.open(`${webViewer}?projectId=${projectId}`, "_blank");

    //const defaultPage = pagesArray[0]?.pageTitle.replace(" ", "-") || "home";
    //window.open(`http://localhost:4000/viewer/${projectId}/${defaultPage}`, "_blank");
  };

  /* useEffect(() => {
    const code = getCodeFromUrl();
    if (code) {
      sendToAPI(code);
    }
  }, []); */

  return (
    <div className="flex p-4 items-center">
      <div className="basis-3/10 flex">
        <div className="w-16">
          <EnJerneeringLogo width="2.5rem" height="2.5rem" />
        </div>
        <div className="mr-auto flex items-center gap-2">
          <Button
            variant="soft"
            size="xs"
            className="text-border-500"
            onClick={onBack}
            icon={<AngleLeftSmallIcon width="1.5rem" height="1.5rem" />}
          />
          <p className="font-semibold text-lg">UI Builder 2024</p>
          <Button
            variant="soft"
            size="xs"
            className="text-border-500"
            icon={<MoreVerticalIcon width="1rem" height="1rem" />}
          />
        </div>
      </div>
      <div className="flex justify-center basis-2/5">
        <PageMenu />
      </div>
      <div className="flex justify-end gap-4 basis-3/10 pr-4">
        <Button
          label="Save And Preview Project"
          variant="secondary"
          onClick={supabaseSaveProject}
        />

        <Button
          label="Save Project"
          variant="secondary"
          onClick={saveProject}
        />
        <Button
          label="Preview"
          variant="secondary"
          icon={<EyeOutlineIcon width="1.25rem" height="1.25rem" />}
        />
        <PublishMenu />
      </div>
      <div className="h-full flex flex-1 justify-end items-center gap-4 pr-4">
        <Button
          icon={<UserChangeIcon width="1.25rem" height="1.25rem" />}
          label="Become an Affiliate"
          variant="dark"
        />
        <div className="flex gap-2">
          <Button
            icon={<QuestionSquareIcon width="1.5rem" height="1.5rem" />}
            variant="soft"
          />
          <Button
            icon={<BellIcon width="1.5rem" height="1.5rem" />}
            variant="soft"
          />
          <Cart />
        </div>
        <UserButton>
          <UserButton.UserProfilePage
            label="Billing"
            labelIcon={<ReceiptListIcon className="w-4 h-4" />}
            url="billing"
          >
            <div className="flex flex-col gap-10">
              <div className="flex flex-col gap-6 p-6 rounded-2xl border border-border-200 bg-background-50">
                <div className="flex pb-4 border-b border-border-200">
                  <h2>Plan Summary</h2>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex gap-4 justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0">
                        <div className="text-4xl font-bold capitalize">
                          {`${settings.billing.tier} ${
                            settings.billing.tier !== "starter" ? "Tiger" : ""
                          }`}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-6 items-end">
                      <Button label="View Plans" variant="outline" size="lg" />
                      <Button
                        label="Upgrade Now"
                        variant="dark"
                        icon={<CrownBoldIcon width="1.5rem" height="1.5rem" />}
                        size="lg"
                      />
                    </div>
                  </div>

                  <span className="text-base font-normal text-sub-500">
                    Your subscription will be automatically charged on{" "}
                    {settings.billing.chargeDate}.
                  </span>

                  <div className="flex justify-between gap-4 mt-4">
                    <span className="text-base font-semibold">
                      {settings.billing.numberCreated} of{" "}
                      {settings.billing.totalWebsite} website created
                    </span>
                    <span className="text-base font-normal">25% used</span>
                  </div>

                  <ProgressBar
                    value={percentUsed}
                    className="h-4"
                    color={isFull ? "#C81E1E" : "#E09D37"}
                  />

                  {isFull ? (
                    <Alert variant="error" className="mt-4">
                      <TriangleExclamationBoldIcon
                        width="1.25rem"
                        height="1.25rem"
                      />
                      <AlertDescription>
                        You’ve reach your page limit. Create unlimited pages and
                        unlock all premium features by upgrading.
                      </AlertDescription>
                    </Alert>
                  ) : (
                    <span className="text-base font-normal text-sub-500">
                      Get full access to enJerneering features by upgrading your
                      plan.
                    </span>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-6 p-6 rounded-2xl border border-border-200 bg-background-50">
                <div className="flex flex-col gap-2 pb-4 border-b border-border-200">
                  <div className="flex gap-4 justify-between ">
                    <div className="flex items-center gap-2">
                      <h2>Payment Information</h2>
                      <ShieldCheckIcon width="1.5rem" height="1.5rem" />
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      icon={<EditIcon width="1.25rem" height="1.25rem" />}
                    />
                  </div>
                  <span className="text-base font-normal text-sub-500">
                    All your payment information is securely submitted.
                  </span>
                </div>

                <div className="flex flex-col gap-4">
                  <span className="text-sm font-bold">
                    Credit or Debit Card
                  </span>
                  <div className="flex flex-col gap-6">
                    {optionsCard.map((option, index) => (
                      <OptionItem item={option} key={index} />
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <span className="text-sm font-bold">Billing Address</span>
                  <div className="flex flex-col gap-6">
                    {optionsAddressBilling.map((option, index) => (
                      <OptionItem item={option} key={index} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </UserButton.UserProfilePage>
        </UserButton>
      </div>
    </div>
  );
};
