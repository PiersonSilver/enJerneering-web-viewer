import { useDialog } from "@/_stores/dialogStore";
import {
  Gallery,
  GalleryProvider,
  useGallery,
} from "@builderComponents/ui/Gallery";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@builderComponents/ui/Table";
import { EditServiceDialogProps } from "../../dialogs/projectSetup/ServiceDialog/EditServiceDialog";
import { EditIcon, TrashMinusOutlineIcon } from "../../assets/icons";
import { EmptyServicesIllus } from "../../assets/illustrations";
import { Button } from "@internalComponents/Button";
import { ServiceInfo } from "@schema/projectSetup";
import { useProjectSetupStore } from "@stores/projectSetupStore";
import _slice from "lodash/slice";
import Image from "next/image";

import { useMemo } from "react";
import { twMerge } from "tailwind-merge";

export const ServicesTable = () => {
  const services = useProjectSetupStore((state) => state.data.services);

  if (!services.length) {
    return (
      <div className="flex justify-center">
        <EmptyServicesIllus width="15rem" height="12rem" />
      </div>
    );
  }

  return (
    <GalleryProvider>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-50">Services Name</TableHead>
            <TableHead>Image</TableHead>
            <TableHead className="text-center w-20">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {services.map((service) => (
            <ServiceRow {...service} key={service._id} />
          ))}
        </TableBody>
      </Table>
      <Gallery />
    </GalleryProvider>
  );
};

type ServiceRowProps = ServiceInfo;

const ServiceRow = (props: ServiceRowProps) => {
  const { name, images, _id } = props;

  const { open } = useDialog<EditServiceDialogProps>("editService");
  const editService = useProjectSetupStore((state) => state.editService);
  const removeService = useProjectSetupStore((state) => state.removeService);
  const openGallery = useGallery((state) => state.openGallery);

  const imagesToShow = useMemo(() => _slice(images, 0, 3), [images]);
  const fourthImage = images.at(3);
  const moreQty = images.length - 4;

  const onOpenEditServiceDialog = () => {
    open({
      id: "editService",
      data: {
        onEditService: editService,
        defaultValues: props,
      },
    });
  };

  return (
    <TableRow>
      <TableCell className="align-top">{name}</TableCell>
      <TableCell>
        <div className="flex gap-2 relative">
          {imagesToShow.map((img, idx) => (
            <div
              key={img.name}
              className="flex-shrink-0 w-30 h-16 rounded overflow-hidden cursor-pointer"
              onClick={() => openGallery(idx, images)}
            >
              <Image
                src={img.thumbUrl ?? img.url}
                width={120}
                height={64}
                alt={name}
                className="object-cover"
              />
            </div>
          ))}
          {fourthImage && (
            <div
              key={fourthImage.name}
              className="flex-shrink-0 w-30 h-16 rounded overflow-hidden relative cursor-pointer"
              onClick={() => openGallery(3, images)}
            >
              <Image
                src={fourthImage.thumbUrl ?? fourthImage.url}
                width={120}
                height={64}
                alt={name}
                className={twMerge(
                  "object-cover",
                  moreQty > 0 && "brightness-50"
                )}
              />

              <span
                hidden={moreQty <= 0}
                className="font-bold text-xl absolute text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              >
                {moreQty}+
              </span>
            </div>
          )}
        </div>
      </TableCell>
      <TableCell className="flex gap-2 justify-center">
        <Button
          variant="soft"
          size="xs"
          icon={<EditIcon width="1.25rem" height="1.25rem" />}
          onClick={onOpenEditServiceDialog}
          className="text-neutral-700"
        />
        <Button
          variant="soft"
          size="xs"
          icon={<TrashMinusOutlineIcon width="1.25rem" height="1.25rem" />}
          onClick={() => removeService(_id)}
          className="text-neutral-700"
        />
      </TableCell>
    </TableRow>
  );
};
