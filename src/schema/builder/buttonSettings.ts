import { BUTTON_ACTIONS } from "../../enums/builder";
import { z } from "zod";

export const buttonSettingsSchema = z.object({
  label: z.string(),
  color: z.enum(["primary", "secondary", "error"]),
  actionType: z.nativeEnum(BUTTON_ACTIONS),
  externalUrl: z.string().optional(),
  pagePath: z.string().optional(),
});

export type ButtonSettingsSchema = z.infer<typeof buttonSettingsSchema>;

export const defaultButtonSettings: Partial<ButtonSettingsSchema> = {
  label: "",
  color: "primary",
  externalUrl: "",
};
