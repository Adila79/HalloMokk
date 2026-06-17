"use client";

import Navbar from "@/components/Navbar";
import { registerUser } from "@/services/api";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
  const router = useRouter();

  const [nama, setNama] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      await registerUser({
        nama,
        email,
        password,
      });

      alert("Register berhasil");

      router.push("/login");
    } catch (error: any) {
      alert(
        error?.response?.data?.message ||
          "Register gagal"
      );
    }
  };

  return (
    <>
      <Navbar />

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
    </>
  );
}