"use client";

import { PageHeading } from "@workspace/_elements/PageHeader";
import Stepper from "@internalComponents/Stepper/Stepper";
import { useProjectSetupStore } from "@stores/projectSetupStore";
import ProjectDataForm from "./ProjectDataForm";
import FetchWebsiteForm from "./FetchWebsiteForm";
import { ScrollArea } from "@internalComponents/ScrollArea";
import { PROJECT_SETUP_VIEWS } from "@stores/projectSetupStore/enum";
import PreProjectDataForm from "./PreProjectDataForm";
import { AddServiceForm } from "./AddServiceForm";
import { StepFooter } from "./elements";
import { WebsiteInformationForm } from "./WebInformationForm";

const getStepView = (view: PROJECT_SETUP_VIEWS) => {
  switch (view) {
    case PROJECT_SETUP_VIEWS.FETCH_WEBSITE_FORM:
      return <FetchWebsiteForm />;
    case PROJECT_SETUP_VIEWS.PROJECT_DATA_FROM:
      return <ProjectDataForm />;
    case PROJECT_SETUP_VIEWS.PRE_PROJECT_DATA_FORM:
      return <PreProjectDataForm />;
    case PROJECT_SETUP_VIEWS.ADD_SERVICES_FORM:
      return <AddServiceForm />;
    case PROJECT_SETUP_VIEWS.WEB_INFO_FORM:
      return <WebsiteInformationForm />;
    default:
      return <FetchWebsiteForm />;
  }
};

const steps = [
  "Getting Started",
  "Project Initialization",
  "Website Information",
];

export const ProjectSetup = () => {
  const activeStep = useProjectSetupStore((state) => state.activeStep);
  const activeView = useProjectSetupStore((state) => state.activeView);

  return (
    <div className="flex flex-col gap-6 max-h-full h-full">
      <PageHeading>Create New Website</PageHeading>
      <div className="flex-1 flex flex-col overflow-hidden">
        <ScrollArea className="flex-1 relative bg-neutral-50 rounded-t-2xl">
          <div className="mx-auto w-full max-w-[640px] pt-8 pb-10">
            <div className="flex flex-col gap-10 pt-8">
              <Stepper {...{ activeStep, steps }} />
              <div>{getStepView(activeView)}</div>
            </div>
          </div>
        </ScrollArea>
        <StepFooter />
      </div>
    </div>
  );
};
