"use client";

import { registerUser } from "@/services/api";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
  const router = useRouter();

  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!nama || !email || !password) {
      alert("Semua field wajib diisi!");
      return;
    }

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      alert("Format email tidak valid!");
      return;
    }

    if (nama.trim().length < 3) {
      alert("Nama minimal 3 karakter!");
      return;
    }

    if (password.length < 6) {
      alert("Password minimal 6 karakter!");
      return;
    }

    try {
      await registerUser({
        nama,
        email,
        password,
      });

      alert("Register berhasil!");

      router.push("/login");
    } catch (error: any) {
      alert(
        error?.response?.data?.message ||
          "Register gagal"
      );
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-3xl shadow-lg w-full max-w-md">

        <h1 className="text-3xl font-bold text-center text-sky-400 mb-8">
          Register HalloMok
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <div>
            <label className="block mb-2 text-black font-medium">
              Nama
            </label>

            <input
              type="text"
              placeholder="Masukkan Nama"
              value={nama}
              onChange={(e) =>
                setNama(e.target.value)
              }
              className="w-full border p-3 rounded-xl text-black"
            />
          </div>

          <div>
            <label className="block mb-2 text-black font-medium">
              Email
            </label>

            <input
              type="email"
              placeholder="Masukkan Email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="w-full border p-3 rounded-xl text-black"
            />
          </div>

          <div>
            <label className="block mb-2 text-black font-medium">
              Password
            </label>

            <input
              type="password"
              placeholder="Masukkan Password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="w-full border p-3 rounded-xl text-black"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-sky-300 hover:bg-sky-400 text-black p-3 rounded-xl font-semibold transition"
          >
            Register
          </button>
        </form>

      </div>
    </main>
  );
}