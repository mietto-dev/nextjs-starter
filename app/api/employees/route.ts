import { NextRequest, NextResponse } from "next/server";
import { getAllEmployees, createEmployee } from "@/lib/actions/employee";
import { EmployeeCreateDTO } from "@/lib/db/schema";

export async function GET(request: NextRequest) {
  try {
    const allEmployees = await getAllEmployees();
    return NextResponse.json(allEmployees);
  } catch (err) {
    console.warn(`Error on GET /api/employees:`);
    console.log(request);
    console.error(err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  console.log(`CREATING NEW EMPLOYEE:`);
  try {
    const newEmployee: EmployeeCreateDTO = await request.json();
    console.log(newEmployee);
    newEmployee.hireDate = new Date(newEmployee.hireDate.toString());
    const created = await createEmployee(newEmployee);
    return NextResponse.json(created);
  } catch (err) {
    console.warn(`Error on POST /api/employees:`);
    console.log(request);
    console.error(err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
