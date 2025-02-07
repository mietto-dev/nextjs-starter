"use client";

import { Department, DepartmentHistoryEntry, Employee } from "@/lib/db/schema";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { formatDate, formatElapsed } from "@/lib/utils/date";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import * as React from "react";
import { useEmployeeContext } from "@/contexts/employee";
import { getInitials } from "@/lib/utils/employee";
import { DetailsField } from "@/components/employee/details-field";
import { getDepartmentHistory, updateEmployee } from "@/lib/actions";
import { useToast } from "@/hooks/use-toast";

export const EmployeeDetails = ({ employeeId }: { employeeId: number }) => {
  const { toast } = useToast();

  const [selectedDep, setSelectedDep] = React.useState<Department>();
  const [history, setHistory] = React.useState<DepartmentHistoryEntry[]>();
  const { getEmployee } = useEmployeeContext();
  const employee = getEmployee(employeeId);

  React.useEffect(() => {
    if (employee) {
      setSelectedDep(employee.department);
      fetchHistory();
    }

    async function fetchHistory() {
      const res = await getDepartmentHistory(employeeId);
      setHistory(res);
    }
  }, [employee]);

  const handleUpdateDepartment = async () => {
    const updated = await updateEmployee(employeeId, {
      department: selectedDep,
    });

    toast({
      variant: "success",
      title: "Updated successfuly",
      description: `Department updated to "${updated.department}".`,
    });
  };

  const handleUpdateStatus = async (newStats: "Active" | "Inactive") => {
    const updated = await updateEmployee(employeeId, {
      status: newStats,
    });

    toast({
      variant: "success",
      title: "Updated successfuly",
      description: `Status updated to "${updated.department}".`,
    });
  };

  return (
    <div className="grid grid-rows-6 grid-cols-2 grid-flow-col gap-6 h-full p-12 pb-16">
      {/* EMPLOYEE */}
      <div className="row-span-6 bg-white shadow-xl rounded-2xl p-8">
        <div className="flex flex-col w-full gap-8">
          <Avatar className="w-[240px] h-[240px] ring-4 ring-offset-4 ring-slate-900 dark:ring-gray-500 -mt-16 self-center">
            {<AvatarImage src={employee?.picture} />}
            <AvatarFallback className="font-black text-4xl">
              {getInitials(employee?.name)}
            </AvatarFallback>
            {employee?.status === "Inactive" && (
              <Badge className="rounded-full font-bold text-base px-4 bg-gray-400 absolute bottom-1 left-1/2 -translate-x-1/2">
                {employee?.status}
              </Badge>
            )}
          </Avatar>
          <div className="flex flex-col gap-8">
            <h1 className="font-bold text-left text-xl">
              Personal Information
            </h1>

            <DetailsField label="Name:">{employee?.name}</DetailsField>

            <div className="flex flex-row gap-2">
              <DetailsField label="Department:">
                {employee?.department}
              </DetailsField>
              <DetailsField label="ID:" className="w-16">
                {employee?.id}
              </DetailsField>
            </div>

            <DetailsField label="Phone:">
              {employee?.phone &&
                `+${employee?.phone?.country} ${employee?.phone?.num}`}
            </DetailsField>

            <DetailsField label="Address:">
              {employee?.address?.line1}
            </DetailsField>
            <div className="flex flex-row gap-2">
              <DetailsField>{employee?.address?.line2}</DetailsField>
              <DetailsField className="w-fit min-w-20">
                {employee?.address?.country}
              </DetailsField>
            </div>
          </div>
        </div>
      </div>

      {/* HIRE DATE / DEACTIVATE */}
      <div className="row-span-2 col-span-2 bg-white shadow rounded-lg p-8">
        <div className="flex flex-col w-full gap-8">
          <h1 className="font-bold text-left text-xl">Hiring Details</h1>
          <div className="flex flex-row gap-2">
            <DetailsField label="Hire Date:">
              {formatDate(employee?.hireDate)}
            </DetailsField>
            <DetailsField label="Since:" className="w-fit min-w-20">
              {formatElapsed(employee?.hireDate, new Date())}
            </DetailsField>
          </div>

          <div className="flex justify-center mt-4">
            {employee?.status === "Active" && (
              <Button
                className="rounded-full text-lg font-bold px-8 py-6"
                variant={"destructive"}
                onClick={() => handleUpdateStatus("Inactive")}>
                Deactivate
              </Button>
            )}
            {employee?.status === "Inactive" && (
              <Button
                className="rounded-full text-lg font-bold px-8 py-6"
                variant={"success"}
                onClick={() => handleUpdateStatus("Active")}>
                Activate
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* DEPARTMENT HISTORY */}
      <div className="row-span-4 col-span-2 bg-white shadow rounded-lg p-8">
        <div className="flex flex-col w-full gap-8">
          <h1 className="font-bold text-left text-xl">Department History</h1>

          <div className="flex flex-col w-full gap-2">
            <Label className="font-bold">Update Department</Label>
            <div className="flex flex-row gap-2">
              <Select
                disabled={!employee}
                onValueChange={(value) => {
                  setSelectedDep(value as Department);
                }}
                value={selectedDep}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Department" />
                </SelectTrigger>
                <SelectContent>
                  {["Development", "Sales", "Ops", "HR"].map((dep) => (
                    <SelectItem key={dep} value={dep}>
                      {dep}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                variant={"success"}
                disabled={!employee || selectedDep === employee.department}
                className="rounded-full font-bold"
                onClick={handleUpdateDepartment}>
                Update
              </Button>
            </div>
          </div>

          <div className="flex flex-col w-full gap-1">
            <div className="flex flex-row gap-2">
              <DetailsField
                label="Date:"
                hideChildren={true}
                className="w-fit min-w-20"
              />
              <DetailsField label="Department:" hideChildren={true} />
            </div>
            {history &&
              history.map((entry, idx) => (
                <div className="flex flex-row gap-2" key={`history-${idx}`}>
                  <DetailsField className="w-fit min-w-20">
                    {entry.date.toLocaleDateString("en-US")}
                  </DetailsField>
                  <DetailsField>{entry.department}</DetailsField>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
