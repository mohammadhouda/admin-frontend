"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "../../../lib/axios";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await axios.post("api/auth/login", { email, password });
      router.push("/");
    } catch (err) {
      setError("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="w-96 p-6 bg-white rounded shadow flex flex-col gap-4"
      onSubmit={handleLogin}
    >
      <h1 className="text-2xl font-bold mb-4 text-center">Admin Login</h1>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full p-2 border rounded"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="w-full p-2 border rounded"
      />

      {error && <p className="text-red-500">{error}</p>}

      <button
        type="submit"
        className="w-full py-2 bg-black text-white rounded hover:bg-gray-800"
        disabled={loading}
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}
