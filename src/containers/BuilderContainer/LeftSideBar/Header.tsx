import { PropsWithChildren } from "react";
import { useLeftSideBarStore } from "@stores/builderStore";
import { Button, ButtonProps } from "@internalComponents/Button";
import { AngleLeftSmallIcon } from "../../../assets/icons";
import { twMerge } from "tailwind-merge";

export const Header = ({
  children,
  className,
}: PropsWithChildren<PropsWithClassName>) => {
  return (
    <div className={twMerge("flex px-4 items-center mb-2", className)}>
      {children}
    </div>
  );
};

export const HeaderBack = (props: ButtonProps) => {
  const [history, popView] = useLeftSideBarStore((state) => [
    state.history,
    state.popView,
  ]);

  return history.length > 1 ? (
    <Button
      className={twMerge("text-neutral-700", props.className)}
      icon={<AngleLeftSmallIcon width="1.5rem" height="1.5rem" />}
      onClick={popView}
      size="xs"
      variant="soft"
      {...props}
    />
  ) : (
    <></>
  );
};

export const HeaderHeading = ({
  children,
  className,
}: PropsWithChildren<PropsWithClassName>) => {
  return (
    <h3
      className={twMerge(
        "text-sm flex-1 font-bold whitespace-nowrap text-left ml-2",
        className
      )}
    >
      {children}
    </h3>
  );
};
