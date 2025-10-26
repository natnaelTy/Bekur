"use client";

import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import SideBar from "./components/SideBar";
import { usePathname } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950 w-full">
        <SideBar />

        <SidebarInset>
          <header className=" md:hidden absolute w-full top-0 z-50 left-0 bg-white dark:bg-gray-950 px-4 h-16 flex items-center justify-between">
            <SidebarTrigger />
          </header>

          <main className="flex-1 overflow-y-auto">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
