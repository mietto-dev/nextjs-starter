import { EmployeeProvider } from "@/contexts/employee";
import { getAllEmployees } from "@/lib/actions/employee";

export default async function EmployeeLayout({
  modal,
  sheet,
  children,
}: {
  modal: React.ReactNode;
  sheet: React.ReactNode;
  children: React.ReactNode;
}) {
  const employeeList = await getAllEmployees();
  return (
    <section className="m-10 mx-12">
      <EmployeeProvider employeeList={employeeList}>
        {/* MODAL */}
        {modal}
        {/* DETAILS */}
        {sheet}
        <div className="flex flex-col gap-4">{children}</div>
      </EmployeeProvider>
    </section>
  );
}
