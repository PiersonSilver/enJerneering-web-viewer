import { PlusIcon, TrashMinusOutlineIcon } from "../../../../../assets/icons";
import { Button } from "@internalComponents/Button";

import Image from "next/image";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { twJoin } from "tailwind-merge";

type MediaUploadProps = {
  url?: string;
  onChange: (url?: string) => void;
  tipText: string;
};

export const MediaUpload = ({
  url = "",
  tipText,
  onChange,
}: MediaUploadProps) => {
  const [localUrl, setLocalUrl] = useState<string>("");
  const { getRootProps, getInputProps, open } = useDropzone({
    multiple: false,
    noClick: true,
    noKeyboard: true,
    onDropAccepted(files) {
      handleChange(files[0]);
    },
  });

  const handleChange = (value: File) => {
    const mediaUrl = URL.createObjectURL(value);

    onChange(mediaUrl); //TODO: handle upload
    setLocalUrl(mediaUrl);
  };

  const onRemove = () => {
    onChange();
    URL.revokeObjectURL(localUrl);
    setLocalUrl("");
  };

  return (
    <div className="space-y-4">
      {!url ? (
        <Button
          label="Add"
          icon={<PlusIcon width="1.25rem" height="1.25rem" />}
          variant="dark"
          size="md"
          onClick={open}
        />
      ) : (
        <div className="relative group" {...getRootProps()}>
          <input {...getInputProps()} />
          <div className="p-2 border border-neutral-300 rounded-2xl">
            <Image
              width={336}
              height={144}
              src={url || localUrl}
              alt="media preview"
              className="aspect-[1.91/1] object-cover rounded-lg"
            />
          </div>
          <div
            className={twJoin(
              "absolute inset-0 flex items-center justify-center gap-2 bg-black/60 m-2 rounded-lg",
              "opacity-0 invisible transition-opacity group-hover:opacity-100 group-hover:visible"
            )}
          >
            <Button
              label="Choose Image"
              size="sm"
              variant="secondary"
              onClick={open}
            />
            <Button
              icon={<TrashMinusOutlineIcon width="1.25rem" height="1.25rem" />}
              size="sm"
              variant="secondary"
              className="text-error-600"
              onClick={onRemove}
            />
          </div>
        </div>
      )}
      <p className="text-xs font-semibold text-neutral-500">{tipText}</p>
    </div>
  );
};
