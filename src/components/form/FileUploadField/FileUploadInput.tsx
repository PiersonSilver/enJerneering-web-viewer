import {
  FileUploadDropzone,
  FileUploadFallback,
  FileUploadPreview,
  FileUploadProvider,
} from "@builderComponents/ui/FileUpload";
import { UploadFileOptions } from "@builderComponents/ui/FileUpload/type";
import { useUploadFiles } from "@builderComponents/ui/FileUpload/useUploadFile";
import { UploadedFile } from "@schema/file";
import { FocusEventHandler, forwardRef, PropsWithChildren } from "react";
import { DropzoneOptions, useDropzone } from "react-dropzone";

type FileUploadInputProps = {
  name: string;
  value: UploadedFile[];
  onChange: (value: UploadedFile[]) => void;
  onBlur?: FocusEventHandler<HTMLInputElement>;
} & DropzoneOptions &
  UploadFileOptions;

const FileUploadInput = forwardRef<
  HTMLInputElement,
  PropsWithChildren<FileUploadInputProps>
>(
  (
    {
      name,
      value = [],
      onBlur,
      onChange,
      onDrop,
      disabled,

      maxUploading,
      onUploadStart,
      onUploadSuccess,
      onUploadError,
      onUploadEnd,
      onRemoveUploadedFile,

      children,

      ...dropzoneOptions
    },
    ref
  ) => {
    const { multiple = true, maxFiles } = dropzoneOptions;
    const isDisabled =
      disabled || (!multiple && !!value.length) || value.length === maxFiles;

    const uploadFileMethods = useUploadFiles({
      defaultUploaded: value,
      maxUploading,
      onUploadStart,
      onUploadSuccess,
      onUploadError,
      onUploadEnd: (uploadedFiles, uploadFailFiles) => {
        onUploadEnd && onUploadEnd(uploadedFiles, uploadFailFiles);
        onChange(uploadedFiles);
      },
      onRemoveUploadedFile: (file) => {
        const uploadedFiles = value.filter(
          (uploadedFile) => uploadedFile.name !== file.name
        );

        onRemoveUploadedFile && onRemoveUploadedFile(file);
        onChange(uploadedFiles);
      },
    });

    const { getInputProps, getRootProps } = useDropzone({
      ...dropzoneOptions,
      onDrop: (acceptedFiles, fileRejections, event) => {
        onDrop && onDrop(acceptedFiles, fileRejections, event);

        //TODO: handle limit multi files

        uploadFileMethods.addFiles(acceptedFiles);
      },
      disabled: isDisabled,
    });

    return (
      <FileUploadProvider
        {...{
          getInputProps,
          getRootProps,
          name,
          inputRef: ref,
          disabled: isDisabled,
        }}
        {...uploadFileMethods}
      >
        {children}
      </FileUploadProvider>
    );
  }
);
FileUploadInput.displayName = "FileUploadInput";

const FileUploadInputDropzone = FileUploadDropzone;

const FileUploadInputFallback = FileUploadFallback;

const FileUploadInputPreview = FileUploadPreview;

export {
  FileUploadInput,
  FileUploadInputDropzone,
  FileUploadInputFallback,
  FileUploadInputPreview,
};
