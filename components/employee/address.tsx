"use client";

import * as React from "react";
import { Address } from "@/lib/db/schema";
import countries from "./countries.json";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { ChevronsUpDown, PlusCircle, XCircle } from "lucide-react";

export const AddressInput = ({
  onChange,
}: {
  onChange: (address?: Address) => void;
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [address, setAddress] = React.useState<Address>({
    country: "",
    line1: "",
    line2: "",
  });

  React.useEffect(() => {
    if (
      address.line1?.length &&
      address.line2?.length &&
      address.country?.length
    ) {
      onChange(address);
    }
  }, [address]);

  const preview = [address.line1, address.country]
    .filter((el) => !!el && el.length > 0)
    .join(" - ");

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={(op) => {
        setIsOpen(op);
        // clears form field value
        if (!op) {
          onChange(undefined);
          setAddress({
            country: "",
            line1: "",
            line2: "",
          });
        }
      }}
      className="w-full space-y-2">
      <div className="flex items-center justify-between space-x-4 pl-2">
        <h4 className="text-sm font-semibold text-muted-foreground text-ellipsis">
          {preview.length > 0 ? preview : `No address provided`}
        </h4>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm">
            {isOpen ? (
              <XCircle className="h-4 w-4" />
            ) : (
              <PlusCircle className="h-4 w-4" />
            )}
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="space-y-2">
        <div>
          <Input
            placeholder="Street, number, apartment/unit"
            onChange={(event) => {
              const updated: Address = {
                ...address,
                line1: event.target.value,
              };
              setAddress(updated);
            }}
            value={address.line1}
          />
        </div>
        <div>
          <Input
            placeholder="ZIP, city, state"
            onChange={(event) => {
              const updated: Address = {
                ...address,
                line2: event.target.value,
              };
              setAddress(updated);
            }}
            value={address.line2}
          />
        </div>
        <div>
          <Select
            onValueChange={(value) => {
              const updated: Address = {
                ...address,
                country: value,
              };
              setAddress(updated);
            }}
            value={address.country}>
            <SelectTrigger>
              <SelectValue placeholder="Country" />
            </SelectTrigger>
            <SelectContent>
              {countries.map((country) => (
                <SelectItem key={country.iso} value={country.name}>
                  {`${country.emoji} ${country.name}`}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};
