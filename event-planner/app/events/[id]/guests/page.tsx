'use client'
import { useState, useEffect } from "react";
import api from "@/lib/axios"
import { useParams } from "next/navigation";

export default function GuestsPage(){
    const {id} = useParams();
    const [guests, setGuests] = useState([]);
    const [form, setForm] = useState({name: '', email: ""});

    const fetchGuests = async () => {
    try {
        const res = await api.get(`/events/${id}/guests`); // ✅ corrected
        setGuests(res.data || []);
    } catch (err) {
        console.error(err);
    }
  };

    const addGuest = async (e:any) => {
        e.preventDefault();
        try{
          await api.post(`/events/${id}/guests`, form);
          setForm({ name: "", email: ""});
          fetchGuests();          
        }catch(err){
          console.error(err);
          alert("Error adding guest. Check backend logs.")
        }

    };

    const sendInvites = async () => {
    try {
        await api.post(`/events/${id}/send-invites`);
        alert("Invitations sent successfully!");
        fetchGuests(); // optional: refresh guests to show ✅ invited
    } catch (err) {
        console.error(err);
        alert("Error sending invitations");
    }
};

    useEffect(() => {
        fetchGuests();
    }, []);

    return (
    <div>
      <h2 className="text-2xl font-semibold mb-3">Manage Guests</h2>

      <form onSubmit={addGuest} className="space-y-2 mb-4">
        <input
          placeholder="Guest Name"
          className="border p-2 w-full"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          placeholder="Guest Email"
          className="border p-2 w-full"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded w-full">
          Add Guest
        </button>
      </form>

      <h3 className="text-lg font-semibold">Guest List</h3>
      <ul className="border rounded p-3 space-y-2">
        {guests.map((g:any) => (
          <li key={g._id} className="border-b pb-1">
            {g.name} — {g.email} {g.invited && "✅ Invited"}
          </li>
        ))}
      </ul>

      <button
        onClick={sendInvites}
        className="mt-4 bg-green-600 text-white px-4 py-2 rounded w-full"
      >
        Send Invitations
      </button>
    </div>
  );
}