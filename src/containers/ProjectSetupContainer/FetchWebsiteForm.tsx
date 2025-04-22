"use client";

import { InputText } from "@internalComponents/Input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@internalComponents/FormField";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { StepperFooterPortal } from "./elements/StepFooter";
import { Button } from "@internalComponents/Button";
import { ArrowRightSmallIcon, CheckCircleIcon } from "../../assets/icons";
import { useDialog } from "@/_stores/dialogStore";
import { FetchingWebDialogProps } from "../../dialogs/projectSetup/FetchingWebDialog";
import { enqueueSnackbar } from "notistack";
import {
  defaultFetchWebInfo,
  FetchWebInfo,
  fetchWebSchema,
} from "@schema/projectSetup";
import { zodResolver } from "@hookform/resolvers/zod";
import { useProjectSetupStore } from "@stores/projectSetupStore";
import { PROJECT_SETUP_VIEWS } from "@stores/projectSetupStore/enum";
import { mockProjectInfo } from "@mock/data";
import { ProjectSetupHeader } from "./elements";

const FetchWebsiteForm: React.FC = () => {
  const pushView = useProjectSetupStore((state) => state.pushView);
  const setData = useProjectSetupStore((state) => state.setData);
  const { open, close } = useDialog<FetchingWebDialogProps>("fetchingWeb");
  const useFormReturn = useForm({
    mode: "onChange",
    defaultValues: defaultFetchWebInfo,
    resolver: zodResolver(fetchWebSchema),
  });

  const { control, handleSubmit } = useFormReturn;

  const onContinueWithoutWebsite = () => {
    pushView(0, PROJECT_SETUP_VIEWS.PROJECT_DATA_FROM);
  };

  const onStartFetchWebError: SubmitErrorHandler<FetchWebInfo> = (errors) => {
    const message = errors.webUrl?.message;

    enqueueSnackbar({
      variant: "error",
      title: "Invalid URL",
      message,
    });
  };

  const handleOpenFetchingWeb: SubmitHandler<FetchWebInfo> = (values) => {
    const mockTimeout = setTimeout(() => {
      close();
      pushView(1, PROJECT_SETUP_VIEWS.PRE_PROJECT_DATA_FORM);
      setData("projectInfo", mockProjectInfo);

      enqueueSnackbar({
        variant: "success",
        title: "Data pre-populated.",
        message:
          "We have pre-populated the fields with fetched data. Please review and complete all required fields.",
      });
      enqueueSnackbar({
        variant: "error",
        title: "Website Inaccessible",
        message:
          "Unable to access. Please ensure the URL is correct and the site is live.",
      });
    }, 2000);

    open({
      id: "fetchingWeb",
      data: {
        onCancel: () => {
          //TODO: cancel fetching website
          clearTimeout(mockTimeout);
        },
      },
    });
  };

  return (
    <div className="flex flex-col gap-10">
      <ProjectSetupHeader
        heading="Do you have an existing website?"
        subHeading="By entering your website, we will help you to hasten your setup time."
      />

      <form
        action="#"
        method="POST"
        className="flex flex-col gap-6 mt-6"
        onSubmit={handleSubmit(handleOpenFetchingWeb, onStartFetchWebError)}
      >
        <div className="flex flex-col gap-2.5">
          <Form {...useFormReturn}>
            <FormField
              control={control}
              name="webUrl"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>
                    <div className="flex items-center text-base">
                      Website URL
                    </div>
                  </FormLabel>
                  <div className="relative">
                    <FormControl>
                      <InputText
                        placeholder="Enter your existing website URL"
                        className="w-full"
                        size="lg"
                        {...field}
                      />
                    </FormControl>
                    {useFormReturn.formState.isValid && (
                      <CheckCircleIcon
                        width="1.25rem"
                        height="1.25rem"
                        className="text-success-600 absolute right-5 top-1/2 -translate-y-1/2"
                      />
                    )}
                  </div>
                </FormItem>
              )}
            />
          </Form>
        </div>
        <StepperFooterPortal>
          <Button
            variant="outline"
            label="Continue Without Existing Website"
            onClick={onContinueWithoutWebsite}
          />
          <Button
            variant="primary"
            icon={<ArrowRightSmallIcon width="1.5rem" height="1.5rem" />}
            label="Fetch Data"
            iconPos="right"
            onClick={handleSubmit(handleOpenFetchingWeb, onStartFetchWebError)}
          />
        </StepperFooterPortal>
      </form>
    </div>
  );
};

export default FetchWebsiteForm;
