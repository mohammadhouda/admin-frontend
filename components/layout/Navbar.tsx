export default function Navbar() {
  return (
    <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <div>
        <h2 className="text-xl font-semibold">Admin Panel</h2>
      </div>
      <div className="flex items-center gap-4">
        <span>Admin</span>
        <button className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300">
          Profile
        </button>
      </div>
    </header>
  );
}
