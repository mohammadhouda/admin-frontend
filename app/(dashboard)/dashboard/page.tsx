'use client';
import { useUser } from "@/context/UserContext";
import Loading from "../../loading";

export default function DashboardPage() {
  const { user, loading } = useUser();

  if (loading) return <Loading />;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p className="text-gray-600">Welcome {user?.name || "Admin"}</p>
    </div>
  );
}