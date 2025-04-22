import { useBuilderStore } from "@stores/builderStore";
import { LEFT_SIDE_BAR_VIEWS, usePushView } from "@stores/builderStore";
import { useMemo, useState } from "react";
import { MenuItem } from "primereact/menuitem";
import {
  PenLineIcon,
  StarTagIcon,
  TrashMinusOutlineIcon,
} from "../../../../assets/icons";
import { LinkItem, LinkItemLabel, LinkItemMenu } from "./LinkItem";
import { Button } from "@internalComponents/Button";
import { InputText } from "primereact/inputtext";
import { CheckBadgeIcon } from "@heroicons/react/20/solid";

interface PageLinkProps {
  pageName: string;
  isActive: boolean;
  pageId: string;
}

const menuIconSize = "1rem";

export const PageLink = ({ pageName, pageId, isActive }: PageLinkProps) => {
  const [setPage, removePage, renamePage] = useBuilderStore((state) => [
    state.setPage,
    state.removePage,
    state.renamePage,
  ]);
  const pushView = usePushView();

  // Pierson - Things that allow for changing the name page on the sidebar
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(pageName);

  const handleSave = () => {
    if (newName.trim()) {
      renamePage(pageId, newName);
    }
    setIsEditing(false);
  };

  const onPageLinkClick = () => {
    setPage(pageId);
    pushView(LEFT_SIDE_BAR_VIEWS.LAYERS);
  };

  const pageMenu = useMemo<MenuItem[]>(
    () => [
      {
        label: "Edit Page Name",
        icon: <PenLineIcon width={menuIconSize} height={menuIconSize} />,
        command: () => {
          setIsEditing(true);
        },
      },
      {
        label: "Review",
        icon: <StarTagIcon width={menuIconSize} height={menuIconSize} />,
      },
      {
        label: "Delete Page",
        className: "text-error-600",
        icon: (
          <TrashMinusOutlineIcon width={menuIconSize} height={menuIconSize} />
        ),
        command: () => {
          removePage(pageId);
        },
      },
    ],
    [pageId, removePage]
  );

  return (
    <LinkItem isActive={isActive} onClick={onPageLinkClick}>
      {isEditing ? (
        <div className="flex items-center gap-2">
          <InputText
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSave();
              }
            }}
            onClick={(e) => e.stopPropagation()}
            className="w-full"
            autoFocus
          />
          <Button 
          label="Save"
          variant="primary"
          onClick={(e) => { e.stopPropagation(); handleSave(); }}
          />
          <Button
          label="Cancel"
          variant="outline"
          onClick={(e) => {e.stopPropagation(); setIsEditing(false); }}
          />
        </div>
      ) : (
        <>
          <LinkItemLabel>{pageName}</LinkItemLabel>
          <LinkItemMenu menu={pageMenu} />
        </>
      )}
    </LinkItem>
  );
};
