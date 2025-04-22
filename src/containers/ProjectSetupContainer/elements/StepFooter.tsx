"use client";

import { useProjectSetupStore } from "@stores/projectSetupStore";
import { PropsWithChildren } from "react";
import ReactDOM from "react-dom";
import { twMerge } from "tailwind-merge";

export const StepFooter = ({ className }: PropsWithClassName) => {
  const setFooterNode = useProjectSetupStore((state) => state.setFooterNode);

  return (
    <div
      ref={setFooterNode}
      className={twMerge(
        "flex flex-shrink-0 h-[86px] justify-end gap-4 bg-neutral-50 border-t border-t-neutral-200 mt-auto px-10 py-8 rounded-b-2xl",
        className
      )}
    />
  );
};

export const StepperFooterPortal = ({ children }: PropsWithChildren) => {
  const footerNode = useProjectSetupStore((state) => state.footerNode);

  if (!footerNode) {
    return <></>;
  }

  return ReactDOM.createPortal(<>{children}</>, footerNode);
};
