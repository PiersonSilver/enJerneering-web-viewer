"use client";

import { AngleDownSmallIcon } from "../../../assets/icons";
import { useBuilderStore } from "@stores/builderStore";
import { Button } from "@internalComponents/Button";
import {
  Select,
  SelectPrimitiveTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@internalComponents/Select";

export const PageMenu = () => {
  const currentPageId = useBuilderStore((state) => state.currentPageId);
  const pageOptions = useBuilderStore((state) => state.pageOptions);
  const setPage = useBuilderStore((state) => state.setPage);

  return (
    <div className="flex items-center gap-1">
      <Select value={currentPageId} onValueChange={setPage}>
        <p className="text-lg font-semibold">
          <SelectValue placeholder="Page" />
        </p>
        <SelectPrimitiveTrigger asChild>
          <Button
            variant="soft"
            iconPos="right"
            size="xs"
            icon={
              <div className="-mb-0.5">
                <AngleDownSmallIcon width="1.5rem" height="1.5rem" />
              </div>
            }
          />
        </SelectPrimitiveTrigger>
        <SelectContent align="center">
          {pageOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
