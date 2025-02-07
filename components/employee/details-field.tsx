import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import * as React from "react";

export const DetailsField = ({
  children,
  label,
  className,
  hideChildren = false,
}: {
  children?: React.ReactNode;
  label?: string;
  hideChildren?: boolean;
} & React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        "flex flex-col",
        `${!className && "flex-auto"}`,
        className
      )}>
      {label && <Label className="font-bold">{label}</Label>}

      {!hideChildren && (
        <span className="ml-1 border-b border-gray-400 py-1 px-1 flex w-full">
          {children && children.toString().length > 0 ? (
            children
          ) : (
            <span className="text-sm text-muted-foreground italic">Empty</span>
          )}
        </span>
      )}
    </div>
  );
};
