"use client";

import Navbar from "@/components/Navbar";
import axios from "axios";
import { useState } from "react";

export default function LoginPage() {

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

    try {

      const response = await axios.get(
        `http://localhost:5000/auth/login?email=${email}&password=${password}`
      );

      console.log(response.data);

      alert("Login berhasil!");

    } catch (error) {

      console.log(error);

      alert("Login gagal!");

    }

  };

  return (
    <>
      <Navbar />

      <div className="p-10">
        <h1 className="text-3xl font-bold mb-5">
          Login
        </h1>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-3 max-w-md"
        >

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
            className="bg-green-600 text-white p-2 rounded"
          >
            Login
          </button>

        </form>
      </div>
    </>
  );
}