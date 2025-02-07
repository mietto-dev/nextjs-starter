import { EmployeeDetails } from "@/components/employee/details";
import { RouteModal } from "@/components/layout/modal";
import { Card, CardContent } from "@/components/ui/card";
import { Employee } from "@/lib/db/schema";

export default async function EmployeeDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const employeeId = (await params).id;
  return (
    <>
      <h2 className="font-black text-2xl">Employee Details</h2>
      <Card className="w-full self-center shadow-xl border-gray-300 mt-6">
        <CardContent>
          <EmployeeDetails employeeId={Number(employeeId)} />
        </CardContent>
      </Card>
    </>
  );
}
