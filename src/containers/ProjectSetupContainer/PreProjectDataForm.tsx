"use client";

import React from "react";
import { SubmitErrorHandler, SubmitHandler } from "react-hook-form";
import { ArrowLeftSmallIcon, ArrowRightSmallIcon } from "../../assets/icons";
import { ProjectInfo } from "@schema/projectSetup";
import { Button } from "@internalComponents/Button";
import { useProjectSetupStore } from "@stores/projectSetupStore";
import { PROJECT_SETUP_VIEWS } from "@stores/projectSetupStore/enum";
import { ProjectSetupHeader, StepperFooterPortal } from "./elements";
import {
  ProjectConnectForm,
  ProjectFormContent,
  ProjectFormProvider,
} from "./ProjectForm";
import { enqueueSnackbar } from "notistack";

const PreProjectDataForm: React.FC = () => {
  const setData = useProjectSetupStore((state) => state.setData);
  const popView = useProjectSetupStore((state) => state.popView);
  const pushView = useProjectSetupStore((state) => state.pushView);
  const projectInfo = useProjectSetupStore((state) => state.data.projectInfo);

  // Pierson Silver - Add Success Popup for user
    const onSubmitProjectForm: SubmitHandler<ProjectInfo> = (values) => {
      setData("projectInfo", values);
      pushView(1, PROJECT_SETUP_VIEWS.ADD_SERVICES_FORM);
  
      enqueueSnackbar({
        variant: "success",
        title: "Data Saved",
        message: "Your Project Info has been received successfully",
      });
    };
  
    // Pierson Silver - Add SubmitHandle Error Handler to tell user that they have unfilled fields with snackbar
    const onProjectDataSubmitError: SubmitErrorHandler<ProjectInfo> = (errors) => {
      let messages = Object.values(errors)
      .map((error) => error.message)
      .filter(Boolean);
  
      if(messages.includes("Required")){
        messages = messages.filter((message) => message !== "Required");
        messages.push("Missing Photo Upload(s). Please Upload Logo and/or Thumbnail");
      };
  
        enqueueSnackbar({
          variant: "error",
          title: "Form Validation Error",
          message: (
                    <>
                      {messages.map((msg, index) => (
                        <React.Fragment key={index}>
                          {msg}
                          <br />
                        </React.Fragment>
                      ))}
                    </>
                  ),
        });
      };

  return (
    <ProjectFormProvider defaultValues={projectInfo}>
      <div className="space-y-16">
        <ProjectSetupHeader
          heading="Share Your Vision"
          subHeading="This information will serve as the foundation for AI-driven project customization."
        />
        <ProjectFormContent onSubmit={onSubmitProjectForm} />
        <StepperFooterPortal>
          <ProjectConnectForm>
            {({ handleSubmit }) => (
              <>
                <Button
                  variant="outline"
                  label="Previous Step"
                  onClick={popView}
                  icon={<ArrowLeftSmallIcon width="1.5rem" height="1.5rem" />}
                  className="mr-auto"
                />
                <Button
                  variant="primary"
                  icon={<ArrowRightSmallIcon width="1.5rem" height="1.5rem" />}
                  label="Continue"
                  iconPos="right"
                  onClick={handleSubmit(onSubmitProjectForm, onProjectDataSubmitError)}
                />
              </>
            )}
          </ProjectConnectForm>
        </StepperFooterPortal>
      </div>
    </ProjectFormProvider>
  );
};

export default PreProjectDataForm;
