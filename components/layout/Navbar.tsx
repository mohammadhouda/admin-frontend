'use client';
import Logo from "@/components/logo";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { useUser } from "@/context/UserContext";

export default function Navbar() {
  const { user, loading } = useUser();

  return (
    <header className="bg-white shadow px-6 py-2 flex justify-between sticky top-0 items-center z-10">
      <div>
        <Logo className="w-50 h-12.5" />
      </div>
      <div className="flex items-center gap-4">
        <span>{loading ? "Loading..." : user?.email || "Admin"}</span>
        <button className="px-3 py-1 cursor-pointer">
          <UserCircleIcon className="h-6 w-6 cursor-pointer" />
        </button>
      </div>
    </header>
  );
}