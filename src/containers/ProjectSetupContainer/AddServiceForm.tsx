import { useDialog } from "@/_stores/dialogStore";
import { AddServiceDialogProps } from "../../dialogs/projectSetup/ServiceDialog";
import {
  ArrowLeftSmallIcon,
  ArrowRightSmallIcon,
  PlusIcon,
} from "../../assets/icons";
import { Button } from "@internalComponents/Button";
import { useProjectSetupStore } from "@stores/projectSetupStore";
import { PROJECT_SETUP_VIEWS } from "@stores/projectSetupStore/enum";
import { ProjectSetupHeader, StepperFooterPortal } from "./elements";
import { ServicesTable } from "./ServicesTable";

export const AddServiceForm = () => {
  const pushView = useProjectSetupStore((state) => state.pushView);
  const popView = useProjectSetupStore((state) => state.popView);
  const addService = useProjectSetupStore((state) => state.addService);
  const { open } = useDialog<AddServiceDialogProps>("addService");

  const next = () => {
    pushView(2, PROJECT_SETUP_VIEWS.WEB_INFO_FORM);
  };

  const onContinue = () => {
    next();
  };

  const onOpenAddServiceDialog = () => {
    open({ id: "addService", data: { onAddService: addService } });
  };

  return (
    <div>
      <ProjectSetupHeader
        heading="Add Services"
        subHeading="Your product type helps determine which settings and features are available."
      />
      <div className="mt-10 mb-6">
        <ServicesTable />
      </div>
      <Button
        icon={<PlusIcon width="1.5rem" height="1.5rem" />}
        label="Add Service"
        variant="dark"
        className="w-full"
        onClick={onOpenAddServiceDialog}
        size="xl"
      />

      <StepperFooterPortal>
        <Button
          variant="outline"
          label="Back"
          onClick={popView}
          className="mr-auto"
          icon={<ArrowLeftSmallIcon width="1.5rem" height="1.5rem" />}
        />
        <Button variant="outline" label="Skip for now" onClick={next} />
        <Button
          variant="primary"
          icon={<ArrowRightSmallIcon width="1.5rem" height="1.5rem" />}
          label="Continue"
          iconPos="right"
          onClick={onContinue}
        />
      </StepperFooterPortal>
    </div>
  );
};
