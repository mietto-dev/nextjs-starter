import { DeleteEmployeeForm } from "@/components/employee/delete";
import { RouteModal } from "@/components/layout/modal";
import { Employee } from "@/lib/db/schema";

export default async function DeleteEmployeeModalPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const employeeId = (await params).id;
  console.log(`RENDERING DELETE MODAL`);
  return (
    <RouteModal title="Delete Employee">
      <DeleteEmployeeForm employeeId={Number(employeeId)} />
    </RouteModal>
  );
}
