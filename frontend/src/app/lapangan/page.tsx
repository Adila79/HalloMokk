"use client";

import { getLapangan } from "@/services/api";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function LapanganPage() {
  const [lapangan, setLapangan] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const data = await getLapangan();
      setLapangan(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-emerald-900 to-cyan-900 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-emerald-300">Daftar lapangan</p>
          <h1 className="text-3xl font-bold text-white sm:text-4xl">Temukan lapangan terbaik untuk sesi bermain Anda</h1>
          <p className="mx-auto mt-3 max-w-2xl text-lg text-slate-200">Semua lapangan tersedia untuk pemesanan cepat dan aman melalui sistem HalloMokk.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {lapangan.map((item) => (
            <div key={item.id} className="overflow-hidden rounded-[28px] border border-white/10 bg-white/95 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <img src={`https://picsum.photos/600/400?random=${item.id}`} alt={item.nama_lapangan} className="h-52 w-full object-cover" />
              <div className="p-6 text-slate-700">
                <h2 className="text-xl font-semibold text-slate-900">{item.nama_lapangan}</h2>
                <p className="mt-2 text-sm text-slate-600">{item.deskripsi}</p>
                <p className="mt-4 text-lg font-bold text-emerald-600">Rp {item.harga.toLocaleString()} / jam</p>
                <button onClick={() => router.push(`/booking?id=${item.id}`)} className="mt-5 w-full rounded-full bg-gradient-to-r from-emerald-600 to-sky-600 px-4 py-3 font-semibold text-white transition hover:shadow-md">
                  Booking Sekarang
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}