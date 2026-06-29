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
    <main className="min-h-screen flex items-center justify-center bg-[radial-gradient(circle_at_top_left,_rgba(7,89,133,0.22),_transparent_22%),radial-gradient(circle_at_bottom_right,_rgba(5,150,105,0.24),_transparent_28%),linear-gradient(135deg,_#0f172a_0%,_#064e3b_48%,_#0f766e_100%)] p-4 sm:p-6">
      <div className="w-full max-w-md rounded-[32px] border border-white/20 bg-slate-950/70 p-6 text-white shadow-[0_20px_70px_rgba(2,6,23,0.35)] backdrop-blur-xl sm:p-8">

        <h1 className="mb-8 text-center text-2xl font-bold text-emerald-300 sm:text-3xl">
          Register HalloMok
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <div>
            <label className="block mb-2 text-slate-100 font-medium">
              Nama
            </label>

            <input
              type="text"
              placeholder="Masukkan Nama"
              value={nama}
              onChange={(e) =>
                setNama(e.target.value)
              }
              className="w-full rounded-xl border border-white/10 bg-slate-900/80 p-3 text-white outline-none placeholder:text-slate-400 focus:border-emerald-400"
            />
          </div>

          <div>
            <label className="block mb-2 text-slate-100 font-medium">
              Email
            </label>

            <input
              type="email"
              placeholder="Masukkan Email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="w-full rounded-xl border border-white/10 bg-slate-900/80 p-3 text-white outline-none placeholder:text-slate-400 focus:border-emerald-400"
            />
          </div>

          <div>
            <label className="block mb-2 text-slate-100 font-medium">
              Password
            </label>

            <input
              type="password"
              placeholder="Masukkan Password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="w-full rounded-xl border border-white/10 bg-slate-900/80 p-3 text-white outline-none placeholder:text-slate-400 focus:border-emerald-400"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-gradient-to-r from-emerald-600 to-cyan-600 p-3 font-semibold text-white transition hover:shadow-lg"
          >
            Register
          </button>
        </form>

      </div>
    </main>
  );
}