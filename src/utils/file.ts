import { v4 as uuidv4 } from "uuid";

export const getFilesWithUniqueNames = (files: File[]) => {
  const newFiles = files.map((file) => {
    const fileName = file.name.split(".").join("-" + uuidv4() + ".");
    const newFile = new File([file], fileName, { type: file.type });

    return newFile;
  });

  return newFiles;
};

export const getFileExtension = (filename: string) => {
  var ext = /^.+\.([^.]+)$/.exec(filename);
  return ext == null ? "" : ext[1];
};

export const downloadAsset = async (fileUrl: string, fileName?: string) => {
  const assetRes = await fetch(fileUrl);
  const assetBlob = await assetRes.blob();
  const blobURL = URL.createObjectURL(assetBlob);
  const a = document.createElement("a");

  a.href = blobURL;
  a.className = "hidden";
  a.download = fileName ?? fileUrl;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(blobURL);
};
