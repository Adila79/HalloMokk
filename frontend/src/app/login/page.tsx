"use client";

import { loginUser } from "@/services/api";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Email dan Password wajib diisi!");
      return;
    }

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      alert("Format email tidak valid!");
      return;
    }

    try {
      const data = await loginUser({
        email,
        password,
      });

      // simpan token

localStorage.setItem(

"token",

data.token

);

// simpan data user

localStorage.setItem(

"user",

JSON.stringify(data.user)

);

// simpan ke Context API

login(data.user);

// simpan data user
localStorage.setItem(
  "user",
  JSON.stringify(data.user)
);

// simpan user ke Context API
login(data.user);

      alert("Login berhasil");

      router.push("/");
    } catch (error: any) {
      alert(
        error?.response?.data?.message ||
          "Login gagal"
      );
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-sky-100 p-6">
      <div className="bg-white p-8 rounded-3xl shadow-lg w-full max-w-md">

        <h1 className="text-3xl font-bold text-center text-sky-400 mb-8">
          Login HalloMok
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

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
            Login
          </button>

        </form>

      </div>
    </main>
  );
}