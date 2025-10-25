import SideBar from "./components/SideBar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  
  return (
    <SidebarProvider className="bg-gray-50 dark:bg-gray-950 px-3">
      <SideBar />
      <SidebarTrigger className="block lg:hidden absolute top-20 left-3" />
        {children}
    </SidebarProvider>
  );
}
