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
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold text-center mb-10">
        Daftar Lapangan
      </h1>

      <div className="grid md:grid-cols-3 gap-8">
        {lapangan.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl overflow-hidden shadow-lg"
          >
            <img
              src={`https://picsum.photos/600/400?random=${item.id}`}
              alt={item.nama_lapangan}
              className="w-full h-52 object-cover"
            />

            <div className="p-5 text-black">
              <h2 className="font-bold text-xl">
                {item.nama_lapangan}
              </h2>

              <p className="text-gray-700 mt-2">
                {item.deskripsi}
              </p>

              <p className="text-green-600 font-bold mt-3 text-lg">
                Rp {item.harga.toLocaleString()}/jam
              </p>

              <button
                onClick={() =>
                  router.push(`/booking?id=${item.id}`)
                }
                className="w-full mt-4 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
              >
                Booking Sekarang
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}