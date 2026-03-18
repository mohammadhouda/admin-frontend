'use client';
import { useState, useEffect, useMemo } from "react";
import api from "@/lib/axios";
import Loading from "@/app/loading";
import { useRouter } from "next/navigation";
import {
  XCircleIcon,
  EyeIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  BuildingOfficeIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { CheckCircleIcon as CheckCircleSolid } from "@heroicons/react/24/solid";

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

const ITEMS_PER_PAGE = 8;

export default function NGOs() {
  const [charities, setCharities] = useState<Charity[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "verified" | "unverified">("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [cityFilter, setCityFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
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

  // Derive unique categories and cities for filter dropdowns
  const categories = useMemo(
    () => [...new Set(charities.map((c) => c.category))].sort(),
    [charities]
  );
  const cities = useMemo(
    () => [...new Set(charities.map((c) => c.city))].sort(),
    [charities]
  );

  // Filtered + searched data
  const filtered = useMemo(() => {
    return charities.filter((c) => {
      const matchesSearch =
        search === "" ||
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.user.email.toLowerCase().includes(search.toLowerCase()) ||
        c.city.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "verified" && c.isVerified) ||
        (statusFilter === "unverified" && !c.isVerified);

      const matchesCategory = categoryFilter === "all" || c.category === categoryFilter;
      const matchesCity = cityFilter === "all" || c.city === cityFilter;

      return matchesSearch && matchesStatus && matchesCategory && matchesCity;
    });
  }, [charities, search, statusFilter, categoryFilter, cityFilter]);

  // Pagination
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, statusFilter, categoryFilter, cityFilter]);

  const activeFilterCount = [statusFilter !== "all", categoryFilter !== "all", cityFilter !== "all"].filter(Boolean).length;

  const clearFilters = () => {
    setStatusFilter("all");
    setCategoryFilter("all");
    setCityFilter("all");
    setSearch("");
  };

  if (loading) return <Loading />;

  return (
    <div className="max-w-7xl mx-auto space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">NGOs</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {filtered.length} {filtered.length === 1 ? "organization" : "organizations"} found
          </p>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 space-y-3">
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, email, or city..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-300 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <XMarkIcon className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg border transition-all cursor-pointer ${
              showFilters || activeFilterCount > 0
                ? "border-blue-200 bg-blue-50 text-blue-700"
                : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            <FunnelIcon className="h-4 w-4" />
            Filters
            {activeFilterCount > 0 && (
              <span className="flex items-center justify-center h-5 w-5 rounded-full bg-blue-600 text-white text-xs font-semibold">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>

        {/* Filter Dropdowns */}
        {showFilters && (
          <div className="flex items-center gap-3 pt-2 border-t border-gray-100 flex-wrap">
            {/* Status */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as "all" | "verified" | "unverified")}
              className="px-3 py-2 text-sm rounded-lg border border-gray-200 bg-gray-50 focus:border-blue-300 focus:ring-2 focus:ring-blue-100 outline-none cursor-pointer"
            >
              <option value="all">All Statuses</option>
              <option value="verified">Verified</option>
              <option value="unverified">Unverified</option>
            </select>

            {/* Category */}
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2 text-sm rounded-lg border border-gray-200 bg-gray-50 focus:border-blue-300 focus:ring-2 focus:ring-blue-100 outline-none cursor-pointer"
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            {/* City */}
            <select
              value={cityFilter}
              onChange={(e) => setCityFilter(e.target.value)}
              className="px-3 py-2 text-sm rounded-lg border border-gray-200 bg-gray-50 focus:border-blue-300 focus:ring-2 focus:ring-blue-100 outline-none cursor-pointer"
            >
              <option value="all">All Cities</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>

            {activeFilterCount > 0 && (
              <button
                onClick={clearFilters}
                className="px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
              >
                Clear all
              </button>
            )}
          </div>
        )}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-gray-400">
            <BuildingOfficeIcon className="h-12 w-12 mb-3 text-gray-300" />
            <p className="text-sm font-medium text-gray-500">No organizations match your filters</p>
            <p className="text-xs text-gray-400 mt-1">Try adjusting your search or filters</p>
            {activeFilterCount > 0 && (
              <button
                onClick={clearFilters}
                className="mt-3 text-sm text-blue-600 hover:text-blue-700 font-medium cursor-pointer"
              >
                Clear all filters
              </button>
            )}
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Organization
                    </th>
                    <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      City
                    </th>
                    <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3.5 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paginated.map((charity, idx) => (
                    <tr
                      key={charity.id}
                      className={`group transition-colors hover:bg-gray-50/80 ${
                        idx !== paginated.length - 1 ? "border-b border-gray-50" : ""
                      }`}
                    >
                      {/* Organization — combined logo + name + email */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center overflow-hidden flex-shrink-0">
                            {charity.logoUrl ? (
                              <img
                                src="test1.jpg"
                                alt={charity.name}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <BuildingOfficeIcon className="h-5 w-5 text-gray-400" />
                            )}
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {charity.name}
                            </p>
                            <p className="text-xs text-gray-500 truncate">
                              {charity.user.email}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-600">{charity.city}</span>
                      </td>

                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700">
                          {charity.category}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        {charity.isVerified ? (
                          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700">
                            <CheckCircleSolid className="h-4 w-4 text-emerald-500" />
                            Verified
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-500">
                            <XCircleIcon className="h-4 w-4 text-gray-400" />
                            Unverified
                          </span>
                        )}
                      </td>

                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => router.push(`/charities/${charity.id}`)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-100 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-all cursor-pointer opacity-0 group-hover:opacity-100"
                        >
                          <EyeIcon className="h-3.5 w-3.5" />
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between px-6 py-3.5 border-t border-gray-100">
                <p className="text-xs text-gray-500">
                  Showing{" "}
                  <span className="font-medium text-gray-700">
                    {(currentPage - 1) * ITEMS_PER_PAGE + 1}
                  </span>
                  {" – "}
                  <span className="font-medium text-gray-700">
                    {Math.min(currentPage * ITEMS_PER_PAGE, filtered.length)}
                  </span>
                  {" of "}
                  <span className="font-medium text-gray-700">{filtered.length}</span>
                </p>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                  >
                    <ChevronLeftIcon className="h-4 w-4" />
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`h-8 w-8 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                        page === currentPage
                          ? "bg-blue-600 text-white"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                  >
                    <ChevronRightIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}