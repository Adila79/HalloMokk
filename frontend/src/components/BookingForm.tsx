"use client";

import { useState } from "react";
import Button from "@/components/Button";
import Input from "@/components/Input";

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
    <section className="px-4 sm:px-10 py-12 md:py-20 bg-gray-100">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 sm:p-8 rounded-3xl shadow-lg max-w-md mx-auto"
      >

        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-black">
          Form Booking
        </h2>

        {/* Nama */}
        <label className="block mb-2 font-medium text-black">
          Nama Pemesan
        </label>

        <Input
  type="text"
  value={nama}
  onChange={(e) => setNama(e.target.value)}
  placeholder="Masukkan Nama"
         className="mb-5"
/>

        {/* Tanggal */}
        <label className="block mb-2 font-medium text-black">
          Tanggal Booking
        </label>

        <Input
  type="date"
  value={tanggal}
  onChange={(e) => setTanggal(e.target.value)}
  className="mb-5"
/>

        {/* Button */}
        <Button
  type="submit"
  className="w-full"
>
  Booking Sekarang
</Button>

      </form>

    </section>
  );
}