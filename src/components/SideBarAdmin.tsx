"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { BsPersonVideo2 } from "react-icons/bs";
import { GiBookCover } from "react-icons/gi";
import { IoBookSharp } from "react-icons/io5";
import { LogoutButton } from "./auth/LogoutButtonComponent";
interface SidebarItemProps {
  name: string;
  href: string;
  icon: React.ElementType;
}

const sidebarItems: SidebarItemProps[] = [
  {
    name: "Manage Books",
    href: "/admin/books",
    icon: IoBookSharp,
  },
  {
    name: "Manage Publishers",
    href: "/admin/publishers",
    icon: GiBookCover,
  },
  {
    name: "Manage Author",
    href: "/admin/authors",
    icon: BsPersonVideo2,
  },
];

export function AppSidebar() {
  return (
    <Sidebar
      className={cn(
        "fixed top-0 left-0 z-50 h-screen transition-transform duration-300 ease-in-out",
        "text-white bg-white/10 border-r border-slate-200 w-64 flex flex-col", // Original classes (changed bg-background to bg-white/20)
        "backdrop-blur-lg", // Glassmorphism effect
        "rounded-r-xl" // Rounded right border (adjust size as needed, e.g., rounded-r-lg or rounded-r-2xl)
      )}
    >
      {/* Header */}
      <SidebarHeader className="p-4 border-b border-border">
        <h1 className="text-2xl font-bold tracking-tight">Books Management</h1>
      </SidebarHeader>

      {/* Content */}
      <SidebarContent className="flex-1 p-2">
        <SidebarGroup className="space-y-1">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all",
                  "hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <Icon className="h-5 w-5" />
                {item.name}
              </Link>
            );
          })}
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="p-4 border-t border-border">
        <LogoutButton />
      </SidebarFooter>
    </Sidebar>
  );
}
