"use client";

import { useDialog } from "@/_stores/dialogStore";
import {
  ServiceFormProvider,
  ServiceFormContent,
  ServiceConnectForm,
} from "../../../containers/ProjectSetupContainer/ServiceForm";
import { ArrowRightSmallIcon } from "../../../assets/icons";
import { Button } from "@internalComponents/Button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@internalComponents/Dialog";
import { ScrollArea } from "@internalComponents/ScrollArea";
import { ServiceInfo } from "@schema/projectSetup";
import { SubmitHandler } from "react-hook-form";

export type EditServiceDialogProps = {
  onEditService: (service: ServiceInfo) => void;
  defaultValues: ServiceInfo;
};

export const EditServiceDialog = () => {
  const { payload, close, isOpen } =
    useDialog<EditServiceDialogProps>("editService");

  const { onEditService, defaultValues } = payload?.data ?? {};

  const onSubmit: SubmitHandler<ServiceInfo> = (values) => {
    onEditService && onEditService(values);
    close();
  };

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent
        className="rounded-2xl max-w-[67.5rem] flex flex-col"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <ServiceFormProvider defaultValues={defaultValues}>
          <DialogHeader>
            <DialogTitle>Edit Service</DialogTitle>
            <DialogDescription>
              Filled in the fields and upload image for your service
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="flex-1 max-h-[50vh]">
            <div className="p-6">
              <ServiceFormContent onSubmit={onSubmit} />
            </div>
          </ScrollArea>
          <ServiceConnectForm>
            {({ handleSubmit }) => (
              <DialogFooter>
                <DialogClose asChild>
                  <Button label="Cancel" variant="outline" />
                </DialogClose>
                <Button
                  label="Edit Service"
                  variant="dark"
                  iconPos="right"
                  onClick={handleSubmit(onSubmit)}
                  icon={
                    <ArrowRightSmallIcon width="1.25rem" height="1.25rem" />
                  }
                />
              </DialogFooter>
            )}
          </ServiceConnectForm>
        </ServiceFormProvider>
      </DialogContent>
    </Dialog>
  );
};
