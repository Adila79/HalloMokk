"use client";

import { useState } from "react";

export default function Home() {

  const [lapangan] = useState([
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

  const [nama, setNama] = useState("");
  const [tanggal, setTanggal] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

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
    <main className="min-h-screen bg-gray-100 text-black">

      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-5 bg-white shadow-md">

        <h1 className="text-2xl font-bold text-sky-400">
          HalloMok
        </h1>

        <ul className="flex gap-6 font-medium text-black">

          <li className="hover:text-sky-400 cursor-pointer">
            Home
          </li>

          <li className="hover:text-sky-400 cursor-pointer">
            Lapangan
          </li>

          <li className="hover:text-sky-400 cursor-pointer">
            Booking
          </li>

        </ul>

        <button className="px-5 py-2 text-black bg-sky-300 rounded-xl hover:bg-sky-400">
          Login
        </button>

      </nav>

      {/* Hero Section */}
      <section className="grid items-center grid-cols-1 md:grid-cols-2 gap-10 px-10 py-20 max-w-7xl mx-auto">

        {/* Text */}
        <div>

          <p className="text-sky-400 font-semibold mb-3 uppercase">
            Booking Lapangan Online
          </p>

          <h1 className="text-5xl font-bold leading-tight mb-6 text-black">
            Main Futsal
            <span className="text-sky-400">
              {" "}Lebih Mudah
            </span>
          </h1>

          <p className="text-black text-lg mb-8">
            Pesan lapangan futsal favoritmu kapan saja
            dan dimana saja dengan sistem booking online.
          </p>

          <div className="flex gap-4">

            <button className="bg-sky-300 hover:bg-sky-400 text-black px-6 py-3 rounded-2xl">
              Booking Sekarang
            </button>

            <button className="border-2 border-sky-400 text-black hover:bg-sky-400 px-6 py-3 rounded-2xl">
              Lihat Lapangan
            </button>

          </div>

        </div>

        {/* Image */}
        <div>
          <img
            src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1200&auto=format&fit=crop"
            alt="Futsal"
            className="rounded-3xl shadow-2xl w-full"
          />
        </div>

      </section>

      {/* Daftar Lapangan */}
      <section className="px-10 pb-10">

        <h1 className="text-3xl font-bold mb-6 text-black">
          Daftar Lapangan
        </h1>

        <div className="grid md:grid-cols-2 gap-4 mb-10">

          {lapangan.map((item) => (
            <div
              key={item.id}
              className="bg-white p-6 rounded-2xl shadow"
            >
              <h2 className="text-2xl font-semibold mb-2 text-black">
                {item.nama}
              </h2>

              <p className="text-black">
                Harga: Rp {item.harga}
              </p>
            </div>
          ))}

        </div>

      </section>

      {/* Form Booking */}
      <section className="px-10 pb-20">

        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-3xl shadow-lg max-w-md"
        >

          <h2 className="text-2xl font-bold mb-6 text-black">
            Form Booking
          </h2>

          {/* Nama */}
          <label className="block mb-2 font-medium text-black">
            Nama Pemesan
          </label>

          <input
            type="text"
            placeholder="Masukkan Nama"
            title="Input nama pemesan"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            className="border p-3 w-full mb-5 rounded-xl text-black"
          />

          {/* Tanggal */}
          <label className="block mb-2 font-medium text-black">
            Pilih Tanggal
          </label>

          <input
            type="date"
            title="Pilih tanggal booking"
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

    </main>
  );
}