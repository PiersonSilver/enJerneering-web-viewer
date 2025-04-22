import {
  HTMLAttributes,
  PropsWithChildren,
  ReactNode,
  forwardRef,
} from "react";
import { twMerge } from "tailwind-merge";

export interface ElementProps {
  label: string;
  thumbnail: ReactNode;
}

export const Element = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ children, className, ...props }, ref) => {
  return (
    <div ref={ref} className={twMerge("group", className)} {...props}>
      {children}
    </div>
  );
});
Element.displayName = "Element";

export const ElementLabel = ({
  className,
  children,
}: PropsWithChildren<PropsWithClassName>) => {
  return (
    <p className={twMerge("text-sm font-medium mb-2", className)}>{children}</p>
  );
};

export const ElementThumbnail = forwardRef<
  HTMLDivElement,
  PropsWithChildren<PropsWithClassName>
>(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={twMerge(
        "relative px-3 py-4 aspect-[3/2] rounded-lg border bg-neutral-50 [&_svg]:w-full [&_svg]:h-full overflow-hidden group-hover:shadow-lg transition-all",
        className
      )}
    >
      {children}
    </div>
  );
});
ElementThumbnail.displayName = "ElementThumbnail";
