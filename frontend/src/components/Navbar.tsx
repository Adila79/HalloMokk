"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const handleLinkClick = () => setIsOpen(false);

  return (
    <nav className="relative z-50 border-b border-slate-200/70 bg-gradient-to-r from-slate-950 via-emerald-950 to-cyan-900 text-white shadow-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <img src="/logo.svg" alt="HalloMokk logo" className="h-10 w-10 rounded-full object-cover shadow-lg" />
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white">HalloMokk</h1>
            <p className="text-xs text-emerald-100">Futsal Booking System</p>
          </div>
        </Link>

        <div className="hidden items-center gap-6 text-sm font-medium text-emerald-50 md:flex">
          <Link href="/" className="transition hover:text-white">Home</Link>
          <Link href="/lapangan" className="transition hover:text-white">Lapangan</Link>
          <Link href="/booking" className="transition hover:text-white">Booking</Link>
          {user && <Link href="/profile" className="transition hover:text-white">Profile</Link>}
          {user && user.role === "admin" && (
            <Link href="/admin" className="rounded-full bg-gradient-to-r from-emerald-600 to-sky-600 px-4 py-2 text-white shadow-sm transition hover:shadow-md">
              Admin Panel
            </Link>
          )}

          {!user ? (
            <div className="ml-2 flex items-center gap-3">
              <Link href="/login" className="rounded-full border border-white/40 px-4 py-2 text-white transition hover:bg-white/10">
                Login
              </Link>
              <Link href="/register" className="rounded-full bg-white px-4 py-2 font-semibold text-slate-900 transition hover:bg-emerald-50">
                Register
              </Link>
            </div>
          ) : (
            <div className="ml-2 flex items-center gap-3">
              <span className="rounded-full bg-white/10 px-3 py-2 text-sm text-emerald-50">Halo, {user.nama || user.username || "User"}</span>
              <button onClick={logout} className="rounded-full bg-rose-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-600">
                Logout
              </button>
            </div>
          )}
        </div>

        <button onClick={toggleMenu} className="flex items-center justify-center rounded-full border border-white/20 p-2 text-white md:hidden" aria-label="Toggle menu">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {isOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="border-t border-white/10 bg-slate-950/90 px-4 py-4 shadow-sm md:hidden">
          <div className="flex flex-col gap-3 text-sm font-medium text-emerald-50">
            <Link href="/" onClick={handleLinkClick}>Home</Link>
            <Link href="/lapangan" onClick={handleLinkClick}>Lapangan</Link>
            <Link href="/booking" onClick={handleLinkClick}>Booking</Link>
            {user && <Link href="/profile" onClick={handleLinkClick}>Profile</Link>}
            {user && user.role === "admin" && <Link href="/admin" onClick={handleLinkClick}>Admin Panel</Link>}
            {!user ? (
              <div className="flex flex-col gap-2 pt-2">
                <Link href="/login" onClick={handleLinkClick} className="rounded-full border border-slate-300 px-4 py-2 text-center">Login</Link>
                <Link href="/register" onClick={handleLinkClick} className="rounded-full bg-slate-900 px-4 py-2 text-center text-white">Register</Link>
              </div>
            ) : (
              <div className="flex flex-col gap-2 pt-2">
                <div className="rounded-full bg-slate-100 px-3 py-2 text-sm text-slate-600">Halo, {user.nama || user.username || "User"}</div>
                <button onClick={() => { logout(); handleLinkClick(); }} className="rounded-full bg-rose-500 px-4 py-2 text-white">Logout</button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}