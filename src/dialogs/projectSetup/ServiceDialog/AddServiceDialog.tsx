"use client";

import { useDialog } from "@/_stores/dialogStore";
import {
  ServiceConnectForm,
  ServiceFormContent,
  ServiceFormProvider,
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
import { defaultServiceInfo, ServiceInfo } from "@schema/projectSetup";
import { SubmitHandler } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

export type AddServiceDialogProps = {
  onAddService: (service: ServiceInfo) => void;
};

export const AddServiceDialog = () => {
  const { payload, close, isOpen } =
    useDialog<AddServiceDialogProps>("addService");

  const onSubmit: SubmitHandler<ServiceInfo> = (values) => {
    const onAddService = payload.data?.onAddService;

    onAddService && onAddService(values);
    close();
  };

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent
        className="rounded-2xl max-w-[67.5rem] flex flex-col"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <ServiceFormProvider
          defaultValues={{ ...defaultServiceInfo, _id: uuidv4() }}
        >
          <DialogHeader>
            <DialogTitle>Add Service</DialogTitle>
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
                  label="Add Service"
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
