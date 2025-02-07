"use client";
import * as React from "react";
import { use } from "react";
import { Department } from "@/lib/db/schema";

type DepartmentContextBag = {
  departmentsList: Department[];
  getEmployeeHistory: (id: number) => any;
};

export const DepartmentContext = React.createContext<DepartmentContextBag>({
  departmentsList: [],
  getEmployeeHistory: () => {},
});

export const DepartmentProvider = ({
  children,
  departmentsListPromise,
}: Readonly<{
  children?: React.ReactNode;
  departmentsListPromise: Promise<Department[]>;
}>) => {
  const departmentsList = use(departmentsListPromise);

  const getEmployeeHistory = (id: number) => {};

  return (
    <DepartmentContext.Provider value={{ departmentsList, getEmployeeHistory }}>
      {children}
    </DepartmentContext.Provider>
  );
};

export const useDepartmentContext = () => React.useContext(DepartmentContext);
