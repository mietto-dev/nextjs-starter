import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Phone } from "@/lib/db/schema";

import countries from "./countries.json";

export const PhoneInput = ({
  onChange,
}: {
  onChange: (phone: Phone) => void;
}) => {
  const [phone, setPhone] = React.useState<Phone>({});
  const [countrySelected, setCountrySelected] = React.useState<{
    name: string;
    emoji: string;
    code: string;
    iso: string;
  }>();

  React.useEffect(() => {
    if (phone && phone.country && phone.num) {
      onChange(phone);
    }
  }, [phone]);

  return (
    <div className="flex flex-row">
      <Select
        onValueChange={(value) => {
          const selCountry = countries.find((el) => el.iso === value);
          const updated: Phone = {
            ...phone,
            country: selCountry?.code,
          };
          setPhone(updated);
          setCountrySelected(selCountry);
        }}
        value={countrySelected?.iso}>
        <SelectTrigger className="max-w-[85px] min-w-[85px] px-1.5 pr-0 rounded-r-none data-[placeholder]:text-muted-foreground">
          <SelectValue aria-label={countrySelected?.iso} placeholder="🏴‍☠️ +00">
            {`${countrySelected?.emoji} ${countrySelected?.code}`}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {countries.map((country) => (
            <SelectItem key={country.iso} value={country.iso}>
              {`${country.emoji} ${country.name} (${country.code})`}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Input
        type="tel"
        className="w-full rounded-l-none"
        placeholder="1234-5678"
        onChange={(event) => {
          const updated: Phone = {
            ...phone,
            num: event.target.value,
          };
          setPhone(updated);
        }}
      />
    </div>
  );
};
