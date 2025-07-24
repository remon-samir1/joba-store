import { Sidebar } from "@/components/dashboard/Sidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex  bg-[#FAFAFA]">
      <Sidebar />
      <div className="flex-1 flex flex-col ">
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}
