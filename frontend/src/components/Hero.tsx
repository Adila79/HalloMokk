import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative flex min-h-[85vh] w-full items-center overflow-hidden bg-slate-950 px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.16),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(6,182,212,0.14),_transparent_32%)]" />
      <div className="animate-glow absolute left-8 top-12 h-36 w-36 rounded-full bg-emerald-400/10 blur-3xl" />
      <div className="animate-float absolute bottom-10 right-10 h-48 w-48 rounded-full bg-cyan-400/10 blur-3xl" />

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-8 sm:gap-10 md:grid-cols-[1.1fr_0.9fr] lg:gap-12">
        <div className="animate-fade-up max-w-2xl text-white">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-1.5 text-sm font-medium text-emerald-200 backdrop-blur">
            <span className="animate-glow inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
            HalloMokk • Platform booking futsal premium
          </div>

          <h1 className="mt-6 text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl lg:text-6xl">
            Pesan lapangan futsal dengan proses yang lebih rapi, cepat, dan eksklusif.
          </h1>

          <p className="mt-5 max-w-xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
            Jelajahi venue terbaik, pilih jadwal yang sesuai, dan kelola pembayaran dari satu tempat yang aman, jelas, dan nyaman untuk tim maupun individu.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link href="/booking" className="w-full rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 px-6 py-3 text-center text-sm font-semibold text-white shadow-lg shadow-emerald-950/30 transition duration-300 hover:-translate-y-1 hover:shadow-xl sm:w-auto">
              Reservasi Sekarang
            </Link>
            <Link href="#features" className="w-full rounded-full border border-white/15 bg-white/10 px-6 py-3 text-center text-sm font-semibold text-slate-100 transition duration-300 hover:-translate-y-1 hover:bg-white/15 sm:w-auto">
              Lihat Fasilitas
            </Link>
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            {[
              { value: "500+", label: "Venue tersedia" },
              { value: "10K+", label: "Pelanggan aktif" },
              { value: "24/7", label: "Layanan dukungan" },
            ].map((item, index) => (
              <div key={item.value} className="luxury-card rounded-2xl border border-white/10 bg-white/8 p-4 backdrop-blur" style={{ animationDelay: `${index * 0.12}s` }}>
                <p className="text-2xl font-semibold text-white">{item.value}</p>
                <p className="mt-1 text-sm text-slate-400">{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="animate-float rounded-[32px] border border-white/10 bg-slate-900/80 p-4 shadow-2xl shadow-black/30 backdrop-blur sm:p-6 xl:p-8">
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