"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "../../../lib/axios";

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<{ name: string } | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/api/admin/me");
        setUser(res.data);
      } catch (err) {
        console.error("Auth check failed", err);
        // redirect safely
        router.replace("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [router]);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p className="text-gray-600">Welcome {user?.name}</p>
    </div>
  );
}
