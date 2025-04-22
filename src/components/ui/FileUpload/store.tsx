"use client";

import { createContext, PropsWithChildren, useContext } from "react";
import { FileUploadContextValues, FileUploadStoreData } from "./type";

const FileUploadContext = createContext<FileUploadContextValues>(null);

export const FileUploadProvider = ({
  children,
  ...values
}: PropsWithChildren<FileUploadStoreData>) => {
  return (
    <FileUploadContext.Provider value={values}>
      {children}
    </FileUploadContext.Provider>
  );
};

export const useFileUploadContext = () => {
  const context = useContext(FileUploadContext);

  if (!context) {
    throw new Error(
      "useFileUploadContext must be used within FileUploadProvider!"
    );
  }

  return context;
};
