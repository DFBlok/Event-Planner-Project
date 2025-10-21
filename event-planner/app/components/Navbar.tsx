"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const logout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  return (
    <nav className="bg-blue-600 text-white px-6 py-3 flex justify-between">
      <h1 className="font-semibold">🎉 Event Planner</h1>
      <div className="space-x-4">
        <Link href="/events">Events</Link>
        <Link href="/create-event">Create</Link>
        <button onClick={logout}>Logout</button>
      </div>
    </nav>
  );
}
