"use client";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";

export default function EventsPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const res = await api.get("/events");
      return res.data;
    },
  });

  if (isLoading) return <p>Loading events...</p>;
  if (error) return <p>Failed to load events</p>;

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">My Events</h2>
      <a href="/create-event" className="text-blue-600 underline">
        + Create Event
      </a>
      <ul className="mt-4 space-y-2">
        {data.map((ev:any) => (
          <li key={ev._id} className="border p-3 rounded shadow-sm">
            <strong>{ev.name}</strong> — {ev.date} <br />
            📍 {ev.location}
            <p className="text-sm mt-1">{ev.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
