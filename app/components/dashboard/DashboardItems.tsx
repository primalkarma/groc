"use client";
import { navLinks } from "@/app/(content)/layout";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

import React from "react";

const DashboardItems = () => {
  const pathname = usePathname();
  return (
    <>
      {navLinks.map((link, index) => (
        <Link
          href={link.href}
          key={index}
          className={cn(
            pathname === link.href
              ? "bg-muted text-sky-500"
              : "text-muted-foreground bg-none",
            "flex items-center gap-2 p-4 rounded-lg transition-all hover:bg-primary/10"
          )}
        >
          <link.icon size={20} />
          {link.name}
        </Link>
      ))}
    </>
  );
};

export default DashboardItems;
