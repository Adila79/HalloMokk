"use client";

import { getLapangan } from "@/services/api";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function LapanganPreview() {
  const [lapangan, setLapangan] =
    useState<any[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const data =
        await getLapangan();

      setLapangan(
        data.slice(0, 3)
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="py-16 px-4 sm:px-6 w-full">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10">
          Lapangan Tersedia
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {lapangan.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <img
                src={`https://picsum.photos/600/400?random=${item.id}`}
                alt={item.nama_lapangan}
                className="h-48 w-full object-cover"
              />

              <div className="p-5 text-black">
                <h3 className="font-bold text-xl text-black">
                  {item.nama_lapangan}
                </h3>

                <p className="mt-2 text-gray-700">
                  {item.deskripsi}
                </p>

                <p className="text-green-600 font-bold mt-3 text-lg">
                  Rp{" "}
                  {item.harga.toLocaleString()}
                </p>

                <Link
                  href={`/booking?id=${item.id}`}
                  className="block mt-4 bg-green-600 text-white text-center py-2 rounded-lg"
                >
                  Booking
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}