"use client";

import {
  createBooking,
  getLapangan,
  getBooking,
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

  const [bookings, setBookings] =
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
    loadBooking();
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

  const loadBooking =
    async () => {
      try {
        const token =
          localStorage.getItem(
            "token"
          );

        if (!token) return;

        const data =
          await getBooking(token);

        setBookings(data);
      } catch (err) {
        console.log(err);
      }
    };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (
      !lapanganId ||
      !tanggal ||
      !jam
    ) {
      alert(
        "Semua field wajib diisi!"
      );
      return;
    }

    const today =
      new Date()
        .toISOString()
        .split("T")[0];

    if (tanggal < today) {
      alert(
        "Tanggal booking tidak boleh kurang dari hari ini!"
      );
      return;
    }

    if (
      jam < "08:00" ||
      jam > "22:00"
    ) {
      alert(
        "Jam booking hanya boleh antara 08:00 - 22:00!"
      );
      return;
    }

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
            Number(
              lapanganId
            ),
          tanggal,
          jam,
        },
        token
      );

      alert(
        "Booking berhasil"
      );

      loadBooking();

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
    <div className="p-10 flex justify-center">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-2xl">
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
                e.target.value
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
                e.target.value
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
                e.target.value
              )
            }
            className="border p-3 rounded text-black"
            required
          />

          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg"
          >
            Booking Sekarang
          </button>
        </form>

        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4 text-black">
            Daftar Booking
          </h2>

          {bookings.length ===
          0 ? (
            <p className="text-gray-500">
              Belum ada booking
            </p>
          ) : (
            bookings.map(
              (item) => (
                <div
                  key={
                    item.id
                  }
                  className="border rounded-lg p-4 mb-3 shadow-sm"
                >
                  <p className="text-black">
                    <b>Nama:</b>{" "}
                    {
                      item.nama_user
                    }
                  </p>

                  <p className="text-black">
                    <b>
                      Lapangan:
                    </b>{" "}
                    {
                      item.nama_lapangan
                    }
                  </p>

                  <p className="text-black">
                    <b>
                      Tanggal:
                    </b>{" "}
                    {
                      item.tanggal
                    }
                  </p>

                  <p className="text-black">
                    <b>Jam:</b>{" "}
                    {
                      item.jam
                    }
                  </p>
                </div>
              )
            )
          )}
        </div>
      </div>
    </div>
  );
}