"use client";

import React, { useEffect } from "react";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import {
  ArrowLeftSmallIcon,
  ArrowRightSmallIcon,
  CheckCircleIcon,
  InfoCircleIcon,
  LinkIcon,
  UploadIcon,
} from "../../assets/icons";
import { UploadedFile } from "@schema/file";
import { InputText } from "@internalComponents/Input";
import { Button } from "@internalComponents/Button";
import { Separator } from "@builderComponents/ui/Separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@internalComponents/FormField";
import { useProjectSetupStore } from "@stores/projectSetupStore";
import {
  FileUploadInput,
  FileUploadInputDropzone,
  FileUploadInputFallback,
  FileUploadInputPreview,
} from "@builderComponents/form/FileUploadField";
import { ImagePreview } from "@builderComponents/ui/FileUpload";
import { ProjectSetupHeader, StepperFooterPortal } from "./elements";
import {
  defaultWebsiteInfo,
  WebsiteInfo,
  websiteInfoSchema,
} from "@schema/projectSetup";
import { zodResolver } from "@hookform/resolvers/zod";
import { Tooltip } from "@internalComponents/Tooltip";
import { useRouter } from "next/navigation";

import { createClient } from "../../../supabase/client";
import { ProjectStatus } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import { ProjectSetupStoreData } from "@stores/projectSetupStore/type";

import { useUser } from "@clerk/nextjs";
import { useBuilderStore } from "@stores/builderStore";
import { enqueueSnackbar } from "notistack";

const supabase = createClient();

// Convert file to Base64
const toBase64 = (file: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};

// Insert service records into Supabase database
const insertServices = async (
  services: any[],
  projectId: string,
  timestamp: string
) => {
  const serviceInserts = services.map((service) => ({
    serviceId: service._id,
    projectId,
    serviceName: service.name || "",
    serviceDescription: service.description || "",
    lastUpdated: timestamp,
    createdAt: timestamp,
  }));

  await supabase.from("services").insert(serviceInserts);
};

