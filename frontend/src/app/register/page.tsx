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
    // register
  } catch (error) {
    // error
  }
};

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-5">
        Register
      </h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 max-w-md"
      >
        <input
          type="text"
          placeholder="Nama"
          className="border p-2"
          value={nama}
          onChange={(e) =>
            setNama(e.target.value)
          }
        />

        <input
          type="email"
          placeholder="Email"
          className="border p-2"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button
          type="submit"
          className="bg-blue-600 text-white p-2"
        >
          Register
        </button>
      </form>
    </div>
  );
}