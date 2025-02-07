CREATE TYPE "public"."department" AS ENUM('HR', 'Sales', 'Ops', 'Development');--> statement-breakpoint
CREATE TABLE "employee" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "employee_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL,
	"hire_date" date NOT NULL,
	"department" "department",
	"phone" jsonb,
	"address" jsonb
);
