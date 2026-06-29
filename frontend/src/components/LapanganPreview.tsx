"use client";

import { getLapangan } from "@/services/api";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function LapanganPreview() {
  const [lapangan, setLapangan] = useState<any[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const data = await getLapangan();
      setLapangan(data.slice(0, 3));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="w-full bg-slate-50 px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 max-w-3xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-emerald-600">Venue unggulan</p>
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
            Pilih venue yang sesuai dengan kebutuhan latihan atau pertandingan.
          </h2>
          <p className="mt-3 text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
            Setiap lapangan didukung fasilitas yang konsisten untuk kenyamanan, keamanan, dan kualitas permainan.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {lapangan.map((item) => (
            <div key={item.id} className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <img src={`https://picsum.photos/600/400?random=${item.id}`} alt={item.nama_lapangan} className="h-44 w-full object-cover sm:h-48" />
              <div className="p-6 text-slate-700">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-xl font-semibold text-slate-900">{item.nama_lapangan}</h3>
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">Tersedia</span>
                </div>
                <p className="mt-3 text-sm leading-7 text-slate-600">{item.deskripsi}</p>
                <div className="mt-4 flex items-center justify-between">
                  <p className="text-lg font-semibold text-slate-900">Rp {item.harga.toLocaleString()} / jam</p>
                  <span className="text-sm text-slate-500">Indoor</span>
                </div>
                <Link href={`/booking?id=${item.id}`} className="mt-5 block rounded-full bg-slate-900 px-4 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-slate-800">
                  Booking Sekarang
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}