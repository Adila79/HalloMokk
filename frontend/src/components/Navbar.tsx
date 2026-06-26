"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <nav className="bg-green-600 text-white shadow-md relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
        {/* Brand/Logo */}
        <Link href="/" className="flex items-center gap-2 cursor-pointer">
          <span className="text-2xl">⚽</span>
          <h1 className="text-2xl font-bold tracking-tight">
            HalloMokk
          </h1>
        </Link>

        {/* Desktop Menu links */}
        <div className="hidden md:flex gap-6 items-center text-base">
          <Link
            href="/"
            className="hover:text-green-100 transition font-medium"
          >
            Home
          </Link>

          <Link 
            href="/lapangan"
            className="hover:text-green-100 transition font-medium"
          >
            Lapangan
          </Link>

          <Link
            href="/booking"
            className="hover:text-green-100 transition font-medium"
          >
            Booking
          </Link>

          {user && (
            <Link 
              href="/profile"
              className="hover:text-green-100 transition font-medium"
            >
              Profile
            </Link>
          )}

          {user && user.role === "admin" && (
            <Link 
              href="/admin"
              className="hover:text-green-100 bg-green-700 border border-green-500 px-3 py-1.5 rounded-lg shadow-sm hover:bg-green-800 transition font-medium"
            >
              Admin Panel
            </Link>
          )}

          {!user ? (
            <div className="flex items-center gap-3 ml-2">
              <Link
                href="/login"
                className="bg-white text-green-600 px-4 py-2 rounded-lg font-semibold hover:bg-green-50 transition shadow-sm"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="border border-white px-4 py-2 rounded-lg font-semibold hover:bg-white/10 transition"
              >
                Register
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-4 ml-2">
              <span className="font-semibold text-green-100">
                Halo, {user.nama || user.username || "User"}
              </span>

              <button
                onClick={logout}
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg font-semibold transition shadow-sm cursor-pointer"
              >
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Hamburger Menu Button for Mobile */}
        <button
          onClick={toggleMenu}
          className="flex md:hidden items-center justify-center p-2 rounded-lg text-white hover:bg-green-700 transition focus:outline-none cursor-pointer"
          aria-label="Toggle menu"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-green-700 border-t border-green-800 shadow-inner px-4 sm:px-6 py-4 space-y-3 flex flex-col transition-all duration-300">
          <Link
            href="/"
            onClick={handleLinkClick}
            className="py-2 hover:text-green-100 transition font-medium border-b border-green-600/30"
          >
            Home
          </Link>

          <Link
            href="/lapangan"
            onClick={handleLinkClick}
            className="py-2 hover:text-green-100 transition font-medium border-b border-green-600/30"
          >
            Lapangan
          </Link>

          <Link
            href="/booking"
            onClick={handleLinkClick}
            className="py-2 hover:text-green-100 transition font-medium border-b border-green-600/30"
          >
            Booking
          </Link>

          {user && (
            <Link
              href="/profile"
              onClick={handleLinkClick}
              className="py-2 hover:text-green-100 transition font-medium border-b border-green-600/30"
            >
              Profile
            </Link>
          )}

          {user && user.role === "admin" && (
            <Link
              href="/admin"
              onClick={handleLinkClick}
              className="py-2 hover:text-green-100 font-bold border-b border-green-600/30 flex items-center gap-1.5"
            >
              <span>⚙️</span> Admin Panel
            </Link>
          )}

          {!user ? (
            <div className="flex flex-col gap-2 pt-2">
              <Link
                href="/login"
                onClick={handleLinkClick}
                className="w-full bg-white text-green-600 text-center py-2.5 rounded-xl font-semibold hover:bg-green-50 transition shadow-sm"
              >
                Login
              </Link>

              <Link
                href="/register"
                onClick={handleLinkClick}
                className="w-full border border-white text-center py-2.5 rounded-xl font-semibold hover:bg-white/10 transition"
              >
                Register
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-3 pt-2">
              <div className="text-sm font-medium text-green-200">
                Halo, {user.nama || user.username || "User"}
              </div>

              <button
                onClick={() => {
                  logout();
                  handleLinkClick();
                }}
                className="w-full bg-red-500 text-center py-2.5 rounded-xl font-semibold hover:bg-red-600 transition shadow-sm cursor-pointer"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}