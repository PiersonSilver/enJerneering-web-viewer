import { z } from "zod";

export const uploadedFileSchema = z.object({
  name: z.string(),
  type: z.string(),
  url: z.string(),
  size: z.number(),
  thumbUrl: z.string().optional(),
}).refine((file) => file && file.name && file.url, {
  message: "File upload is required.",});

export type UploadedFile = z.infer<typeof uploadedFileSchema>;
