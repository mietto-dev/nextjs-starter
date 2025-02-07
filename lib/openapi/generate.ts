import { createDocument } from "zod-openapi";

// response schema for employee entity
import {
  employeeSelectSchema,
  employeeInsertSchema,
  employeeUpdateSchema,
  departmentSelectSchema,
} from "@/lib/db/schema";

const id = employeeSelectSchema.pick({ id: true });
const createdEmployee = employeeSelectSchema.pick({ id: true, name: true });
const allEmployees = employeeSelectSchema.array();
const allDepartments = departmentSelectSchema.array();

// TODO: maybe add message / result field to all response schemas
// or create an API generic response
export const document = createDocument({
  openapi: "3.1.0",
  info: {
    title: "Employee API",
    version: "1.0.0",
  },
  paths: {
    "api/employees": {
      get: {
        summary: "GetAllEmployees",
        tags: ["Employee API"],
        responses: {
          "200": {
            description: "200 OK",
            content: {
              "application/json": { schema: allEmployees },
            },
          },
        },
      },
      post: {
        summary: "CreateEmployee",
        tags: ["Employee API"],
        requestBody: {
          content: {
            "application/json": { schema: employeeInsertSchema },
          },
        },
        responses: {
          "200": {
            description: "200 OK",
            content: {
              "application/json": { schema: createdEmployee },
            },
          },
        },
      },
    },
    "api/employees/{id}": {
      get: {
        summary: "GetEmployeeById",
        tags: ["Employee API"],
        requestParams: { path: id },
        responses: {
          "200": {
            description: "200 OK",
            content: {
              "application/json": { schema: employeeSelectSchema },
            },
          },
        },
      },
      patch: {
        summary: "UpdateEmployee",
        tags: ["Employee API"],
        requestParams: { path: id },
        requestBody: {
          content: {
            "application/json": { schema: employeeUpdateSchema },
          },
        },
        responses: {
          "200": {
            description: "200 OK",
            content: {
              "application/json": { schema: employeeSelectSchema },
            },
          },
        },
      },
      delete: {
        summary: "DeleteEmployee",
        tags: ["Employee API"],
        requestParams: { path: id },
        responses: {
          "200": {
            description: "200 OK",
            content: {
              "application/json": { schema: id },
            },
          },
        },
      },
    },
    "api/departments": {
      get: {
        summary: "GetAllDepartments",
        tags: ["Department API"],
        responses: {
          "200": {
            description: "200 OK",
            content: {
              "application/json": { schema: allDepartments },
            },
          },
        },
      },
    },
  },
});
