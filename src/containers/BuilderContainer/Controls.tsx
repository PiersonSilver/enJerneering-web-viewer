import { Button } from "@internalComponents/Button";
import { twJoin } from "tailwind-merge";
import { useBuilderStore } from "@stores/builderStore";
import { ArrowLeftToLineIcon, ArrowRightToLineIcon } from "../../assets/icons";

export const Controls = () => {
  const [sidebar, toggleSidebar] = useBuilderStore((state) => [
    state.sidebar,
    state.toggleSidebar,
  ]);

  return (
    <div
      className={twJoin(
        "absolute bottom-4 left-0 right-0 px-4 transition-all flex items-center justify-between z-50 duration-300 ease-in-out",
        sidebar.left.open ? "ml-96" : "ml-0",
        sidebar.right.open ? "mr-96" : "mr-0"
      )}
    >
      <Button
        variant="secondary"
        onClick={() => toggleSidebar("left")}
        icon={
          sidebar.left.open ? <ArrowLeftToLineIcon /> : <ArrowRightToLineIcon />
        }
      />
      <Button
        variant="secondary"
        onClick={() => toggleSidebar("right")}
        icon={
          sidebar.right.open ? (
            <ArrowRightToLineIcon />
          ) : (
            <ArrowLeftToLineIcon />
          )
        }
      />
    </div>
  );
};
