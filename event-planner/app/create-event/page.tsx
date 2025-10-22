"use client";
import { useState } from "react";
import api from "@/lib/axios";
import { useRouter } from "next/navigation";

export default function CreateEventPage() {
  const [form, setForm] = useState({
    name: "",
    date: "",
    location: "",
    description: "",
  });
  const router = useRouter();

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    try {
      await api.post("/events", form);
      alert("Event created!");
      router.push("/events");
    } catch (err:any) {
      alert(err.response?.data?.message || "Failed to create event");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <h2 className="text-2xl font-semibold">Create Event</h2>
      <input
        name="name"
        placeholder="Event Name"
        className="border p-2 w-full"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        name="date"
        type="date"
        className="border p-2 w-full"
        onChange={(e) => setForm({ ...form, date: e.target.value })}
      />
      <input
        name="location"
        placeholder="Location"
        className="border p-2 w-full"
        onChange={(e) => setForm({ ...form, location: e.target.value })}
      />
      <textarea
        name="description"
        placeholder="Description"
        className="border p-2 w-full"
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />
      <button className="bg-blue-600 text-white px-4 py-2 rounded w-full">
        Save Event
      </button>
    </form>
  );
}
