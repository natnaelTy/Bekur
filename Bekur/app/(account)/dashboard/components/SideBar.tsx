"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import {
  IconLayoutDashboard,
  IconFileDescription,
  IconCreditCard,
  IconBrandSpacehey,
  IconSettings,
  IconLogout,
} from "@tabler/icons-react";
import Link from "next/link";
import { signOut } from "@/lib/auth-client";
import Image from "next/image";
import { NavMain } from "@/components/nav-main";
export default function SideBar() {
  return (
    <>
      <Sidebar collapsible="offcanvas">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton className="data-[slot=sidebar-menu-button]:!p-1.5">
                <span className="text-base font-semibold flex items-center gap-2">
                  <Image src="/bekur.png" width={120} height={120} alt="Bekur" />
                </span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>

        <SidebarContent className="flex flex-col h-full">
          <SidebarGroup>
            <NavMain
              items={[
                { title: "Overview", url: "/dashboard", icon: IconLayoutDashboard },
                { title: "Application Details", url: "/dashboard/application_details", icon: IconFileDescription },
                { title: "Payments Details", url: "/dashboard/payments_details", icon: IconCreditCard },
                { title: "Interview Prep", url: "/dashboard/interview_prep", icon: IconBrandSpacehey },
              ]}
            />
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
          <div className="px-2 mb-2 text-gray-900 dark:text-gray-100">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="text-base flex items-center gap-3 px-3 py-2 rounded-md">
                  <Link href="/dashboard/settings">
                    <IconSettings className="w-5 h-5" />
                    <span>Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton className="text-base flex items-center gap-3 px-3 py-2 rounded-md" onClick={() => signOut()}>
                  <IconLogout className="w-5 h-5" />
                  <span>Logout</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </div>
        </SidebarFooter>
      </Sidebar>
    </>
  );
}
