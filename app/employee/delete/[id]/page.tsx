import { DeleteEmployeeForm } from "@/components/employee/delete";
import { RouteModal } from "@/components/layout/modal";
import { Card, CardContent } from "@/components/ui/card";
import { Employee } from "@/lib/db/schema";

export default async function EmployeeDeletePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const employeeId = (await params).id;
  return (
    <>
      <h2 className="font-black text-2xl">Delete employee</h2>
      <Card className="max-w-lg self-center shadow-xl border-gray-300 mt-6">
        <CardContent>
          <DeleteEmployeeForm employeeId={Number(employeeId)} />
        </CardContent>
      </Card>
    </>
  );
}
