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
    <main className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-emerald-50 py-10">
      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-slate-900">
            Daftar Lapangan
          </h1>

          <p className="mt-3 text-slate-600">
            Temukan lapangan terbaik untuk sesi bermain Anda.
            Semua lapangan tersedia untuk pemesanan cepat dan aman melalui sistem HalloMokk.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {lapangan.map((item) => (
            <div
              key={item.id}
              className="overflow-hidden rounded-[28px] border bg-white shadow hover:shadow-xl duration-300"
            >

              <img
                src={`/lapangan/${item.foto}`}
                alt={item.nama_lapangan}
                className="h-52 w-full object-cover"
              />

              <div className="p-6">

                <h2 className="text-xl font-bold text-slate-900">
                  {item.nama_lapangan}
                </h2>

                <p className="mt-2 text-slate-600">
                  {item.deskripsi}
                </p>

                <p className="mt-4 text-xl font-bold text-emerald-600">
                  Rp {item.harga.toLocaleString()} / jam
                </p>

                <button
                  onClick={() =>
                    router.push(`/booking?id=${item.id}`)
                  }
                  className="mt-5 w-full rounded-full bg-emerald-600 py-3 font-semibold text-white hover:bg-emerald-700"
                >
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