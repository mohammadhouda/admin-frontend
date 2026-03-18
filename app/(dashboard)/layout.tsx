import Sidebar from "../../components/layout/Sidebar";
import Navbar from "../../components/layout/Navbar";
import { UserProvider } from "@/context/UserContext";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UserProvider>
      <ProtectedRoute>
        <div className="flex flex-col min-h-screen bg-gray-100">
          <Navbar />
          <div className="flex flex-1">
            <Sidebar />
            <main className="flex-1 p-6">{children}</main>
          </div>
        </div>
      </ProtectedRoute>
    </UserProvider>
  );
}
