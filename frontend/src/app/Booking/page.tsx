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

  <main className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-blue-100 py-10 px-4">
    <div className="flex justify-center">
      <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl border border-white w-full max-w-4xl">

```
    <div className="mb-6">
      <h1 className="text-4xl font-bold text-gray-800">
        ⚽ Booking Lapangan
      </h1>

      <p className="text-gray-500 mt-2">
        Pesan lapangan favoritmu sekarang juga!
      </p>
    </div>

    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4"
    >
      <select
        value={lapanganId}
        onChange={(e) =>
          setLapanganId(e.target.value)
        }
        className="border border-gray-200 p-4 rounded-2xl text-black bg-white shadow-sm"
        required
      >
        <option value="">
          Pilih Lapangan
        </option>

        {lapangan.map((item) => (
          <option
            key={item.id}
            value={item.id}
          >
            {item.nama_lapangan}
          </option>
        ))}
      </select>

      <input
        type="date"
        value={tanggal}
        onChange={(e) =>
          setTanggal(e.target.value)
        }
        className="border border-gray-200 p-4 rounded-2xl text-black bg-white shadow-sm"
        required
      />

      <input
        type="time"
        value={jam}
        onChange={(e) =>
          setJam(e.target.value)
        }
        className="border border-gray-200 p-4 rounded-2xl text-black bg-white shadow-sm"
        required
      />

      <button
        type="submit"
        className="
          w-full
          py-4
          rounded-2xl
          font-semibold
          text-white
          bg-gradient-to-r
          from-blue-500
          to-purple-500
          hover:from-blue-600
          hover:to-purple-600
          transition-all
          duration-300
          shadow-lg
        "
      >
        Booking Sekarang
      </button>
    </form>

    <div className="mt-12">
      <h2 className="text-3xl font-bold text-gray-800">
        Daftar Booking
      </h2>

      <p className="text-gray-500">
        Riwayat pemesanan lapangan kamu
      </p>

      <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-2 mb-6"></div>

      {bookings.length === 0 ? (
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-3xl text-center">
          <p className="text-gray-600">
            Belum ada booking ⚽
          </p>
        </div>
      ) : (
        bookings.map((item) => (
          <div
            key={item.id}
            className="
              bg-white
              rounded-3xl
              shadow-md
              hover:shadow-xl
              transition-all
              duration-300
              p-6
              mb-4
              border
              border-gray-100
            "
          >
            <div>
           <p className="text-black text-lg font-bold">
             {item.nama_user}
           </p>

           <p className="text-gray-600 mt-1">
            ⚽ {item.nama_lapangan}
            </p>

           <p className="text-gray-600 mt-1">
           📅 {new Date(item.tanggal).toLocaleDateString("id-ID")}
            </p>

          <p className="text-gray-600 mt-1">
           🕒 {item.jam}
            </p>

            </div>
          </div>
        ))
      )}
    </div>

  </div>
</div>
</main>
  );
}
