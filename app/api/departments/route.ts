import { NextRequest, NextResponse } from "next/server";
import { getAllDepartments } from "@/lib/actions/department";

export async function GET(request: NextRequest) {
  try {
    const allDepartments = await getAllDepartments();
    return NextResponse.json(allDepartments);
  } catch (err) {
    console.warn(`Error on GET /api/departments:`);
    console.log(request);
    console.error(err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
