"use client";

import * as React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Employee, employeeInsertSchema } from "@/lib/db/schema";

import { AddressInput } from "@/components/employee/address";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import type { PutBlobResult } from "@vercel/blob";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { ImageUpload } from "@/components/employee/image-upload";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PhoneInput } from "@/components/employee/phone";
import { useToast } from "@/hooks/use-toast";
import { createEmployee } from "@/lib/actions";

export const CreateEmployeeForm = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [file, setFile] = React.useState<File>();

  const form = useForm<z.infer<typeof employeeInsertSchema>>({
    resolver: zodResolver(employeeInsertSchema),
    defaultValues: {
      name: "",
      hireDate: new Date(),
    },
  });

  const onSubmit = async (values: z.infer<typeof employeeInsertSchema>) => {
    if (file) {
      const imageUrl = await uploadImage();
      values.picture = imageUrl;
    }

    const result = await createEmployee(values);

    toast({
      variant: "success",
      title: "Great Success!",
      description: `Employee with id #${result.id} successfuly created`,
    });
    router.back();
  };

  const uploadImage = async () => {
    if (!file) {
      console.warn(`No file for profile image.`);
      return;
    }

    const response = await fetch(`/api/storage?filename=${file.name}`, {
      method: "POST",
      body: file,
    });

    const newBlob = (await response.json()) as PutBlobResult;
    return newBlob.url;
  };

  return (
    <>
      <ImageUpload
        onLoadFile={(file: File) => {
          setFile(file);
        }}
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>
                  Your full, public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="department"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Department</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="HR">HR</SelectItem>
                    <SelectItem value="Sales">Sales</SelectItem>
                    <SelectItem value="Ops">Ops</SelectItem>
                    <SelectItem value="Development">Development</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  You can change the department later, in the Details page.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <PhoneInput onChange={field.onChange} />
                </FormControl>
                {/* <FormDescription>
                  Phone with country code and number
                </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <AddressInput onChange={field.onChange} />
                </FormControl>
                {/* <FormDescription>Employee's home address</FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-row gap-2 justify-end">
            <Button type="submit">Save</Button>
            <Button
              variant={"outline"}
              type="button"
              onClick={() => {
                router.push("/employee");
              }}>
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};
