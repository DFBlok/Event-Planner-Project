"use client";
import { useState } from "react";
import api from "@/lib/axios";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const router = useRouter();

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", form);
      alert("Registered successfully!");
      router.push("/");
    } catch (err:any) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Create Account</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          name="username"
          placeholder="Username"
          className="border p-2 w-full"
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />
        <input
          name="email"
          placeholder="Email"
          className="border p-2 w-full"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="border p-2 w-full"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded w-full">
          Register
        </button>
      </form>
      <p className="mt-3 text-sm">
        Already have an account?{" "}
        <a href="/" className="text-blue-500 underline">
          Login
        </a>
      </p>
    </div>
  );
}
