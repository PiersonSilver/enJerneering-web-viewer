"use client";

import { Button } from "@internalComponents/Button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@internalComponents/Dialog";
import { InputText } from "@internalComponents/Input";
import {
  Select,
  SelectPrimitiveItem,
  SelectPrimitiveText,
  SelectTrigger,
  SelectValue,
  SelectPrimitiveViewport,
  SelectPrimitiveContent,
} from "@internalComponents/Select";
import { ChangeEventHandler, useEffect, useMemo, useState } from "react";
import { twJoin } from "tailwind-merge";
import _filter from "lodash/filter";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@internalComponents/FormField";
import { useDialog } from "@/_stores/dialogStore";
import { Social } from "@components/Footer/types/FooterData";
import { zodResolver } from "@hookform/resolvers/zod";
import { v4 as uuidv4 } from "uuid";
import {
  defaultValues,
  SocialMediaSchema,
  socialMediaSchema,
} from "@schema/builder/socialMedia";

interface SocialMediaPayloadBase {
  onChange: (social: Social) => void;
}

interface UpdateSocialMediaPayload extends SocialMediaPayloadBase {
  mode: "update";
  social: Social;
}

interface CreateSocialMediaPayload extends SocialMediaPayloadBase {
  mode: "create";
}

export type SocialMediaDialogPayload =
  | CreateSocialMediaPayload
  | UpdateSocialMediaPayload;

export const SocialMediaDialog = () => {
  const [searchValue, setSearchValue] = useState("");

  const { isOpen, payload, close } =
    useDialog<SocialMediaDialogPayload>("socialMediaItems");

  const socialForm = useForm({
    defaultValues,
    resolver: zodResolver(socialMediaSchema),
  });

  const [icons] = useState<Option[]>([
    {
      value: "pi-facebook",
      label: "Facebook",
    },
    {
      value: "pi-instagram",
      label: "Instagram",
    },
    {
      value: "pi-linkedin",
      label: "Linkedin",
    },
    {
      value: "pi-github",
      label: "Github",
    },
  ]);

  const { control, handleSubmit, reset } = socialForm;

  const displayIcons = useMemo(
    () =>
      _filter(icons, function (icon) {
        return icon.value.toLowerCase().includes(searchValue.toLowerCase());
      }),
    [icons, searchValue]
  );

  const onSearch: ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearchValue(e.target.value);
  };

  const onSubmit: SubmitHandler<SocialMediaSchema> = (values) => {
    const { data } = payload;

    if (data && data.mode === "update") {
      const { social, onChange } = data;
      onChange({ ...social, ...values });
    } else if (data?.mode === "create") {
      payload.data?.onChange({
        id: uuidv4(),
        ...values,
        name: "",
      });
    }

    close();
  };

  useEffect(() => {
    const mode = payload?.data?.mode;

    if (!isOpen) {
      return;
    }

    if (mode === "create") {
      reset(defaultValues);
    }

    if (mode === "update") {
      reset(payload.data?.social);
    }
  }, [isOpen, payload, reset]);

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="rounded-xl">
        <Form {...socialForm}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Add Social Media Item</DialogTitle>
            </DialogHeader>
            <div className="p-6 space-y-5">
              <FormField
                control={control}
                name="icon"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Social Channel</FormLabel>
                    <FormControl>
                      <Select
                        defaultValue={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select social icon" />
                        </SelectTrigger>
                        <SelectPrimitiveContent>
                          <div className="p-4 pb-2">
                            <div className="input-icon-right">
                              <InputText
                                size="sm"
                                className="w-full"
                                placeholder="Search"
                                onChange={onSearch}
                              />
                              <i className="pi pi-search" />
                            </div>
                          </div>
                          <SelectPrimitiveViewport className="w-full min-w-[var(--radix-select-trigger-width)]">
                            {displayIcons.map(({ label, value }) => (
                              <SelectPrimitiveItem key={value} value={value}>
                                <SelectPrimitiveText asChild>
                                  <div className="flex items-center gap-2">
                                    <i className={twJoin("pi", value)} />
                                    {label}
                                  </div>
                                </SelectPrimitiveText>
                              </SelectPrimitiveItem>
                            ))}
                          </SelectPrimitiveViewport>
                        </SelectPrimitiveContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="url"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Social Link URL</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <InputText
                          size="sm"
                          className="w-full pl-24.5"
                          placeholder="Search"
                          {...field}
                        />
                        <span className="absolute top-0 left-0 h-full flex items-center px-4 text-sm bg-neutral-200 rounded-l-lg">
                          https://
                        </span>
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" label="Cancel" />
              </DialogClose>
              <DialogClose asChild>
                <Button variant="dark" label="Add Item" type="submit" />
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
