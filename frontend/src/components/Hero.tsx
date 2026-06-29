import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen w-full items-center overflow-hidden bg-slate-950">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.16),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(6,182,212,0.14),_transparent_32%)]" />
      <div className="absolute left-8 top-12 h-36 w-36 rounded-full bg-emerald-400/10 blur-3xl" />
      <div className="absolute bottom-10 right-10 h-48 w-48 rounded-full bg-cyan-400/10 blur-3xl" />

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 md:grid-cols-[1.1fr_0.9fr] md:py-24">
        <div className="max-w-2xl text-white">
          <div className="inline-flex items-center rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-sm font-medium text-emerald-200 backdrop-blur">
            HalloMokk • Platform booking futsal profesional
          </div>

          <h1 className="mt-6 text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            Pesan lapangan futsal dengan proses yang lebih rapi dan cepat.
          </h1>

          <p className="mt-5 max-w-xl text-lg leading-8 text-slate-300">
            Jelajahi venue terbaik, pilih jadwal yang sesuai, dan kelola pembayaran dari satu tempat yang aman, jelas, dan nyaman untuk tim maupun individu.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/booking" className="rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-950/30 transition hover:bg-emerald-400">
              Reservasi Sekarang
            </Link>
            <Link href="#features" className="rounded-full border border-white/15 bg-white/10 px-6 py-3 text-sm font-semibold text-slate-100 transition hover:bg-white/15">
              Lihat Fasilitas
            </Link>
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/8 p-4 backdrop-blur">
              <p className="text-2xl font-semibold text-white">500+</p>
              <p className="mt-1 text-sm text-slate-400">Venue tersedia</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/8 p-4 backdrop-blur">
              <p className="text-2xl font-semibold text-white">10K+</p>
              <p className="mt-1 text-sm text-slate-400">Pelanggan aktif</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/8 p-4 backdrop-blur">
              <p className="text-2xl font-semibold text-white">24/7</p>
              <p className="mt-1 text-sm text-slate-400">Layanan dukungan</p>
            </div>
          </div>
        </div>

        <div className="rounded-[32px] border border-white/10 bg-slate-900/80 p-6 shadow-2xl shadow-black/30 backdrop-blur xl:p-8">
          <div className="rounded-[24px] border border-white/10 bg-gradient-to-br from-slate-800 to-slate-900 p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-300">Hari ini</p>
            <div className="mt-4 space-y-4">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-white">Jam 18:00</span>
                  <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-medium text-emerald-300">Tersedia</span>
                </div>
                <p className="mt-2 text-sm text-slate-400">Lapangan 1 · Indoor · Full lighting</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-white">Jam 20:00</span>
                  <span className="rounded-full bg-cyan-500/15 px-3 py-1 text-xs font-medium text-cyan-300">Booking cepat</span>
                </div>
                <p className="mt-2 text-sm text-slate-400">Lapangan 2 · Premium floor · AC</p>
              </div>
            </div>
            <div className="mt-6 rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-4 text-sm text-slate-300">
              Verifikasi pembayaran dan penjadwalan dilakukan secara langsung untuk mengurangi risiko bentrok.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}