import { Sidebar } from "@/components/dashboard/Sidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen bg-[#FAFAFA] overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-auto">{children}</div>
      </div>
    </div>
  );
}
