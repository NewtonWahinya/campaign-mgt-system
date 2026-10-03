import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/src/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-rose-900 text-white hover:bg-rose-950",
        maroon:
          "border-transparent bg-[#881337] text-white",
        pink:
          "border-pink-300 bg-pink-50 text-pink-800 hover:bg-pink-100",
        lightblue:
          "border-sky-300 bg-sky-50 text-sky-800 hover:bg-sky-100",
        secondary:
          "border-zinc-200 bg-zinc-100 text-zinc-800",
        destructive:
          "border-transparent bg-red-600 text-white",
        outline: "text-rose-950 border-rose-200 bg-white",
        success:
          "border-sky-200 bg-sky-50 text-sky-800",
        warning:
          "border-amber-200 bg-amber-50 text-amber-900",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
