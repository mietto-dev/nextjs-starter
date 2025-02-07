"use server";
import { revalidatePath } from "next/cache";
import { db } from "../db";
import {
  employee,
  Employee,
  EmployeeCreateDTO,
  EmployeeGetDTO,
  EmployeeDeleteDTO,
  EmployeeUpdateDTO,
  departmentHistory,
  EmployeeDB,
} from "../db/schema";
import { or, ilike, arrayContains, not, eq, desc } from "drizzle-orm";

function removeNulls(employeesResult: EmployeeDB[]) {
  const employees: Employee[] = employeesResult.map((el) => ({
    ...el,
    address: el.address === null ? undefined : el.address,
    phone: el.phone === null ? undefined : el.phone,
    picture: el.picture === null ? undefined : el.picture,
  }));
  return employees;
}

export const getAllEmployees = async () => {
  const allEmployees = await db
    .select()
    .from(employee)
    .orderBy(desc(employee.id));
  const parsed: Employee[] = removeNulls(allEmployees);
  return parsed;
};

export const getEmployeeById = async ({ id }: EmployeeGetDTO) => {
  const foundEmployees = await db
    .select()
    .from(employee)
    .where(eq(employee.id, id))
    .limit(1);

  return removeNulls(foundEmployees).at(0);
};

export const createEmployee = async (newEmployee: EmployeeCreateDTO) => {
  // TODO use transaction
  const result = await db
    .insert(employee)
    .values({
      ...newEmployee,
    })
    .returning();

  const created = removeNulls(result).at(0);
  if (!created) {
    throw new Error(
      `Failed to create employee: ${JSON.stringify(newEmployee)}`
    );
  }

  await db.insert(departmentHistory).values({
    employeeId: created.id,
    date: new Date(),
    department: created.department,
  });

  revalidatePath("/employee", "layout");

  return created;
};

export const updateEmployee = async (
  id: number,
  updatedEmployee: EmployeeUpdateDTO
) => {
  const result = await db
    .update(employee)
    .set(updatedEmployee)
    .where(eq(employee.id, id))
    .returning();

  const updated = removeNulls(result).at(0);

  if (!updated) {
    throw new Error(
      `Failed to update employee: ${JSON.stringify(updatedEmployee)}`
    );
  }

  if (!!updatedEmployee.department) {
    console.log(
      `ADDING DEPARTMENT TO HISTORY OF ${updated.name}: ${updatedEmployee.department}`
    );
    await db.insert(departmentHistory).values({
      employeeId: id,
      date: new Date(),
      department: updatedEmployee.department,
    });
  }

  revalidatePath("/employee", "layout");

  return updated;
};

export const deleteEmployee = async (id: number) => {
  const deleted = await db
    .delete(employee)
    .where(eq(employee.id, id))
    .returning({ id: employee.id });

  revalidatePath("/employee", "layout");

  return deleted.at(0);
};
