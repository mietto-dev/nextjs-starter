"use client";

import * as React from "react";
import { Employee } from "@/lib/db/schema";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { TriangleAlert, OctagonX } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEmployeeContext } from "@/contexts/employee";
import { getInitials } from "@/lib/utils/employee";
import { DetailsField } from "@/components/employee/details-field";
import { deleteEmployee } from "@/lib/actions";
import { useToast } from "@/hooks/use-toast";

export const DeleteEmployeeForm = ({ employeeId }: { employeeId: number }) => {
  const router = useRouter();
  const { toast } = useToast();
  const { getEmployee } = useEmployeeContext();
  const employee = getEmployee(employeeId);

  const handleDelete = async () => {
    if (!employee) {
      console.error(`No employee passed to Delete Form`);
      return;
    }

    const result = await deleteEmployee(employee.id);

    toast({
      variant: "success",
      title: "Success",
      description: `Employee with id #${result?.id} successfuly removed.`,
    });
    router.back();
  };

  return (
    <div className="flex flex-col gap-4 items-center">
      <Avatar className="w-[125px] h-[125px] ring-4 ring-offset-4 ring-slate-900 dark:ring-gray-500 flex-col">
        {employee && <AvatarImage src={employee.picture} />}
        <AvatarFallback className="font-black text-4xl">
          {getInitials(employee?.name)}
        </AvatarFallback>
      </Avatar>

      <div className="flex flex-col bg-gray-100 px-4 py-2 rounded-md">
        <span className="flex flex-row gap-1">
          <TriangleAlert className="text-red-400" />
          <span className="font-bold leading-relaxed italic text-gray-600">
            Warning
          </span>
        </span>
        <p className="text-gray-500 text-sm mt-1">
          This will permanently delete the employee and all associated records.
        </p>
      </div>
      <div className="flex flex-row w-full gap-2">
        <DetailsField label="Name:">{employee?.name}</DetailsField>
        <DetailsField label="Department:">{employee?.department}</DetailsField>
      </div>
      <div className="flex flex-row w-full gap-4 justify-end">
        <Button variant={"destructive"} onClick={handleDelete}>
          Delete
        </Button>
        <Button
          variant={"outline"}
          onClick={() => {
            router.push("/employee");
          }}>
          Cancel
        </Button>
      </div>
    </div>
  );
};
