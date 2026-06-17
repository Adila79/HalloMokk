"use client";

import Navbar from "@/components/Navbar";
import { loginUser } from "@/services/api";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      const data = await loginUser({
        email,
        password,
      });

      localStorage.setItem(
        "token",
        data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

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
            className="bg-green-600 text-white p-2"
          >
            Login
          </button>
        </form>
      </div>
    </>
  );
}