import { Employee } from "@/lib/db/schema";
import {
  ListCard,
  ListCardCover,
  ListCardHeader,
  ListCardTitle,
  ListCardDescription,
  ListCardBody,
  ListCardFooter,
  ListCardContent,
} from "@/components/employee/list-card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { X as XIcon } from "lucide-react";
import { formatDate, formatElapsed } from "@/lib/utils/date";
import { TooltipSimple } from "@/components/interaction/tooltip";
import Link from "next/link";

export const EmployeeListItem = ({ employee }: { employee: Employee }) => {
  const now = new Date();
  return (
    <ListCard>
      <ListCardCover>
        <Image
          src={employee.picture || `/person.svg`}
          alt="Avatar placeholder"
          width={150}
          height={150}
          sizes="(max-width: 200px) 100vw"
          className="p-2"
        />
      </ListCardCover>
      <ListCardBody>
        <ListCardHeader>
          <ListCardTitle>{employee.name}</ListCardTitle>
          <ListCardDescription>{`(${employee.department})`}</ListCardDescription>
        </ListCardHeader>
        <ListCardContent>
          <label>Hire Date</label>
          <p className="text-sm text-muted-foreground">{`${formatDate(
            employee.hireDate
          )} (${formatElapsed(employee.hireDate, now)})`}</p>
        </ListCardContent>
      </ListCardBody>
      <ListCardFooter>
        <Link href={`/employee/details/${employee.id}`}>
          <Button className="px-8">View Details</Button>
        </Link>
        <TooltipSimple content="Delete employee">
          <Link href={`/employee/delete/${employee.id}`}>
            <Button variant={"ghost"} className="p-2">
              <XIcon color="#F00" strokeWidth={5} />
            </Button>
          </Link>
        </TooltipSimple>
      </ListCardFooter>
    </ListCard>
  );
};
