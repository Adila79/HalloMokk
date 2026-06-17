"use client";

import { useState } from "react";

export default function BookingForm() {

  const [nama, setNama] = useState("");
  const [tanggal, setTanggal] = useState("");
  
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!nama || !tanggal) {
  setError("Nama dan tanggal wajib diisi!");
  setSuccess("");
  return;
}

setError("");
setSuccess("");

    try {

      const response = await fetch("http://localhost:5000/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nama,
          tanggal,
        }),
      });

      const data = await response.json();

setSuccess(data.message);
setError("");

setNama("");
setTanggal("");
      console.log(data);
}

  catch (error) {

  console.log(error);

  setError("Gagal mengirim booking");
  setSuccess("");

}
  };

  return (
    <section className="px-10 py-20 bg-gray-100">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-3xl shadow-lg max-w-md mx-auto"
      >

        <h2 className="text-3xl font-bold mb-6 text-black">
          Form Booking
        </h2>

        {/* Nama */}
        <label className="block mb-2 font-medium text-black">
          Nama Pemesan
        </label>

        <input
          type="text"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          placeholder="Masukkan Nama"
          className="border p-3 w-full mb-5 rounded-xl text-black"
        />

        {/* Tanggal */}
        <label className="block mb-2 font-medium text-black">
          Tanggal Booking
        </label>

        <input
          type="date"
          value={tanggal}
          onChange={(e) => setTanggal(e.target.value)}
          className="border p-3 w-full mb-5 rounded-xl text-black"
        />

        {/* Button */}
        <button
          type="submit"
          className="bg-sky-300 hover:bg-sky-400 text-black p-3 w-full rounded-xl"
        >
          Booking Sekarang
        </button>

      </form>

    </section>
  );
}