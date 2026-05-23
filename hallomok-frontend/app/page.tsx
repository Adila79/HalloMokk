"use client";

import { useState } from "react";

export default function Home() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // onSubmit
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  // VALIDASI
  if (!email || !password) {
    alert("Email dan Password wajib diisi!");
    return;
  }

  alert("Login berhasil!");

  console.log({
    email,
    password,
  });
};

  // onClick
  const handleClick = () => {
    console.log("Tombol login diklik");
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-lg w-80"
      >

        <h1 className="text-2xl font-bold mb-5 text-center">
          Login HalloMok
        </h1>

        {/* onChange */}
        <input
          type="email"
          placeholder="Masukkan Email"
          className="border p-2 w-full mb-3 rounded"
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* onChange */}
        <input
          type="password"
          placeholder="Masukkan Password"
          className="border p-2 w-full mb-4 rounded"
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* onClick */}
        <button
          type="submit"
          onClick={handleClick}
          className="bg-blue-500 hover:bg-blue-600 text-white p-2 w-full rounded"
        >
          Login
        </button>

      </form>

    </div>
  );
}