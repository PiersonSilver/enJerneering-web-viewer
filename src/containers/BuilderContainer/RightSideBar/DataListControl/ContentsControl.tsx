import { Button } from "@internalComponents/Button";
import { DataItemControl } from "./DataItemControl";
import { withDataListControl } from "./withDataListControl";
import Image from "next/image";
import React from "react";

export const ContentsControl = withDataListControl(
  ({ data, onAdd, onArrange, onItemChange, onRemove }) => {
    return (
      <div className="space-y-4 mb-4">
        {data.map((item, index) => (
          <DataItemControl
            key={index}
            index={index}
            label={`Content ${index + 1}`}
            onArrange={onArrange}
            onRemove={onRemove}
            onChange={onItemChange}
            Icon={RenderIcon}
            {...item}
          />
        ))}
        <Button label="Add Content" onClick={onAdd} variant="outline" />
      </div>
    );
  }
);

const RenderIcon = () => {
  return (
    <Image
      src="/img/check-circle.svg"
      width={20}
      height={20}
      alt="check-icon"
    />
  );
};
