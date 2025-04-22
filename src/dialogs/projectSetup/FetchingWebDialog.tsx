"use client";

import { useDialog } from "@/_stores/dialogStore";
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
import { BounceLoaderGIF } from "../../assets/images";
import Image from "next/image";

export type FetchingWebDialogProps = {
  onCancel: () => void;
};

export const FetchingWebDialog = () => {
  const { payload, close, isOpen } =
    useDialog<FetchingWebDialogProps>("fetchingWeb");

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent
        className="rounded-2xl"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader className="border-b-0">
          <DialogTitle>Fetching data from your website</DialogTitle>
          <DialogDescription>Please wait for a moment</DialogDescription>
        </DialogHeader>
        <div className="py-3">
          <Image
            src={BounceLoaderGIF}
            width={100}
            height={100}
            alt="loading"
            className="mx-auto"
          />
        </div>
        <DialogFooter className="border-t-0">
          <DialogClose asChild>
            <Button
              label="Cancel"
              variant="outline"
              onClick={payload?.data?.onCancel}
            />
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
