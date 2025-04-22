import { CgSpinner } from "react-icons/cg";
import { IconBaseProps } from "react-icons/lib";
import { twMerge } from "tailwind-merge";

export const Loading = ({ className, size = 20, ...props }: IconBaseProps) => {
  return (
    <CgSpinner
      className={twMerge("animate-spin", className)}
      size={size}
      {...props}
    />
  );
};
