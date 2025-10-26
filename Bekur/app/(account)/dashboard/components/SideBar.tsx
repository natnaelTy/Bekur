"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  FileText,
  CreditCard,
  GraduationCap,
  Settings,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { signOut } from "@/lib/auth-client";
export default function SideBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Sidebar
        className={`fixed left-0 top-0 h-screen bg-gray-950 text-white z-40 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <SidebarContent className="flex flex-col h-full justify-between bg-white dark:bg-gray-950">
          <div>
            <SidebarGroup>
              <SidebarGroupLabel className="text-blue-500 font-bold text-lg mb-8 uppercase tracking-wide px-4 mt-4">
                Dashboard
              </SidebarGroupLabel>

              <SidebarGroupContent>
                <SidebarMenu className="flex flex-col gap-2 text-gray-900 dark:text-gray-100">
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      className="text-base hover:bg-gray-100 dark:hover:bg-gray-900 flex items-center gap-3 px-4 py-2 rounded-md"
                    >
                      <Link href="/dashboard" onClick={() => setIsOpen(false)}>
                        <LayoutDashboard className="w-5 h-5" />
                        Overview
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      className="text-base hover:bg-gray-100 dark:hover:bg-gray-900 flex items-center gap-3 px-4 py-2 rounded-md"
                    >
                      <Link
                        href="/dashboard/application"
                        onClick={() => setIsOpen(false)}
                      >
                        <FileText className="w-5 h-5" />
                        Application Details
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      className="text-base hover:bg-gray-100 dark:hover:bg-gray-900 flex items-center gap-3 px-4 py-2 rounded-md"
                    >
                      <Link
                        href="/dashboard/payments"
                        onClick={() => setIsOpen(false)}
                      >
                        <CreditCard className="w-5 h-5" />
                        Payments Details
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      className="text-base hover:bg-gray-100 dark:hover:bg-gray-900 flex items-center gap-3 px-4 py-2 rounded-md"
                    >
                      <Link
                        href="/dashboard/interview"
                        onClick={() => setIsOpen(false)}
                      >
                        <GraduationCap className="w-5 h-5" />
                        Interview Prep
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </div>

          <div className="px-4 mb-4 text-gray-900 dark:text-gray-100">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  className="text-base hover:bg-gray-100 dark:hover:bg-gray-900 flex items-center gap-3 px-4 py-2 rounded-md"
                >
                  <Link
                    href="/dashboard/settings"
                    onClick={() => setIsOpen(false)}
                  >
                    <Settings className="w-5 h-5" />
                    Settings
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  className="text-base hover:bg-gray-100 dark:hover:bg-gray-900 flex items-center gap-3 px-4 py-2 rounded-md"
                >
                  <button onClick={() => signOut()} className="flex items-center gap-3">
                    <LogOut className="w-5 h-5" />
                    Logout
                  </button>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </div>
        </SidebarContent>
      </Sidebar>
    </>
  );
}
