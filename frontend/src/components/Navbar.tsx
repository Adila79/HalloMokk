"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-green-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        <div className="flex items-center gap-2">
          <span className="text-2xl">⚽</span>
          <h1 className="text-2xl font-bold">
            HalloMokk
          </h1>
        </div>

        <div className="flex gap-6 items-center text-base">
          <Link
            href="/"
            className="hover:text-green-100 transition font-medium"
          >
            Home
          </Link>

          <Link href="/profile">

          Profile

         </Link>

          <Link
            href="/booking"
            className="hover:text-green-100 transition font-medium"
          >
            Booking
          </Link>

          <Link
            href="/lapangan"
            className="hover:text-green-100 transition font-medium"
          >
            Lapangan
          </Link>

          {!user ? (
            <>
              <Link
                href="/login"
                className="bg-white text-green-600 px-4 py-2 rounded-lg font-semibold hover:bg-green-50 transition"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="border-2 border-white px-4 py-2 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <span className="font-semibold">
                Halo, {user.nama}
              </span>

              <button
                onClick={logout}
                className="bg-red-500 px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          )}
        </div>

      </div>
    </nav>
  );
}