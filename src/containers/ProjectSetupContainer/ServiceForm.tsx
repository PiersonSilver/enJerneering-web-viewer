"use client";

import { ConnectForm } from "@builderComponents/form/ConnectForm";
import {
  FileUploadInput,
  FileUploadInputDropzone,
  FileUploadInputFallback,
  FileUploadInputPreview,
} from "@builderComponents/form/FileUploadField";
import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
  MultiSelectorValues,
} from "@builderComponents/form/MultiSelectField";
import { Badge } from "@builderComponents/ui/Badge";
import { ImagePreview } from "@builderComponents/ui/FileUpload";
import { zodResolver } from "@hookform/resolvers/zod";
import { CloseIcon, UploadIcon } from "../../assets/icons";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@internalComponents/FormField";
import { InputText, InputTextarea } from "@internalComponents/Input";
import { serviceAreas } from "@mock/data";
import { ServiceArea, ServiceInfo, serviceSchema } from "@schema/projectSetup";
import { PropsWithChildren } from "react";
import {
  SubmitHandler,
  useForm,
  useFormContext,
  UseFormReset,
} from "react-hook-form";

export type ServiceFormProps = {
  defaultValues?: Partial<ServiceInfo>;
};

export type ServiceFormContentProps = {
  onSubmit: SubmitHandler<ServiceInfo>;
};

export const ServiceConnectForm = ConnectForm<ServiceInfo>;

export const ServiceFormProvider = ({
  defaultValues,
  children,
}: PropsWithChildren<ServiceFormProps>) => {
  const serviceForm = useForm<ServiceInfo>({
    defaultValues,
    resolver: zodResolver(serviceSchema),
  });

  return <Form {...serviceForm}>{children}</Form>;
};
ServiceFormProvider.displayName = "ServiceForm";

export const ServiceFormContent = ({ onSubmit }: ServiceFormContentProps) => {
  const serviceForm = useFormContext<ServiceInfo>();

  const { handleSubmit, control } = serviceForm;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-20">
      <div className="space-y-4">
        <h5 className="font-bold text-lg">Service Details</h5>
        <FormField
          name="name"
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Service name</FormLabel>
              <FormControl>
                <InputText
                  placeholder="Your service name"
                  {...field}
                  className="w-full"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="description"
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <InputTextarea
                  placeholder="Enter description"
                  minRows={6}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="serviceArea"
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Service Area</FormLabel>
              <FormControl>
                <MultiSelector
                  values={field.value}
                  onValuesChange={field.onChange}
                >
                  <MultiSelectorTrigger>
                    <MultiSelectorInput placeholder="Search and select area" />
                  </MultiSelectorTrigger>
                  <MultiSelectorContent>
                    <MultiSelectorList>
                      {serviceAreas.map((area) => (
                        <MultiSelectorItem value={area} key={area.abbreviation}>
                          {area.name}
                        </MultiSelectorItem>
                      ))}
                    </MultiSelectorList>
                  </MultiSelectorContent>
                  <MultiSelectorValues<ServiceArea> className="py-0">
                    {({ value, onRemove }) => (
                      <Badge>
                        <span className="text-xs">{value.name}</span>
                        <CloseIcon
                          onClick={onRemove}
                          width="1rem"
                          height="1rem"
                        />
                      </Badge>
                    )}
                  </MultiSelectorValues>
                </MultiSelector>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="space-y-4">
        <h5 className="font-bold text-lg">Image</h5>
        <FormField
          control={control}
          name="images"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base">Upload Service Images</FormLabel>
              <FormControl>
                <FileUploadInput
                  {...field}
                  value={field.value}
                  onChange={field.onChange}
                >
                  <FileUploadInputDropzone>
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
  );
};
