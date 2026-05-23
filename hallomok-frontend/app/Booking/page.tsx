"use client";

import { useState } from "react";

export default function BookingPage() {

  const [nama, setNama] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [jam, setJam] = useState("");

  // onSubmit
  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();

    alert("Booking berhasil!");

    console.log({
      nama,
      tanggal,
      jam,
    });
  };

  // onClick
  const handleClick = () => {
    console.log("Tombol booking diklik");
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">

      <form
        onSubmit={handleBooking}
        className="bg-white p-6 rounded-xl shadow-lg w-80"
      >

        <h1 className="text-2xl font-bold mb-5 text-center">
          Booking Lapangan
        </h1>

        {/* onChange */}
        <input
          type="text"
          placeholder="Nama"
          className="border p-2 w-full mb-3 rounded"
          onChange={(e) => setNama(e.target.value)}
        />

        {/* onChange */}
        <input
          type="date"
          className="border p-2 w-full mb-3 rounded"
          onChange={(e) => setTanggal(e.target.value)}
        />

        {/* onChange */}
        <input
          type="time"
          className="border p-2 w-full mb-4 rounded"
          onChange={(e) => setJam(e.target.value)}
        />

        {/* onClick */}
        <button
          type="submit"
          onClick={handleClick}
          className="bg-green-500 hover:bg-green-600 text-white p-2 w-full rounded"
        >
          Booking
        </button>

      </form>

    </div>
  );
}