import { useImmer } from "use-immer";
import {
  FileUploadReturnValues,
  FileUploadState,
  UploadFileOptions,
} from "./type";
import { getFilesWithUniqueNames } from "@utils/file";
import { useEffect, useMemo, useRef } from "react";
import _filter from "lodash/filter";
import _findIndex from "lodash/findIndex";
import { mockUploadFile } from "@mock/uploadFile";
import { UploadedFile } from "@schema/file";

const initialState: FileUploadState = {
  localFiles: [],
  uploadedFiles: [],
  uploadFailFiles: [],
  uploadState: {},
};

export const useUploadFiles = ({
  defaultUploaded = [],
  maxUploading = 1,
  onUploadStart,
  onUploadEnd,
  onUploadSuccess,
  onUploadError,
  onRemoveUploadedFile,
}: UploadFileOptions): FileUploadReturnValues => {
  const pendingFiles = useRef<File[]>([]);
  const uploadingFiles = useRef<File[]>([]);
  const [fileUploadState, setFileUploadState] = useImmer<FileUploadState>({
    ...initialState,
    uploadedFiles: defaultUploaded,
  });

  const { localFiles, uploadedFiles, uploadFailFiles, uploadState } =
    fileUploadState;

  const isUploading = useMemo(() => {
    return Object.values(fileUploadState.uploadState).every(
      (status) => status === "uploading"
    );
  }, [fileUploadState.uploadState]);

  const removePendingFile = (fileName: string) => {
    pendingFiles.current = _filter(pendingFiles.current, (file) => {
      return file.name !== fileName;
    });
  };

  const removeUploadingFile = (fileName: string) => {
    uploadingFiles.current = _filter(uploadingFiles.current, (file) => {
      return file.name !== fileName;
    });
  };

  const handleUploadSuccess = (file: UploadedFile) => {
    const { name } = file;

    removePendingFile(name);
    removeUploadingFile(name);
    handleUpload();
    setFileUploadState((draft) => {
      draft.uploadState[name] = "success";
      draft.uploadedFiles.push(file);
    });
  };

  const handleUploadError = (file: File, error: any) => {
    const { name } = file;

    removePendingFile(name);
    removeUploadingFile(name);
    handleUpload();
    setFileUploadState((draft) => {
      draft.uploadState[name] = "error";
      draft.uploadFailFiles.push({ file, error });
    });
  };

  const handleUpload = () => {
    const nextQty = maxUploading - uploadingFiles.current.length;
    const nextFiles = pendingFiles.current.splice(0, nextQty);

    uploadingFiles.current.push(...nextFiles);

    nextFiles.map(async (file) => {
      setFileUploadState((draft) => {
        draft.uploadState[file.name] = "uploading";
      });

      mockUploadFile(file)
        .then((result) => {
          handleUploadSuccess(result);
          onUploadSuccess && onUploadSuccess(result);
        })
        .catch((e) => {
          handleUploadError(file, e);
          onUploadError && onUploadError(file, e);
        });
    });
  };

  const handleRemoveUploadedFile = (fileName: string) => {
    setFileUploadState((draft) => {
      const uploadedFileIndex = _findIndex(draft.uploadedFiles, {
        name: fileName,
      });

      if (uploadedFileIndex >= 0) {
        const file = draft.uploadedFiles[uploadedFileIndex];

        onRemoveUploadedFile && onRemoveUploadedFile(file);
        draft.uploadedFiles.splice(uploadedFileIndex, 1);
      }
    });
  };

  const addFiles = (files: File[]) => {
    const newFiles = getFilesWithUniqueNames(files);

    setFileUploadState((draft) => {
      draft.localFiles.push(...newFiles);

      for (const file of newFiles) {
        draft.uploadState[file.name] = "pending";
      }
    });

    pendingFiles.current.push(...newFiles);
    onUploadStart && onUploadStart();
    handleUpload();
  };

  const removeFile = (fileName: string) => {
    removePendingFile(fileName);
    handleRemoveUploadedFile(fileName);
    setFileUploadState((draft) => {
      draft.localFiles = _filter(
        draft.localFiles,
        (file) => file.name !== fileName
      );

      draft.uploadFailFiles = _filter(
        draft.uploadFailFiles,
        (item) => item.file.name !== fileName
      );

      delete draft.uploadState[fileName];
    });
  };

  useEffect(() => {
    if (!isUploading) {
      onUploadEnd && onUploadEnd(uploadedFiles, uploadFailFiles);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUploading, uploadFailFiles, uploadedFiles]);

  return {
    localFiles,
    uploadedFiles,
    uploadState,
    uploadFailFiles,
    isUploading,
    addFiles,
    removeFile,
  };
};
