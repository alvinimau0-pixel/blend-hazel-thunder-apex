import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

const tapScale = "active:not-disabled:scale-[0.96]";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[background-color,color,box-shadow,opacity,transform,border-color] duration-150 ease-out disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
  {
    variants: {
      variant: {
        default: "bg-accent text-accent-fg hover:bg-accent/90",
        stamp: "bg-stamp text-paper hover:bg-stamp/90",
        outline: "border border-line bg-panel text-ink hover:bg-paper-2",
        ghost: "text-ink-soft hover:bg-paper-2",
        secondary: "bg-paper-2 text-ink hover:bg-line",
      },
      size: {
        default: "min-h-11 h-11 px-4",
        sm: "min-h-11 h-11 px-3 text-sm sm:h-8 sm:min-h-8 sm:text-xs",
        lg: "min-h-12 h-12 px-5",
        icon: "size-11",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

export function Button({
  className,
  variant,
  size,
  asChild,
  static: isStatic,
  ...props
}: ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean; static?: boolean }) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(buttonVariants({ variant, size }), !isStatic && tapScale, className)}
      {...props}
    />
  );
}
