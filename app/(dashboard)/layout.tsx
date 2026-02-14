import Sidebar from "../../components/layout/Sidebar";
import Navbar from "../../components/layout/Navbar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
