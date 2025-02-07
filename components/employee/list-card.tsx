import * as React from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

const ListCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { horizontal?: boolean }
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-sm border bg-card text-card-foreground shadow",
      "flex flex-row",
      className
    )}
    {...props}
  />
));
ListCard.displayName = "ListCard";

const ListCardCover = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("w-36 h-36 relative", className)} {...props} />
));
ListCardCover.displayName = "ListCardCover";

const ListCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-row space-x-1.5 p-2", className)}
    {...props}
  />
));
ListCardHeader.displayName = "ListCardHeader";

const ListCardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-lg font-bold leading-none tracking-tight", className)}
    {...props}
  />
));
ListCardTitle.displayName = "ListCardTitle";

const ListCardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
ListCardDescription.displayName = "ListCardDescription";

const ListCardBody = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex flex-col flex-auto gap-2 p-6 justify-around",
      className
    )}
    {...props}
  />
));
ListCardBody.displayName = "ListCardBody";

const ListCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col", "p-2 pt-0", className)}
    {...props}
  />
));
ListCardContent.displayName = "ListCardContent";

const ListCardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-row items-center p-6 gap-2", className)}
    {...props}
  />
));
ListCardFooter.displayName = "ListCardFooter";

export {
  ListCard,
  ListCardCover,
  ListCardHeader,
  ListCardFooter,
  ListCardTitle,
  ListCardDescription,
  ListCardBody,
  ListCardContent,
};
