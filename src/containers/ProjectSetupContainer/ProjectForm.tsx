import { ConnectForm } from "@builderComponents/form/ConnectForm";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@internalComponents/FormField";
import { InputText, InputTextarea } from "@internalComponents/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@internalComponents/Select";
import { ProjectInfo, projectInfoSchema } from "@schema/projectSetup";
import { PropsWithChildren } from "react";
import {
  FormProvider,
  SubmitHandler,
  useForm,
  useFormContext,
} from "react-hook-form";
import { AskAIPopover } from "@internalComponents/AskAIPopover";
import { CloseIcon, InfoCircleIcon, UploadIcon } from "../../assets/icons";
import { Tooltip } from "@internalComponents/Tooltip";
import { KeywordInput } from "@builderComponents/form/KeywordField";
import {
  FileUploadInput,
  FileUploadInputDropzone,
  FileUploadInputFallback,
  FileUploadInputPreview,
} from "@builderComponents/form/FileUploadField";
import {
  FileUploadPreview,
  ImagePreview,
} from "@builderComponents/ui/FileUpload";
import { Separator } from "@builderComponents/ui/Separator";
import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
  MultiSelectorValues,
} from "@builderComponents/form/MultiSelectField";
import { domainList, serviceAreas } from "@mock/data";
import { Badge } from "@builderComponents/ui/Badge";
import { UploadedFile } from "@schema/file";

type ProjectFormProviderProps = {
  defaultValues: Partial<ProjectInfo>;
};

type ProjectFormContentProps = {
  onSubmit: SubmitHandler<ProjectInfo>;
};

type MockServiceArea = (typeof serviceAreas)[0];

const ProjectConnectForm = ConnectForm<ProjectInfo>;

const ProjectFormProvider = ({
  children,
  defaultValues,
}: PropsWithChildren<ProjectFormProviderProps>) => {
  const useFormReturn = useForm<ProjectInfo>({
    defaultValues,
    resolver: zodResolver(projectInfoSchema),
  });

  return <FormProvider {...useFormReturn}>{children}</FormProvider>;
};

const ProjectFormContent = ({ onSubmit }: ProjectFormContentProps) => {
  const { control, handleSubmit } = useFormContext<ProjectInfo>();

  const handleChangeSingleFile =
    (changeCb: (...evt: any[]) => void) => (files: UploadedFile[]) => {
      changeCb(files.at(0) ?? null);
    };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-6">
        <FormField
          control={control}
          name="title"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel className="text-base">Project Title</FormLabel>
              <FormControl>
                <InputText
                  placeholder="Enter the name of your project (e.g., ''NextGen UI Development'')"
                  className="w-full"
                  size="lg"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          key="pagePath"
          control={control}
          name="domain"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel className="text-base">Domain</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                name={field.name}
              >
                <FormControl>
                  <SelectTrigger className="p-4 h-14 text-base input-lg">
                    <SelectValue placeholder="Select the domain that best describes your project" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {domainList.map((domain, index) => (
                    <SelectItem
                      key={index}
                      value={domain}
                      showIndicator={false}
                      className="pl-4"
                    >
                      {domain}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="description"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel className="text-base">Project Description</FormLabel>
              <FormControl>
                <InputTextarea
                  size="lg"
                  placeholder="Enter Project Description"
                  className="flex-1"
                  minRows={2}
                  maxRows={4}
                  variant="secondary"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="additionalDetails"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel className="text-base">
                Additional Details (Optional)
              </FormLabel>
              <FormControl>
                <InputTextarea
                  size="lg"
                  placeholder="Enter Project Description"
                  className="flex-1"
                  minRows={2}
                  maxRows={4}
                  variant="secondary"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="keywords"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel className="text-base flex items-center gap-2">
                <span>Keywords</span>
                <InfoCircleIcon
                  width="1rem"
                  height="1rem"
                  className="text-neutral-500"
                  id="keywordTooltip"
                />
                <Tooltip
                  content="List the main keywords or phrases associated with your project or utilize AI to extract keywords from your project description."
                  target="#keywordTooltip"
                  position="top"
                  className="max-w-[16.5rem]"
                />
                <AskAIPopover
                  placeholder="Enter keywords separated by commas"
                  onGenerated={(v) => field.onChange([v])}
                />
              </FormLabel>
              <FormControl>
                <KeywordInput
                  placeholder="Enter keywords separated by commas"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Separator />
        <div className="space-y-4">
          <p className="font-bold text-lg">Upload Files</p>
          <div className="grid grid-cols-2 gap-10">
            <FormField
              control={control}
              name="organizationLogo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">
                    Upload Your Organization Logo
                  </FormLabel>
                  <FormControl>
                    <FileUploadInput
                      {...field}
                      multiple={false}
                      value={[field.value].filter((file) => !!file)}
                      onChange={handleChangeSingleFile(field.onChange)}
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
            <FormField
              control={control}
              name="thumbnail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">
                    Upload Project Thumbnail
                  </FormLabel>
                  <FormControl>
                    <FileUploadInput
                      {...field}
                      multiple={false}
                      value={[field.value].filter((file) => !!file)}
                      onChange={handleChangeSingleFile(field.onChange)}
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
        </div>
        <Separator />
        <div className="space-y-4">
          <p className="font-bold text-lg">Service Area</p>
          <FormField
            control={control}
            name="serviceArea"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">Service Area</FormLabel>
                <FormControl>
                  <MultiSelector<MockServiceArea>
                    values={field.value}
                    onValuesChange={field.onChange}
                  >
                    <MultiSelectorTrigger>
                      <MultiSelectorInput
                        size="lg"
                        placeholder="Search and select area"
                      />
                    </MultiSelectorTrigger>
                    <MultiSelectorContent>
                      <MultiSelectorList>
                        {serviceAreas.map((area) => (
                          <MultiSelectorItem
                            key={area.abbreviation}
                            value={area}
                          >
                            {area.name}
                          </MultiSelectorItem>
                        ))}
                      </MultiSelectorList>
                    </MultiSelectorContent>
                    <div>
                      <p className="text-base pt-2">Selected Area</p>
                      <MultiSelectorValues<MockServiceArea>>
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
                    </div>
                  </MultiSelector>
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      </div>
    </form>
  );
};

export { ProjectFormProvider, ProjectFormContent, ProjectConnectForm };
