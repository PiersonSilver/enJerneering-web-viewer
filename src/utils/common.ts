export const isValidNodeElement = (obj: any): obj is Node => {
  if (obj === null || obj === undefined) {
    return false;
  }

  return typeof obj.nodeType === "number" && obj.nodeType === Node.ELEMENT_NODE;
};
