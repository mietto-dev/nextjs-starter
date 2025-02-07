"use server";
import { db } from "../db";
import {
  departmentEnum,
  Department,
  Employee,
  employee,
  departmentHistory,
} from "../db/schema";
import { or, ilike, arrayContains, not, eq, desc } from "drizzle-orm";

export const getAllDepartments = async () => {
  const allDeps: Department[] = departmentEnum.enumValues;
  return allDeps;
};

export const getDepartmentHistory = async (employeeId: number) => {
  const history = await db.query.departmentHistory.findMany({
    where: eq(departmentHistory.employeeId, employeeId),
    orderBy: [desc(departmentHistory.date)],
  });

  return history;
};
