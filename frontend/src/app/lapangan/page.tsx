"use client";

import { useEffect, useState } from "react";
import { getLapangan } from "@/services/api";

export default function LapanganPage() {
  const [lapangan, setLapangan] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLapangan = async () => {
      try {
        const result = await getLapangan();

        console.log("HASIL API:", result);

        if (Array.isArray(result)) {
          setLapangan(result);
        } else if (result.data) {
          setLapangan(result.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchLapangan();
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-5">
        Data Lapangan
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {lapangan.map((item) => (
          <div
            key={item.id}
            className="border rounded-lg p-4 shadow"
          >
            <h2 className="text-xl font-semibold">
              {item.nama_lapangan}
            </h2>

            <p>Harga: Rp {item.harga}</p>

            <p>{item.deskripsi}</p>
          </div>
        ))}
      </div>
    </div>
  );
}