import { CreateEmployeeForm } from "@/components/employee/create-form";
import { RouteModal } from "@/components/layout/modal";

export default async function AddEmployeeModalPage() {
  return (
    <RouteModal title="Add new Employee">
      <CreateEmployeeForm />
    </RouteModal>
  );
}
