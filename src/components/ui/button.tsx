import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/src/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-800 disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-rose-900 text-white shadow-sm hover:bg-rose-950 active:bg-rose-950",
        destructive:
          "bg-red-600 text-white shadow-sm hover:bg-red-700 active:bg-red-800",
        outline:
          "border border-rose-200 bg-white text-rose-950 shadow-xs hover:bg-pink-50 hover:text-rose-950",
        secondary:
          "bg-sky-50 text-sky-900 hover:bg-sky-100 border border-sky-200",
        ghost:
          "hover:bg-pink-50 text-rose-950 hover:text-rose-900",
        link:
          "text-rose-900 underline-offset-4 hover:underline",
        pink:
          "bg-pink-600 text-white hover:bg-pink-700 shadow-sm",
        lightblue:
          "bg-sky-600 text-white hover:bg-sky-700 shadow-sm",
        maroon:
          "bg-[#4c0519] text-white hover:bg-[#881337] shadow-sm",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-11 rounded-lg px-6 text-base",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
