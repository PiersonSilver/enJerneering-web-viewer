"use client";

import { useDialog } from "@/_stores/dialogStore";
import {
  buttonActions,
  buttonStyles,
} from "../../../app/(protected)/builder/meta";
import { Button } from "@internalComponents/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@internalComponents/Dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@internalComponents/FormField";
import { InputText } from "@internalComponents/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@internalComponents/Select";
import { Separator } from "@builderComponents/ui/Separator";
import { PropsWithChildren, useEffect, useMemo } from "react";
import { SubmitHandler, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useBuilderStore } from "@stores/builderStore";
import { v4 as uuidv4 } from "uuid";
import { ButtonSettingsData } from "@customTypes/builder";
import { BUTTON_ACTIONS } from "../../enums/builder";
import {
  buttonSettingsSchema,
  ButtonSettingsSchema,
  defaultButtonSettings,
} from "@schema/builder/buttonSettings";

interface FormRowProps {
  heading: string;
}

interface ButtonSettingsPayloadBase {
  onChange: (buttonSettings: ButtonSettingsData) => void;
}

interface UpdateButtonSettingsPayload
  extends ButtonSettingsData,
    ButtonSettingsPayloadBase {
  mode: "update";
}

interface CreateButtonSettingsPayload extends ButtonSettingsPayloadBase {
  mode: "create";
}

export type ButtonSettingsDialogPayload =
  | CreateButtonSettingsPayload
  | UpdateButtonSettingsPayload;

export const ButtonSettingsDialog = () => {
  const pages = useBuilderStore((state) => state.pages);
  const { isOpen, close, payload } =
    useDialog<ButtonSettingsDialogPayload>("buttonSettings");

  const form = useForm<ButtonSettingsSchema>({
    defaultValues: defaultButtonSettings,
    resolver: zodResolver(buttonSettingsSchema),
  });

  const { control, formState, reset, handleSubmit } = form;

  const actionType = useWatch<ButtonSettingsSchema>({
    control: control,
    name: "actionType",
  });

  const pagePath = useWatch<ButtonSettingsSchema>({
    control: control,
    name: "pagePath",
  });

  const pageOptions = useMemo(
    () =>
      Object.keys(pages).map((pageId) => ({
        value: pageId,
        label: pages[pageId].pageTitle,
      })),
    [pages]
  );

  useEffect(() => {
    const mode = payload?.data?.mode;

    if (!isOpen) {
      return;
    }

    if (mode === "create") {
      reset(defaultButtonSettings);
    }

    if (mode === "update") {
      reset(payload.data?.buttonProps);
    }
  }, [isOpen, payload, reset]);

  const projectId: any = useBuilderStore((state) => state.projectId);

  const renderActionLink = () => {
    switch (actionType) {
      case BUTTON_ACTIONS.TO_EXTERNAL:
        return (
          <FormField
            key="externalUrl"
            control={control}
            name="externalUrl"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Button External URL</FormLabel>
                <FormControl>
                  <InputText
                    placeholder="Enter URL"
                    className="w-full"
                    size="sm"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        );
      case BUTTON_ACTIONS.TO_PAGE:
        return (
          <FormField
            key="pagePath"
            control={control}
            name="pagePath"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Target Page</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  name={field.name}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select target page" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {pageOptions.map((page) => (
                      <SelectItem
                        key={page.value}
                        value={`/viewer/${projectId}/${page.label.replace(" ","-")}`} // Pierson TODO - CHANGE THIS URL TO TAKE OUT viewer/${peojectId} WHEN NOT USiNG VIEWER ANYMORE
                        showIndicator={false}
                        className="pl-4"
                      >
                        {page.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
        );
      default:
        return <div></div>;
    }
  };

  const onSubmit: SubmitHandler<ButtonSettingsSchema> = (values) => {
    const { data } = payload;

    if (data && data.mode === "update") {
      const { buttonProps, id} = data;
      console.log("Updated buttonProps: ", { ...buttonProps, ...values });
      payload.data?.onChange({ id, buttonProps: { ...buttonProps, ...values } }); // Pierson - Switched on change to allow onApplyChanges in ButtonSettingsContext to work
    } else if (data?.mode === "create") {
      payload.data?.onChange({
        id: uuidv4(),
        buttonProps: { ...values, size: "medium" },
      });
    }

    close();
  };

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <Form {...form}>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Button Settings</DialogTitle>
            </DialogHeader>

            <div className="p-6 space-y-5">
              <FormRow heading="Button Properties">
                <FormField
                  control={control}
                  name="label"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Button Label</FormLabel>
                      <FormControl>
                        <InputText
                          placeholder="Enter button label"
                          className="w-full"
                          size="sm"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="color"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Style</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a button style" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {buttonStyles.map((style) => (
                            <SelectItem
                              key={style.value}
                              value={style.value}
                              showIndicator={false}
                            >
                              {style.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </FormRow>
              <FormRow heading="Button Action">
                <FormField
                  control={control}
                  name="actionType"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Button Action</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a button style" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {buttonActions.map((action) => (
                            <SelectItem
                              key={action.value}
                              value={action.value}
                              showIndicator={false}
                              className="pl-4"
                            >
                              <div className="flex gap-2 items-center">
                                <action.icon width="1rem" height="1rem" />
                                {action.label}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                <div className="flex-1">{renderActionLink()}</div>
              </FormRow>
            </div>
            <DialogFooter>
              <Button
                variant="dark"
                type="submit"
                disabled={!formState.isDirty || !actionType}
              >
                Apply Changes
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Form>
    </Dialog>
  );
};

const FormRow = ({ heading, children }: PropsWithChildren<FormRowProps>) => {
  return (
    <div>
      <p className="text-sm font-bold mb-4">{heading}</p>
      <div className="flex gap-6 mb-3.5">{children}</div>
      <Separator />
    </div>
  );
};
