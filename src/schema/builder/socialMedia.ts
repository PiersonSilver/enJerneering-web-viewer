import { z } from "zod";

export const socialMediaSchema = z.object({
  icon: z.string(),
  url: z.string(),
});

export type SocialMediaSchema = z.infer<typeof socialMediaSchema>;

export const defaultValues: SocialMediaSchema = {
  icon: "",
  url: "",
};
