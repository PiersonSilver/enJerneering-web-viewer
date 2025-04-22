import { supportedLogoMineTypes } from "@/_constants/file";
import { RepeatIcon, TrashMinusOutlineIcon } from "../../../../assets/icons";
import { Button } from "@internalComponents/Button";
import { ReactNode, useMemo } from "react";
import { Accept, useDropzone } from "react-dropzone";

type ChangeLogoProps = {
  logoUrl: string;
  onChange: (file: File | null) => void;
  accept?: Accept | undefined;
  fallback?: ReactNode;
};

export const ChangeLogo = ({
  logoUrl,
  onChange,
  accept = supportedLogoMineTypes,
  fallback = <p className="text-neutral-500">No logo</p>,
}: ChangeLogoProps) => {
  const { getRootProps, getInputProps, open } = useDropzone({
    accept,
    multiple: false,
    onDropAccepted(files, event) {
      onChange(files[0]);
    },
  });

  const onRemove = () => {
    onChange(null);
  };

  const acceptedStr = useMemo(() => {
    const exts = Object.values(accept ?? {})
      .flatMap((extArr) => extArr)
      .map((ext) => ext.replace(".", "").toUpperCase());

    if (exts.length === 0) {
      return "";
    }

    if (exts.length === 1) {
      return `Supported formats ${exts.join("")}`;
    }

    return `Supported formats ${exts.slice(0, exts.length - 1).join(", ")} or ${exts[exts.length - 1]}.`;
  }, [accept]);

  return (
    <div className="space-y-4">
      <div
        {...getRootProps({
          className:
            "flex justify-center items-center flex-1 h-[160px] p-2 rounded-2xl border border-neutral-300 bg-neutral-50",
        })}
      >
        <input {...getInputProps()} />
        {logoUrl ? (
          <img
            className="rounded-xl object-contain h-full"
            src={logoUrl}
            alt="preview"
          />
        ) : (
          fallback
        )}
      </div>
      <div className="flex gap-2">
        <Button
          label="Change"
          variant="outline"
          icon={<RepeatIcon width="1rem" height="1rem" />}
          onClick={open}
        />
        <Button
          label="Remove"
          className="text-red-600"
          variant="outline"
          icon={<TrashMinusOutlineIcon width="1rem" height="1rem" />}
          onClick={onRemove}
        />
      </div>
      <p className="text-neutral-500 font-semibold text-xs">{acceptedStr}</p>
    </div>
  );
};
