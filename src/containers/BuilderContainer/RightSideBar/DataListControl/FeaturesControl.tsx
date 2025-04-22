import { Button } from "@internalComponents/Button";
import { DataItemControl } from "./DataItemControl";
import { withDataListControl } from "./withDataListControl";
import Image from "next/image";
import React from "react";

export const FeaturesControl = withDataListControl(
  ({ data, onAdd, onArrange, onItemChange, onRemove }) => {
    return (
      <div className="space-y-4 mb-4">
        {data.map((item, index) => (
          <DataItemControl
            key={index}
            index={index}
            label={`Feature ${index + 1}`}
            onArrange={onArrange}
            onRemove={onRemove}
            onChange={onItemChange}
            Icon={RenderIcon}
            {...item}
          />
        ))}
        <Button label="Add Feature" onClick={onAdd} variant="outline" />
      </div>
    );
  }
);

const RenderIcon = () => {
  return (
    <div className="p-1.5 rounded bg-primary-100">
      <Image
        src="/img/corporate-fare.svg"
        width={20}
        height={20}
        alt="subheading-icon"
      />
    </div>
  );
};
