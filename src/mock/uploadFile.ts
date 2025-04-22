import { UploadedFile } from "@schema/file";

export const mockUploadFile = (file: File): Promise<UploadedFile> => {
  return new Promise((resolve) => {
    const url = URL.createObjectURL(file);

    setTimeout(() => {
      resolve({
        name: file.name,
        size: file.size,
        type: file.type,
        url,
        thumbUrl: url,
      });
    }, 0);
  });
};
