import { InputText } from "@internalComponents/Input";
import { ChangeEvent } from "react";
import { twJoin } from "tailwind-merge";

interface SocialLinkProps {
  icon: string;
  url: string;
  onChange: (url: string) => void;
}

export const SocialLink = ({ icon, url, onChange }: SocialLinkProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="flex gap-2">
      <div className="px-4 rounded-lg border border-neutral-20 flex items-center">
        <i className={twJoin("text-neutral-500 w-4 h-4 pi", icon)} />
      </div>
      <InputText
        size="sm"
        className="flex-1"
        onChange={handleChange}
        placeholder="Enter social URL"
        value={url}
      />
    </div>
  );
};
