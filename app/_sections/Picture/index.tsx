import React from "react";
import { PictureData } from "../Picture/types/PictureData";
import PictureType from "./_Picture";

interface PictureProps {
  type: number;
  data: PictureData;
}

const Picture: React.FC<PictureProps> = ({ type, data }) => {
  const renderPictureComponent = (type: number) => {
    switch (type) {
      case 1:
        return <PictureType data={data} />;
      default:
        throw new Error(`Picture type ${type} is not supported`);
    }
  };

  return <>{renderPictureComponent(type)}</>;
};

export default Picture;
