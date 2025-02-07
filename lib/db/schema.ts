import {
  pgTable,
  text,
  varchar,
  numeric,
  jsonb,
  integer,
  date,
  pgEnum,
  primaryKey,
} from "drizzle-orm/pg-core";

import { z } from "zod";
import { extendZodWithOpenApi } from "zod-openapi";
import { createSchemaFactory } from "drizzle-zod";
import { relations } from "drizzle-orm";

extendZodWithOpenApi(z);
const { createSelectSchema, createInsertSchema, createUpdateSchema } =
  createSchemaFactory({
    zodInstance: z,
  });

const AddressSchema = z.object({
  line1: z
    .string()
    .openapi({ description: "Street, Number, apartment" })
    .optional(),
  line2: z.string().openapi({ description: "ZIP, City, State" }).optional(),
  country: z.string().optional(),
});
export type Address = z.infer<typeof AddressSchema>;

const PhoneSchema = z.object({
  country: z.string().optional(),
  num: z.string().optional(),
});

export type Phone = z.infer<typeof PhoneSchema>;

export const departmentEnum = pgEnum("department", [
  "HR",
  "Sales",
  "Ops",
  "Development",
]);

export const departmentSelectSchema = createSelectSchema(departmentEnum);
export type Department = z.infer<typeof departmentSelectSchema>;

export const statusEnum = pgEnum("employee_status", ["Active", "Inactive"]);

export const employee = pgTable("employee", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  hireDate: date("hire_date", { mode: "date" }).notNull(),
  department: departmentEnum().notNull(),
  phone: jsonb().$type<Phone>(),
  address: jsonb().$type<Address>(),
  picture: text(),
  status: statusEnum().notNull().default("Active"),
});

export const departmentHistory = pgTable("employee_department", {
  employeeId: integer("employee_id")
    .references(() => employee.id, { onDelete: "cascade" })
    .notNull(),
  date: date("date", { mode: "date" }).notNull(),
  department: departmentEnum().notNull(),
});

export const employeeRelations = relations(employee, ({ many }) => ({
  history: many(departmentHistory),
}));

export const departmentHistoryRelations = relations(
  departmentHistory,
  ({ one }) => ({
    employee: one(employee, {
      fields: [departmentHistory.employeeId],
      references: [employee.id],
    }),
  })
);

export const departmentHistoryEntrySchema = z.object({
  date: z.date(),
  employeeId: z.number(),
  department: departmentSelectSchema,
});

export type DepartmentHistoryEntry = z.infer<
  typeof departmentHistoryEntrySchema
>;

export const employeeSelectSchemaDB = createSelectSchema(employee, {
  picture: z.string().nullable(),
  phone: PhoneSchema.nullable(),
  address: AddressSchema.nullable(),
});
export type EmployeeDB = z.infer<typeof employeeSelectSchemaDB>;
// Adding OpenAPI annotations
export const employeeSelectSchema = createSelectSchema(employee, {
  id: (schema) =>
    schema.positive().openapi({
      description: "Employee's numeric id.",
      example: 5,
    }),
  name: (schema) =>
    schema.openapi({
      description: "Employee's full name, max length 255 chars.",
      example: "John Doe",
    }),
  picture: z.string().optional(),
  phone: PhoneSchema.optional(),
  address: AddressSchema.optional(),
});
export type Employee = z.infer<typeof employeeSelectSchema>;

const employeeGetSchema = employeeSelectSchema.pick({ id: true });
export type EmployeeGetDTO = z.infer<typeof employeeGetSchema>;
export type EmployeeDeleteDTO = EmployeeGetDTO;

export const employeeInsertSchema = createInsertSchema(employee, {
  name: (schema) =>
    schema
      .openapi({
        description: "Employee's full name, max length 255 chars.",
        example: "John Doe",
      })
      .min(3),
  phone: PhoneSchema.optional(),
  address: AddressSchema.optional(),
});
export type EmployeeCreateDTO = z.infer<typeof employeeInsertSchema>;

export const employeeUpdateSchema = createUpdateSchema(employee, {
  phone: PhoneSchema.optional(),
  address: AddressSchema.optional(),
});
export type EmployeeUpdateDTO = z.infer<typeof employeeUpdateSchema>;
