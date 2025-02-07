"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useState, useRef, ChangeEvent } from "react";
import { Pencil } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export const ImageUpload = ({
  onLoadFile,
}: {
  onLoadFile: (file: File) => void;
}) => {
  const [file, setFile] = useState<File>();

  const handleLoadFile = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || !event.target.files[0]) {
      console.log(`NO FILES ON INPUT CHANGE`);
      return;
    }

    const loaded = event.target.files[0];

    console.log(`FILE LOADED:`);
    console.log(loaded);

    setFile(loaded);
    onLoadFile(loaded);
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <Avatar className="w-[125px] h-[125px] ring-4 ring-offset-4 ring-slate-900 dark:ring-gray-500 flex-col">
          {/* {blob && <AvatarImage src={blob.url} />} */}
          {file && <AvatarImage src={URL.createObjectURL(file)} />}
          <AvatarFallback className="font-black text-4xl">EM</AvatarFallback>
          <Label
            htmlFor="file-input"
            className="cursor-pointer absolute bottom-1 left-1/2 -translate-x-1/2">
            <Input
              name="file"
              id="file-input"
              type="file"
              accept="image/*"
              required
              className="hidden"
              onChange={handleLoadFile}
            />
            <Badge className="rounded-full p-1 bg-slate-700">
              <Pencil width={12} height={12} />
            </Badge>
          </Label>
        </Avatar>
      </div>
    </>
  );
};
