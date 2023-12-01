"use client";

import React from "react";
import { useParams, usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "../lib/utils";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";

const MainNav = ({ className, ...props }) => {
  const pathname = usePathname();
  const params = useParams();

  const routes = [
    {
      href: `/${params.storeId}`,
      label: "Overview",
      active: pathname === `/${params.storeId}`,
      hover: "Get the overview and details of all the orders.",
    },
    {
      href: `/${params.storeId}/billboards`,
      label: "Billboards",
      active: pathname === `/${params.storeId}/billboards`,
      hover: "Create and customize your billboards here!",
    },
    {
      href: `/${params.storeId}/categories`,
      label: "Categories",
      active: pathname === `/${params.storeId}/categories`,
      hover: "Add and customize product categories...",
    },
    {
      href: `/${params.storeId}/sizes`,
      label: "Sizes",
      active: pathname === `/${params.storeId}/sizes`,
      hover: "Create different sizes for your products!",
    },
    {
      href: `/${params.storeId}/products`,
      label: "Products",
      active: pathname === `/${params.storeId}/products`,
      hover: "Create and edit your products here!",
    },
    {
      href: `/${params.storeId}/orders`,
      label: "Orders",
      active: pathname === `/${params.storeId}/orders`,
      hover: "Get the details of all the orders!",
    },
    {
      href: `/${params.storeId}/settings`,
      label: "Settings",
      active: pathname === `/${params.storeId}/settings`,
      hover: "Edit your store here.",
    },
  ];

  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)}>
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            route.active
              ? "text-primary light:text-black"
              : "text-muted-foreground"
          )}
        >
          <HoverCard>
            <HoverCardTrigger>{route.label}</HoverCardTrigger>
            <HoverCardContent>{route?.hover}</HoverCardContent>
          </HoverCard>
        </Link>
      ))}
    </nav>
  );
};

export default MainNav;
