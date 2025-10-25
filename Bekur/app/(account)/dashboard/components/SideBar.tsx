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
  SidebarTrigger
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



export default function SideBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Sidebar
        className={`fixed left-0 top-0 h-screen bg-gray-950 text-white z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <SidebarContent className="flex flex-col h-full justify-between bg-gray-50 dark:bg-gray-950">
          <div>
            <SidebarGroup>
              <SidebarGroupLabel className="text-blue-500 font-bold text-lg mb-8 uppercase tracking-wide px-4 mt-4">
                Dashboard
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link
                        href="/dashboard"
                        className="flex items-center gap-3 px-4 py-2 hover:bg-gray-800 rounded-md"
                      >
                        <LayoutDashboard className="w-5 h-5" />
                        Overview
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link
                        href="/dashboard/application"
                        className="flex items-center gap-3 px-4 py-2 hover:bg-gray-800 rounded-md"
                      >
                        <FileText className="w-5 h-5" />
                        Application Details
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link
                        href="/dashboard/payments"
                        className="flex items-center gap-3 px-4 py-2 hover:bg-gray-800 rounded-md"
                      >
                        <CreditCard className="w-5 h-5" />
                        Payments Details
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link
                        href="/dashboard/interview"
                        className="flex items-center gap-3 px-4 py-2 hover:bg-gray-800 rounded-md"
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

          <div className="px-4 mb-4">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link
                    href="/dashboard/settings"
                    className="flex items-center gap-3 px-4 py-2 hover:bg-gray-800 rounded-md"
                  >
                    <Settings className="w-5 h-5" />
                    Settings
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <button className="flex items-center gap-3 px-4 py-2 hover:bg-red-600 rounded-md w-full text-left">
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
