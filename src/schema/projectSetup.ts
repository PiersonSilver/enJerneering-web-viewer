import { z } from "zod";
import { URL_REG } from "../constants/regex";
import { uploadedFileSchema } from "./file";

export const fetchWebSchema = z.object({
  webUrl: z
    .string()
    .regex(URL_REG, "The URL entered is invalid. Please check and try again."),
});

export const serviceAreaSchema = z.object({
  name: z.string(),
  abbreviation: z.string(),
});

export type ServiceArea = z.infer<typeof serviceAreaSchema>;

export type FetchWebInfo = z.infer<typeof fetchWebSchema>;

export const defaultFetchWebInfo: FetchWebInfo = {
  webUrl: "",
};

// Pierson Silver - Add Error Messages for Unfilled Fields
export const projectInfoSchema = z.object({
  title: z.string().min(1, "Title is Required"),
  domain: z.string().min(1, "Domain is Required"),
  description: z.string().min(1, "Description is Required"),
  additionalDetails: z.string().optional(),
  keywords: z.array(z.string()).min(1, "Project must contain at least 1 Keyword"),
  organizationLogo: uploadedFileSchema,
  thumbnail: uploadedFileSchema,
  serviceArea: z.array(serviceAreaSchema).min(1, "Project must contain at least 1 Service Area"),
});

export type ProjectInfo = z.infer<typeof projectInfoSchema>;

export const defaultProjectInfo: Partial<ProjectInfo> = {
  title: "",
  domain: "",
  description: "",
  keywords: [],
  serviceArea: [],
};

// Pierson Silver - Add Error Messages for Unfilled Fields
export const websiteInfoSchema = z.object({
  name: z.string().min(1, "Website Name is Required"),
  siteUrl: z
    .string()
    .regex(URL_REG, "The URL entered is invalid"),
  favicon: uploadedFileSchema,
});

export type WebsiteInfo = z.infer<typeof websiteInfoSchema>;

export const defaultWebsiteInfo: Partial<WebsiteInfo> = {
  name: "",
  siteUrl: "",
  favicon: undefined,
};

export const serviceSchema = z.object({
  _id: z.string(),
  name: z.string(),
  description: z.string(),
  serviceArea: z.array(serviceAreaSchema),
  images: z.array(uploadedFileSchema),
});

export type ServiceInfo = z.infer<typeof serviceSchema>;

export const defaultServiceInfo: ServiceInfo = {
  _id: "",
  name: "",
  description: "",
  serviceArea: [],
  images: [],
};
