"use client";

import Navbar from "@/components/Navbar";
import {
  createBooking,
  getLapangan,
} from "@/services/api";

import {
  useEffect,
  useState,
} from "react";

import {
  useSearchParams,
} from "next/navigation";

export default function BookingPage() {
  const searchParams =
    useSearchParams();

  const [lapangan, setLapangan] =
    useState<any[]>([]);

  const [lapanganId, setLapanganId] =
    useState(
      searchParams.get("id") || ""
    );

  const [tanggal, setTanggal] =
    useState("");

  const [jam, setJam] =
    useState("");

  useEffect(() => {
    loadLapangan();
  }, []);

  const loadLapangan =
    async () => {
      try {
        const data =
          await getLapangan();

        setLapangan(data);
      } catch (err) {
        console.log(err);
      }
    };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    const token =
      localStorage.getItem(
        "token"
      );

    if (!token) {
      alert(
        "Silakan login dulu"
      );
      return;
    }

    try {
      await createBooking(
        {
          lapangan_id:
            Number(lapanganId),
          tanggal,
          jam,
        },
        token
      );

      alert(
        "Booking berhasil"
      );

      setTanggal("");
      setJam("");
    } catch (error: any) {
      alert(
        error?.response?.data
          ?.message ||
          "Booking gagal"
      );
    }
  };

  return (
    <>
      <Navbar />

      <div className="p-10 flex justify-center">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
          <h1 className="text-3xl font-bold mb-5 text-black">
            Booking Lapangan
          </h1>

          <form
            onSubmit={
              handleSubmit
            }
            className="flex flex-col gap-4"
          >
            <select
              value={
                lapanganId
              }
              onChange={(e) =>
                setLapanganId(
                  e.target
                    .value
                )
              }
              className="border p-3 rounded text-black"
              required
            >
              <option value="">
                Pilih Lapangan
              </option>

              {lapangan.map(
                (item) => (
                  <option
                    key={
                      item.id
                    }
                    value={
                      item.id
                    }
                  >
                    {
                      item.nama_lapangan
                    }
                  </option>
                )
              )}
            </select>

            <input
              type="date"
              value={tanggal}
              onChange={(e) =>
                setTanggal(
                  e.target
                    .value
                )
              }
              className="border p-3 rounded text-black"
              required
            />

            <input
              type="time"
              value={jam}
              onChange={(e) =>
                setJam(
                  e.target
                    .value
                )
              }
              className="border p-3 rounded text-black"
              required
            />

            <button
              type="submit"
              className="bg-green-600 text-white py-3 rounded-lg"
            >
              Booking Sekarang
            </button>
          </form>
        </div>
      </div>
    </>
  );
}