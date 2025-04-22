import { UploadedFile } from "@schema/file";
import { ForwardedRef, PropsWithChildren, ReactNode } from "react";
import { DropzoneState } from "react-dropzone";

export type FileUploadDropzoneProps = PropsWithChildren<PropsWithClassName>;

export type FileUploadFallbackProps = PropsWithChildren<PropsWithClassName>;

export type RenderPreviewItemProps = {
  onRemove: (fileName: string) => void;
  status: FileUploadStatus;
  file: UploadedFile;
};

export type RenderPreviewItemFn = (props: RenderPreviewItemProps) => ReactNode;

export type FileUploadPreviewProps = PropsWithClassName<{
  children: RenderPreviewItemFn;
}>;

export type UploadFailFile = {
  file: File;
  error: any;
};

export type FileUploadStatus = "success" | "error" | "pending" | "uploading";

export type FileUploadState = {
  localFiles: File[];
  uploadedFiles: UploadedFile[];
  uploadFailFiles: UploadFailFile[];
  uploadState: Record<string /* file name */, FileUploadStatus>;
};

export type FileUploadReturnValues = {
  isUploading: boolean;
  addFiles: (files: File[]) => void;
  removeFile: (fileName: string) => void;
} & FileUploadState;

export type UploadFileOptions = {
  defaultUploaded?: UploadedFile[];
  maxUploading?: number;
  onRemoveUploadedFile?: (removedFile: UploadedFile) => void;
  onUploadStart?: () => void;
  onUploadSuccess?: (result: UploadedFile) => void;
  onUploadError?: (file: File, error: any) => void;
  onUploadEnd?: (
    uploadedFiles: UploadedFile[],
    uploadFailFiles: UploadFailFile[]
  ) => void;
};

export type FileUploadStoreData = {
  shouldHideFallback?: boolean;
  name?: string;
  inputRef?: ForwardedRef<HTMLInputElement>;
  disabled?: boolean;
} & FileUploadReturnValues &
  Pick<DropzoneState, "getInputProps" | "getRootProps">;

export type FileUploadContextValues = FileUploadStoreData | null;
