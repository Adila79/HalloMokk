"use client";

import { useEffect, useState } from "react";

export default function Home() {

  // State data lapangan
  const [lapangan, setLapangan] = useState<any[]>([]);

  // State form booking
  const [nama, setNama] = useState("");
  const [tanggal, setTanggal] = useState("");
  useEffect(() => {

  fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => response.json())
    .then((data) => {
      setLapangan(data);
    });

}, []);

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
    <div className="p-10 bg-gradient-to-br from-blue-100 to-gray-100 min-h-screen">

      <h1 className="text-4xl font-extrabold mb-8 text-blue-600">
        Daftar Lapangan
      </h1>

      {/* Data Lapangan */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">

        {lapangan.map((item) => (
          <div
            key={item.id}
            className="bg-white p-6 rounded-2xl shadow-md hover:shadow-2xl transition duration-300 border border-gray-200"
          >
            <h2 className="text-xl font-semibold">
              {item.name}
            </h2>

            <p>
              Email: {item.email}
            </p>
          </div>
        ))}

      </div>

      {/* Form Booking */}
      <form
        onSubmit={handleSubmit}
        className="bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-2xl max-w-md border border-gray-200"
      >

        <h2 className="text-3xl font-extrabold mb-6 text-blue-600">
          Form Booking
        </h2>

        <p className="text-gray-500 mb-6">
          Silakan isi data booking lapangan
        </p>

        {/* Input Nama */}
        <div className="mb-5">

          <label className="block mb-2 font-semibold text-gray-700">
            Nama Pemesan
          </label>

          <input
            type="text"
            placeholder="Masukkan Nama"
            title="Input nama pemesan"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            className="border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none p-3 w-full rounded-xl transition"
          />

        </div>

        {/* Input Tanggal */}
        <div className="mb-6">

          <label className="block mb-2 font-semibold text-gray-700">
            Pilih Tanggal
          </label>

          <input
            type="date"
            title="Pilih tanggal booking"
            value={tanggal}
            onChange={(e) => setTanggal(e.target.value)}
            className="border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none p-3 w-full rounded-xl transition"
          />

        </div>

        {/* Tombol Submit */}
        <button
          type="submit"
          className="bg-gradient-to-r from-blue-500 to-blue-700 hover:scale-105 hover:shadow-xl transition duration-300 text-white font-semibold p-3 w-full rounded-xl"
        >
          Booking Sekarang
        </button>

      </form>

    </div>
  );
}