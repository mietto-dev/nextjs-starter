"use client";
import { Braces, UserRound } from "lucide-react";
import { usePathname } from "next/navigation";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Image from "next/image";

// Menu items.
const items = [
  {
    title: "Employees",
    href: "/employee",
    icon: UserRound,
  },
  {
    title: "API",
    href: "/api/docs",
    icon: Braces,
    target: "_blank",
  },
];

export function Navbar() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-50 w-full border-b border-b-gray-200 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 items-center pl-4">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-10 flex items-center space-x-2">
            <Image src={"/next.svg"} alt="logo" width={60} height={70} />
          </Link>
          <NavigationMenu>
            <NavigationMenuList>
              {items.map((item) => (
                <NavigationMenuItem key={item.href}>
                  <Link href={item.href} legacyBehavior passHref>
                    <NavigationMenuLink
                      className={cn(
                        navigationMenuTriggerStyle(),
                        pathname === item.href &&
                          "bg-accent text-accent-foreground"
                      )}
                      target={item.target}>
                      {<item.icon />}
                      {item.title}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    </header>
  );
}
