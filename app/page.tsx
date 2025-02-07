import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="flex flex-col w-full items-center bg-orange-200 py-8">
        <Image src={"/next.svg"} alt="logo" width={200} height={200} />
        <h2 className="font-black text-2xl">Employee Management</h2>
      </div>
      <div className="flex flex-col p-8 w-full gap-6">
        <h1 className="font-black text-4xl mt-8">Welcome!</h1>

        <p>
          On this application you can manage your employees, including actions
          such as:
        </p>
        <ul>
          <li>List Employees</li>
          <li>Create New Employee</li>
          <li>Remove Employee</li>
          <li>View Employee details</li>
          <li>Update Employee's Department and Status</li>
        </ul>
      </div>
    </>
  );
}
