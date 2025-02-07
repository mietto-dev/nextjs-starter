"use client";
import * as React from "react";

import { Employee } from "@/lib/db/schema";

type EmployeeContextBag = {
  employeeList: Employee[];
  getEmployee: (id: number) => Employee | undefined;
};

const mockEmployee: Employee = {
  id: 0,
  department: "Development",
  hireDate: new Date(),
  name: "",
  status: "Inactive",
};

export const EmployeeContext = React.createContext<EmployeeContextBag>({
  employeeList: [],
  getEmployee: () => mockEmployee,
});

export const EmployeeProvider = ({
  children,
  employeeList,
}: Readonly<{
  children?: React.ReactNode;
  employeeList: Employee[];
}>) => {
  const getEmployee = (id: number) => employeeList.find((el) => el.id === id);

  return (
    <EmployeeContext.Provider value={{ employeeList, getEmployee }}>
      {children}
    </EmployeeContext.Provider>
  );
};

export const useEmployeeContext = () => React.useContext(EmployeeContext);
