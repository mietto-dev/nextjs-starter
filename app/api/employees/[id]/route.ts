import { NextRequest, NextResponse } from "next/server";
import {
  getEmployeeById,
  deleteEmployee,
  updateEmployee,
} from "@/lib/actions/employee";
import { EmployeeCreateDTO, EmployeeUpdateDTO } from "@/lib/db/schema";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = Number((await params).id);

    const employee = await getEmployeeById({ id });
    return NextResponse.json(employee);
  } catch (err) {
    console.warn(`Error on GET /api/employees/<id>:`);
    console.log(request);
    console.error(err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = Number((await params).id);

    const updatedEmployee: EmployeeUpdateDTO = await request.json();
    const updated = await updateEmployee(id, updatedEmployee);
    return NextResponse.json(updated);
  } catch (err) {
    console.warn(`Error on PATCH /api/employees/<id>:`);
    console.log(request);
    console.error(err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = Number((await params).id);
  try {
    const deleted = await deleteEmployee({ id });
    return NextResponse.json(deleted);
  } catch (err) {
    console.warn(`Error on DELETE /api/employees/<id>:`);
    console.log(request);
    console.error(err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
