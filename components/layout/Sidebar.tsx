"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    { label: "Dashboard", href: "/" },
    { label: "Users", href: "/users" },
    { label: "Donations", href: "/donations" },
    { label: "Requests", href: "/requests" },
    { label: "Reports", href: "/reports" },
    { label: "Settings", href: "/settings" },
  ];

  return (
    <aside className="w-64 bg-gray-800 text-white h-screen p-4 flex flex-col">
      <h1 className="text-2xl font-bold mb-6">Hope Link Admin</h1>
      <nav className="flex-1 flex flex-col gap-2">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`p-2 rounded hover:bg-gray-700 ${
              pathname === item.href ? "bg-gray-700" : ""
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="mt-auto">
        <button className="w-full py-2 bg-red-600 rounded hover:bg-red-500">
          Logout
        </button>
      </div>
    </aside>
  );
}
