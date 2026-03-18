'use client';
import { useState, useEffect } from "react";
import api from "@/lib/axios";
import Loading from "@/app/loading";
import { useRouter } from "next/navigation";
// icon view
import { CheckCircleIcon, XCircleIcon, EyeIcon} from "@heroicons/react/24/solid";

interface Charity {
  id: number;
  name: string;
  description: string;
  logoUrl: string;
  city: string;
  category: string;
  isVerified: boolean;
  user: {
    id: number;
    email: string;
    isActive: boolean;
  };
}

export default function NGOs() {
  const [charities, setCharities] = useState<Charity[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchCharities = async () => {
      try {
        const res = await api.get("/api/charities");
        setCharities(res.data.data);
      } catch (err) {
        console.error("Fetching charities failed", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCharities();
  }, []);

  if (loading)
    return <Loading />;

  if (charities.length === 0)
    return (
      <div className="text-center py-20 text-gray-400">
        No charities found
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto">
      <div className="overflow-x-auto rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr className="text-center">
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Logo
              </th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                City
              </th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {charities.map((charity) => (
              <tr key={charity.id} className="hover:bg-gray-50 text-center">
                <td className="px-6 py-4 whitespace-nowrap">
                  <img
                    src= "test1.jpg"
                    alt={`${charity.name} logo`}
                    className="h-10 w-10 rounded-full object-cover mx-auto"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{charity.name}</div>
                  <div className="text-xs text-gray-500">{charity.user.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {charity.city}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {charity.category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {charity.isVerified ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      <CheckCircleIcon className="h-4 w-4 mr-1" />
                      Verified
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-500">
                      <XCircleIcon className="h-4 w-4 mr-1" />
                      Unverified
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    className="text-blue-600 hover:text-blue-900 font-medium cursor-pointer"
                    onClick={() => {
                      // Navigate to charity details page
                      router.push(`/charities/${charity.id}`);
                    }}
                  >
                    
                  <EyeIcon className="h-5 w-5 inline-block mr-1" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
