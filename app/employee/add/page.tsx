import { CreateEmployeeForm } from "@/components/employee/create-form";
import { Card, CardContent } from "@/components/ui/card";

export default function EmployeeAddPage() {
  return (
    <>
      <h2 className="font-black text-2xl">Add new employee</h2>
      <Card className="max-w-lg self-center shadow-xl border-gray-300 mt-6">
        <CardContent>
          <CreateEmployeeForm />
        </CardContent>
      </Card>
    </>
  );
}
