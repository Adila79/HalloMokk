import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-gradient-to-r from-slate-950 via-emerald-950 to-cyan-900 text-white">
      <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8">
        <div className="mb-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <img src="/logo.svg" alt="HalloMokk logo" className="h-10 w-10 rounded-full object-cover" />
              <h3 className="text-2xl font-bold">HalloMokk</h3>
            </div>
            <p className="text-sm text-slate-400">Platform booking lapangan futsal modern untuk kebutuhan user dan admin dalam satu ekosistem.</p>
          </div>

          <div>
            <h4 className="mb-4 text-lg font-semibold">Menu</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="/" className="transition hover:text-emerald-300">Home</Link></li>
              <li><Link href="/lapangan" className="transition hover:text-emerald-300">Lapangan</Link></li>
              <li><Link href="/booking" className="transition hover:text-emerald-300">Booking</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-lg font-semibold">Informasi</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="#" className="transition hover:text-emerald-300">Tentang Kami</a></li>
              <li><a href="#" className="transition hover:text-emerald-300">Kebijakan Privasi</a></li>
              <li><a href="#" className="transition hover:text-emerald-300">Syarat & Ketentuan</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-lg font-semibold">Hubungi Kami</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>📞 +62 800-FUTSAL</li>
              <li>📧 support@hallomokk.com</li>
              <li className="pt-2">Instagram • Facebook • TikTok</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 text-center text-sm text-slate-400">
          <p>© 2026 HalloMokk. Semua hak dilindungi.</p>
        </div>
      </div>
    </footer>
  );
}