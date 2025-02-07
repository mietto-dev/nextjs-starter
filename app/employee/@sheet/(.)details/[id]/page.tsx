import { DeleteEmployeeForm } from "@/components/employee/delete";
import { EmployeeDetails } from "@/components/employee/details";
import { SideView } from "@/components/layout/side";
import { Employee } from "@/lib/db/schema";

export default async function DetailsEmployeeModalPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const employeeId = (await params).id;

  return (
    <SideView title="Employee Details">
      <EmployeeDetails employeeId={Number(employeeId)} />
    </SideView>
  );
}