export const WebsiteInformationForm: React.FC = () => {
  const router = useRouter();
  const { isLoaded, isSignedIn, user } = useUser();

  const setData = useProjectSetupStore((state) => state.setData);
  const getData = useProjectSetupStore((state) => state.getData);
  const popView = useProjectSetupStore((state) => state.popView);
  const reset = useProjectSetupStore((state) => state.reset);
  const useFormReturn = useForm<WebsiteInfo>({
    mode: "onSubmit",
    defaultValues: defaultWebsiteInfo,
    resolver: zodResolver(websiteInfoSchema),
  });

  const { control, handleSubmit } = useFormReturn;

  const handleChangeSingleFile =
    (changeCb: (...evt: any[]) => void) => async (files: UploadedFile[]) => {
      if (files.length > 0) {
        const response = await fetch(files[0].url); // Fetch file from URL
        const blob = await response.blob(); // Convert to Blob
        const base64String = await toBase64(blob); // Convert to Base64
        changeCb({ ...files[0], base64: base64String }); // Update with Base64
      } else {
        changeCb(null);
      }
    };

  const createProject = async (
    data: ProjectSetupStoreData["data"],
    projectId: string
  ) => {
    if (!user) {
      console.error("User not authenticated");
      return;
    }

    const { projectInfo, websiteInfo, services } = data;

    const currentTimestamp = new Date().toISOString();

    let faviconBase64 = "";

    // Convert favicon to Base64 if available
    if (websiteInfo.favicon?.url) {
      const response = await fetch(websiteInfo.favicon.url); // Fetch file
      const blob = await response.blob(); // Convert to Blob
      faviconBase64 = await toBase64(blob); // Convert to Base64
    }

    const projectObject = {
      projectId,
      userId: user.id,
      projectTitle: projectInfo.title || websiteInfo.name || "",
      projectDescription: projectInfo.description || "",
      projectDomain: projectInfo.domain || "",
      projectKeywords: projectInfo.keywords || [],
      projectConfigurationDetails: projectInfo.additionalDetails || "",
      projectThumbnail: faviconBase64,
      projectStatus: ProjectStatus.DRAFT,
      lastUpdated: currentTimestamp,
      createdAt: currentTimestamp,
    };

    try {
      await supabase.from("projects").insert(projectObject);
      await insertServices(services, projectId, currentTimestamp);
    } catch (error) {
      console.error("Error creating project: ", error);
    }
  };

  // Pierson Silver - Add Success Popup for user 
const onSubmitWebInfoForm: SubmitHandler<WebsiteInfo> = (values) => {
    setData("websiteInfo", values);
    onSubmit()

    enqueueSnackbar({
          variant: "success",
          title: "Data Saved",
          message: (
            <>
              Your Website Info has been received successfully.
              <br/>
              <br/>
              <b>Loading Builder</b>
            </>
          ),
        });
  };

  // Pierson Silver - Add SubmitHandle Error Handler to tell user that they have unfilled fields with snackbar
  const onWebInfoSubmitError: SubmitErrorHandler<WebsiteInfo> = (errors) => {
    let messages = Object.values(errors)
    .map((error) => error.message)
    .filter(Boolean);

    if(messages.includes("Required")){
      messages = messages.filter((message) => message !== "Required");
      messages.push("Missing Website Favicon. Please Upload an Icon");
    };

      enqueueSnackbar({
        variant: "error",
        title: "Form Validation Error",
        message: messages.join(", \n"),
      });
    };

  const setBuilderProjectId = useBuilderStore((state) => state.setProjectId);

  const onSubmit = handleSubmit(async (formData) => {
    setData("websiteInfo", formData);
    console.log(getData());



    const projectId = uuidv4();

    await createProject(getData(), projectId);

    setBuilderProjectId(projectId);

    router.replace(`/builder`);

    setTimeout(reset, 1000);
  });

  useEffect(() => {
    router.prefetch("/builder");
  }, [router]);

  return (
    <div>
      <div className="space-y-16">
        <ProjectSetupHeader
          heading="Website Information"
          subHeading="This information will serve as the foundation for AI-driven project customization."
        />
        <Form {...useFormReturn}>
          <form onSubmit={onSubmit}>
            <div className="flex flex-col gap-6">
              <FormField
                control={control}
                name="name"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="text-base">Website Name</FormLabel>
                    <FormControl>
                      <InputText
                        placeholder="Your website name"
                        className="w-full"
                        size="lg"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="siteUrl"
                render={({ field, fieldState }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="flex items-center text-base gap-2">
                      <span> Website URL</span>
                      <InfoCircleIcon
                        width="1rem"
                        height="1rem"
                        className="text-neutral-500"
                        id="websiteURLTooltip"
                      />
                      <Tooltip
                        content="Website URL"
                        target="#websiteURLTooltip"
                        position="top"
                        className="max-w-[16.5rem]"
                      />
                    </FormLabel>
                    <div className="flex items-center gap-2">
                      <div className="relative flex-1">
                        <FormControl>
                          <InputText
                            placeholder="Enter your existing website URL"
                            className="w-full"
                            size="lg"
                            {...field}
                          />
                        </FormControl>
                        {!fieldState.invalid && fieldState.isDirty && (
                          <CheckCircleIcon
                            width="1.25rem"
                            height="1.25rem"
                            className="text-success-600 absolute right-5 top-1/2 -translate-y-1/2"
                          />
                        )}
                      </div>
                      <div>
                        <Button
                          icon={<LinkIcon width="1.5rem" height="1.5rem" />}
                          label="Link with Integration"
                          variant="dark"
                          size="xl"
                        />
                      </div>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Separator />
              <FormField
                control={control}
                name="favicon"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">
                      Upload Website Favicon
                    </FormLabel>
                    <FormControl>
                      <FileUploadInput
                        {...field}
                        multiple={false}
                        value={[field.value].filter((file) => !!file)}
                        onChange={handleChangeSingleFile(field.onChange)}
                      >
                        <FileUploadInputDropzone className="w-full">
                          <FileUploadInputFallback>
                            <UploadIcon width="1.5rem" height="1.5rem" />
                            <div className="text-sm">
                              <span className="font-semibold">
                                {"Click to upload "}
                              </span>
                              <span className="font-normal">
                                or drag and drop file
                              </span>
                              <p className="font-normal text-center">
                                File allowed PNG, SVG, or GIF.
                              </p>
                            </div>
                          </FileUploadInputFallback>
                        </FileUploadInputDropzone>
                        <FileUploadInputPreview>
                          {ImagePreview}
                        </FileUploadInputPreview>
                      </FileUploadInput>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>
        <StepperFooterPortal>
          <Button
            variant="outline"
            label="Back"
            onClick={popView}
            icon={<ArrowLeftSmallIcon width="1.5rem" height="1.5rem" />}
            className="mr-auto"
          />
          <Button
            variant="primary"
            icon={<ArrowRightSmallIcon width="1.5rem" height="1.5rem" />}
            label="Continue"
            iconPos="right"
            onClick={handleSubmit(onSubmitWebInfoForm, onWebInfoSubmitError)}
          />
        </StepperFooterPortal>
      </div>
    </div>
  );
};
