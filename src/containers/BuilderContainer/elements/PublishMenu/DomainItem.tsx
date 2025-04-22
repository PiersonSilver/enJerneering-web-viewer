import { Domain } from "@/_stores/cartStore";
import { ArrowUpRightSquareIcon } from "../../../../assets/icons";
import { Checkbox } from "@internalComponents/Checkbox";
import { formatDistanceToNowStrict } from "date-fns";

type DomainItemProps = {
  isSelected: boolean;
  onToggle: (value: string) => void;
} & Domain;

export const DomainItem = ({
  isPublished,
  isSelected,
  domain,
  lastPublishedTime,
  onToggle,
}: DomainItemProps) => {
  const getPublishStatus = () => {
    if (isPublished) {
      return formatDistanceToNowStrict(lastPublishedTime, { addSuffix: true });
    }

    return "Not published";
  };

  const handleToggle = () => {
    onToggle(domain);
  };

  return (
    <div className="flex gap-4 py-3 items-baseline">
      <div>
        <Checkbox
          value={domain}
          checked={isSelected}
          onCheckedChange={handleToggle}
        />
      </div>
      <div className="space-y-1">
        <a
          target="_blank"
          className="font-bold leading-6 text-neutral-900 flex gap-2 items-center"
          href={domain}
        >
          <span>{domain}</span>
          <ArrowUpRightSquareIcon
            className="text-neutral-500"
            width="1rem"
            height="1rem"
          />
        </a>
        <p className="text-xs text-neutral-700">{getPublishStatus()}</p>
      </div>
    </div>
  );
};
