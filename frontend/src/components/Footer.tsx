import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-900 to-black text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-3xl">⚽</span>
              <h3 className="text-2xl font-bold">HalloMokk</h3>
            </div>
            <p className="text-gray-400">
              Platform booking lapangan futsal terpercaya & terlengkap
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-4">Menu</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/" className="hover:text-orange-500 transition">Home</Link></li>
              <li><Link href="/booking" className="hover:text-orange-500 transition">Booking</Link></li>
              <li><Link href="/login" className="hover:text-orange-500 transition">Login</Link></li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="font-bold text-lg mb-4">Informasi</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-orange-500 transition">Tentang Kami</a></li>
              <li><a href="#" className="hover:text-orange-500 transition">Kebijakan Privasi</a></li>
              <li><a href="#" className="hover:text-orange-500 transition">Syarat & Ketentuan</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-lg mb-4">Hubungi Kami</h4>
            <ul className="space-y-2 text-gray-400">
              <li>📞 +62 800-FUTSAL</li>
              <li>📧 support@hallomokk.com</li>
              <li className="flex gap-3 pt-2">
                <a href="#" className="hover:text-orange-500">Facebook</a>
                <a href="#" className="hover:text-orange-500">Instagram</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
          <p>© 2026 HalloMokk. Semua hak dilindungi.</p>
        </div>
      </div>
    </footer>
  );
}