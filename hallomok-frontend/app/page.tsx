"use client";

import { useState } from "react";

export default function Home() {

  // State data lapangan
  const [lapangan, setLapangan] = useState([
    {
      id: 1,
      nama: "Lapangan Futsal",
      harga: 100000,
    },
    {
      id: 2,
      nama: "Lapangan Badminton",
      harga: 75000,
    },
  ]);

  // State form booking
  const [nama, setNama] = useState("");
  const [tanggal, setTanggal] = useState("");

  // Submit booking
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validasi
    if (!nama || !tanggal) {
      alert("Nama dan tanggal wajib diisi!");
      return;
    }

    alert(`
Booking berhasil!
Nama: ${nama}
Tanggal: ${tanggal}
    `);

    console.log({
      nama,
      tanggal,
    });
  };

  return (
    <div className="p-10 bg-gray-100 min-h-screen">

      <h1 className="text-3xl font-bold mb-6">
        Daftar Lapangan
      </h1>

      {/* Data Lapangan */}
      <div className="grid gap-4 mb-10">

        {lapangan.map((item) => (
          <div
            key={item.id}
            className="bg-white p-4 rounded-lg shadow"
          >
            <h2 className="text-xl font-semibold">
              {item.nama}
            </h2>

            <p>
              Harga: Rp {item.harga}
            </p>
          </div>
        ))}

      </div>

      {/* Form Booking */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-lg max-w-md"
      >

        <h2 className="text-2xl font-bold mb-5">
          Form Booking
        </h2>

        {/* Input Nama */}
        <label className="block mb-2 font-medium">
          Nama Pemesan
        </label>

        <input
          type="text"
          placeholder="Masukkan Nama"
          title="Input nama pemesan"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          className="border p-2 w-full mb-4 rounded"
        />

        {/* Input Tanggal */}
        <label className="block mb-2 font-medium">
          Pilih Tanggal
        </label>

        <input
        type="date"
        title="Pilih tanggal booking"
        value={tanggal}
        onChange={(e) => setTanggal(e.target.value)}
        className="border p-2 w-full mb-4 rounded"
      />

        {/* Tombol Submit */}
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white p-2 w-full rounded"
        >
          Booking Sekarang
        </button>

      </form>

    </div>
  );
}