import { useMenuRef } from "@/_hooks/useMenuRef";
import { MoreVerticalIcon } from "../../../../assets/icons";
import { Button } from "@internalComponents/Button";
import { Menu } from "@internalComponents/Menu";
import { MenuItem } from "primereact/menuitem";
import { HTMLAttributes, MouseEvent, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface LinkItemRootProps extends HTMLAttributes<HTMLDivElement> {
  isActive?: boolean;
}

export const LinkItem = forwardRef<HTMLDivElement, LinkItemRootProps>(
  ({ children, className, isActive, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={twMerge(
          "pl-2 h-12 cursor-pointer flex items-center gap-2 border-b border-neutral-200",
          "bg-white hover:bg-neutral-50 transition-colors",
          isActive && "bg-neutral-200 hover:bg-neutral-200",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
LinkItem.displayName = "LinkItem";

export const LinkItemLabel = ({
  className,
  children,
}: HTMLAttributes<HTMLParagraphElement>) => {
  return (
    <p
      className={twMerge(
        "flex-1 font-medium text-xs whitespace-nowrap truncate",
        className
      )}
    >
      {children}
    </p>
  );
};

interface LinkItemMenuProps {
  menu: MenuItem[];
}

export const LinkItemMenu = ({ menu }: LinkItemMenuProps) => {
  const { menuRef, onToggleMenu } = useMenuRef();

  const handleToggleMenu = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onToggleMenu(e);
  };

  return (
    <>
      <Button
        className="text-border-500"
        size="xs"
        variant="soft"
        icon={<MoreVerticalIcon width="1rem" height="1rem" />}
        onClick={handleToggleMenu}
      />
      <Menu popup ref={menuRef} model={menu} popupAlignment="right" />
    </>
  );
};
