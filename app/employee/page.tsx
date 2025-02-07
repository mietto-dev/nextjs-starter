"use client";
import * as React from "react";

import { EmployeeListItem } from "@/components/employee/list-item";
import Link from "next/link";
import { Button } from "@/components/ui/button";

import { useEmployeeContext } from "@/contexts/employee";

export default function ListEmployeesPage() {
  const { employeeList } = useEmployeeContext();
  return (
    <>
      <div className="flex flex-row justify-end pr-4 mb-4">
        <Link href="/employee/add">
          <Button className="px-8">New Employee</Button>
        </Link>
      </div>

      {employeeList.map((employee, idx) => (
        <EmployeeListItem employee={employee} key={`employee-item-${idx}`} />
      ))}
    </>
  );
}
