import { SubHeading } from "@components/MainContent/types/MainContentData";
import { ComponentType } from "react";
import { ArrangeAction } from "./DataItemControl";
import lodash from "lodash";
import { arrayMove } from "@dnd-kit/sortable";
import { produce } from "immer";

export interface DataListProps {
  data: SubHeading[];
  onChange: (data: SubHeading[]) => void;
}

interface DataListControlMethods {
  onArrange: (index: number, action: ArrangeAction) => void;
  onRemove: (index: number) => void;
  onItemChange: (field: keyof SubHeading, index: number, value: string) => void;
  onAdd: () => void;
}

export const withDataListControl = <T extends DataListProps>(
  Component: ComponentType<T & DataListControlMethods>
) => {
  const RenderDataListControl = (props: T) => {
    const { data, onChange } = props;

    const onArrange = (index: number, action: ArrangeAction) => {
      let targetIndex = lodash.clamp(index + 1, 0, data.length - 1);

      if (action === "up") {
        targetIndex = lodash.clamp(index - 1, 0, data.length - 1);
      }

      onChange(arrayMove(data, index, targetIndex));
    };

    const onRemove = (index: number) => {
      const removedList = produce(data, (draft) => {
        draft.splice(index, 1);
      });

      onChange(removedList);
    };

    const onItemChange = (
      field: keyof SubHeading,
      index: number,
      value: string
    ) => {
      const updatedData = produce(data, (draft) => {
        lodash.set(draft, [index, field], value);
      });

      onChange(updatedData);
    };

    const onAdd = () => {
      onChange([...data, { title: "Default Title", subtitle: "Default Subtitle" }]);
    };

    return (
      <Component
        {...props}
        onAdd={onAdd}
        onArrange={onArrange}
        onChange={onChange}
        onItemChange={onItemChange}
        onRemove={onRemove}
      />
    );
  };

  return RenderDataListControl;
};
