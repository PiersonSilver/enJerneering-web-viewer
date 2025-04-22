import React, { Fragment, useMemo, useRef } from "react";
import {
  FileUploadDropzoneProps,
  FileUploadFallbackProps,
  FileUploadPreviewProps,
  RenderPreviewItemProps,
} from "./type";
import { FileUploadProvider, useFileUploadContext } from "./store";
import { twMerge } from "tailwind-merge";
import { UploadedFile } from "@schema/file";
import { Button } from "@internalComponents/Button";
import { TrashMinusOutlineIcon } from "../../../../src/assets/icons";
import Image from "next/image";
import { getFileExtension } from "@utils/file";
import _unionWith from "lodash/unionWith";

const FileUploadDropzone = ({
  children,
  className,
}: FileUploadDropzoneProps) => {
  const { name, inputRef, disabled, getRootProps, getInputProps } =
    useFileUploadContext();

  return (
    <div
      className={twMerge(
        "flex flex-col gap-2 justify-center items-center h-[160px] border-2 border-dashed",
        "border-neutral-300 bg-neutral-100 text-neutral-700 rounded-2xl transition-colors cursor-pointer",
        !disabled && "hover:border-neutral-400 hover:bg-neutral-200",
        disabled && "cursor-default opacity-60",
        className
      )}
      {...getRootProps()}
    >
      <input {...getInputProps({ name })} ref={inputRef} />
      {children}
    </div>
  );
};

const FileUploadFallback = ({
  children,
  className,
}: FileUploadFallbackProps) => {
  return (
    <div className={twMerge("flex flex-col gap-2 items-center", className)}>
      {children}
    </div>
  );
};

const FileUploadPreview = React.memo(
  ({ children, className }: FileUploadPreviewProps) => {
    const { localFiles, uploadedFiles, uploadState, removeFile } =
      useFileUploadContext();

    const filesLocalURL = useRef<Record<string, string>>({});

    const previewFiles = useMemo<UploadedFile[]>(() => {
      const localPreviews: UploadedFile[] = localFiles.map((file) => {
        if (!filesLocalURL.current[file.name]) {
          filesLocalURL.current[file.name] = URL.createObjectURL(file);
        }

        const localUrl = filesLocalURL.current[file.name];

        return {
          name: file.name,
          type: file.type,
          url: localUrl,
          size: file.size,
          thumbUrl: localUrl,
        };
      });

      const uniqueFiles = _unionWith(
        localPreviews,
        uploadedFiles,
        (a, b) => a.name === b.name
      );

      return uniqueFiles;
    }, [localFiles, uploadedFiles]);

    return (
      <div className={twMerge("flex flex-col gap-2", className)}>
        {previewFiles.map((file) => (
          <Fragment key={file.name}>
            {children({
              onRemove: removeFile,
              status: uploadState[file.name],
              file,
            })}
          </Fragment>
        ))}
      </div>
    );
  }
);
FileUploadPreview.displayName = "FileUploadPreview";

export const ImagePreview = ({
  onRemove,
  status,
  file,
}: RenderPreviewItemProps) => {
  const isUploading = status === "uploading";
  const fileExt = getFileExtension(file.name);
  const fileName = file.name.replace(fileExt, "");

  return (
    <div
      className={twMerge(
        "flex items-center justify-between gap-8 p-4 border-b border-neutral-200",
        isUploading && "opacity-80"
      )}
    >
      <div className="relative w-30 h-16 rounded overflow-hidden">
        <Image
          src={file.thumbUrl ?? file.url}
          alt={file.name}
          fill
          sizes=""
          className="object-cover"
        />
      </div>
      <div className="flex-1 flex gap-0 text-sm font-normal">
        <span className="whitespace-pre-line break-all line-clamp-1">
          {fileName}
        </span>
        <span>.{fileExt}</span>
      </div>
      <div>
        <Button
          icon={<TrashMinusOutlineIcon width="1.25rem" height="1.25rem" />}
          variant="soft"
          size="sm"
          onClick={() => onRemove(file.name)}
          disabled={isUploading}
        />
      </div>
    </div>
  );
};
ImagePreview.displayName = "ImagePreview";

export {
  FileUploadProvider,
  FileUploadDropzone,
  FileUploadFallback,
  FileUploadPreview,
};
