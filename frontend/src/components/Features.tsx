export default function Features() {
  const features = [
    {
      icon: "01",
      title: "Kualitas venue terjaga",
      description: "Setiap lapangan dipilih berdasarkan kondisi permukaan, pencahayaan, dan fasilitas yang konsisten.",
    },
    {
      icon: "02",
      title: "Pemesanan yang lebih cepat",
      description: "Proses reservasi dibuat sederhana sehingga pengguna tidak perlu melalui langkah yang berbelit.",
    },
    {
      icon: "03",
      title: "Transaksi yang aman",
      description: "Pembayaran dipantau dengan jelas dan tersusun agar pengalaman bertransaksi tetap nyaman.",
    },
    {
      icon: "04",
      title: "Lokasi yang strategis",
      description: "Venue tersebar di area yang mudah dijangkau untuk kebutuhan latihan maupun pertandingan.",
    },
    {
      icon: "05",
      title: "Manajemen yang lebih baik",
      description: "Admin dapat memantau jadwal, status pembayaran, dan data lapangan dari satu dashboard.",
    },
    {
      icon: "06",
      title: "Akses yang konsisten",
      description: "Platform tersedia secara web dengan pengalaman yang tetap stabil dari desktop maupun ponsel.",
    },
  ];

  return (
    <section id="features" className="w-full bg-slate-950 px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 max-w-3xl lg:mb-16">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-emerald-300">Kenapa HalloMokk</p>
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Sistem booking yang dirancang untuk pengalaman yang lebih profesional.
          </h2>
          <p className="mt-4 text-lg leading-8 text-slate-400">
            Dari pencarian venue, pemesanan, sampai pengelolaan pembayaran, setiap bagian disusun agar lebih jelas, efisien, dan mudah dipakai.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature, idx) => (
            <div key={idx} className="rounded-[24px] border border-white/10 bg-white/5 p-8 shadow-sm shadow-black/20 backdrop-blur-sm transition hover:-translate-y-1 hover:bg-white/8">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/15 text-sm font-semibold text-emerald-300 ring-1 ring-emerald-400/20">
                {feature.icon}
              </div>
              <h3 className="mb-3 text-xl font-semibold text-white">{feature.title}</h3>
              <p className="text-sm leading-7 text-slate-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
