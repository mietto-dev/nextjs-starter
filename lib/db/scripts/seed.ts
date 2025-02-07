import { config } from "dotenv";
import { drizzle } from "drizzle-orm/neon-http";
import { migrate } from "drizzle-orm/postgres-js/migrator";

config({ path: ".env" });
import { departmentHistory, employee } from "@/lib/db/schema";

const runSeed = async () => {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not defined");
  }

  const db = drizzle(process.env.DATABASE_URL!);

  console.log("⏳ Seeding data into database...");

  const start = Date.now();

  await db.delete(employee);
  await db.delete(departmentHistory);

  const insertedEmployees = await db
    .insert(employee)
    .values([
      {
        name: "John From HR",
        hireDate: new Date("2019-02-03"),
        department: "HR",
        phone: {
          country: "+55",
          num: "11923414565",
        },
        address: {
          line1: "Av. São João, 3333 apt 33",
          line2: "12345-222 São Paulo - SP",
          country: "Brazil",
        },
      },
      {
        name: "Linda From Sales",
        hireDate: new Date("2020-03-01"),
        department: "Sales",
        phone: {
          country: "+55",
          num: "119232223",
        },
        address: {
          line1: "Av. São João, 2222 apt 22",
          line2: "12345-222 São Paulo - SP",
          country: "Brazil",
        },
      },
      {
        name: "Andy From Development",
        hireDate: new Date("2021-06-05"),
        department: "Development",
        phone: {},
        address: {
          line1: "Av. São João, 1111 apt 11",
          line2: "12345-222 São Paulo - SP",
          country: "Brazil",
        },
      },
    ])
    .returning({
      id: employee.id,
      department: employee.department,
      hireDate: employee.hireDate,
    });

  const historyInserts = insertedEmployees.map((el) => ({
    employeeId: el.id,
    date: el.hireDate,
    department: el.department,
  }));

  await db.insert(departmentHistory).values(historyInserts);

  const end = Date.now();

  console.log("✅ Seeding completed in", end - start, "ms");

  process.exit(0);
};

runSeed().catch((err) => {
  console.error("❌ Seed failed");
  console.error(err);
  process.exit(1);
});
