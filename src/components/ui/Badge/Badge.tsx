import * as React from "react";
import { twMerge } from "tailwind-merge";

import { tv, VariantProps } from "tailwind-variants";

const badgeVariants = tv({
  base: "inline-flex gap-1 items-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary-900 focus:ring-offset-2",
  variants: {
    variant: {
      default: "bg-neutral-200",
    },
    size: {
      md: "py-1 px-2.5 text-xs",
      lg: "py-1.5 px-3 text-sm",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
  },
});

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div
      className={twMerge(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
