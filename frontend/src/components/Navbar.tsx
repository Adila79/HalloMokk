import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="text-3xl font-bold bg-white text-green-600 px-3 py-1 rounded-lg group-hover:scale-110 transition">
            ⚽
          </div>
          <span className="text-2xl font-bold hidden sm:inline">HalloMokk</span>
        </Link>

        <div className="flex gap-6 items-center text-base">
          <Link href="/" className="hover:text-green-100 transition font-medium">
            Home
          </Link>
          <Link href="/booking" className="hover:text-green-100 transition font-medium">
            Booking
          </Link>
          <Link href="/login" className="bg-white text-green-600 px-4 py-2 rounded-lg font-semibold hover:bg-green-50 transition">
            Login
          </Link>
          <Link href="/register" className="border-2 border-white px-4 py-2 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition">
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
}