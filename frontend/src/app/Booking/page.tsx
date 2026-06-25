"use client";

import {
  createBooking,
  getLapangan,
  getBooking,
} from "@/services/api";

import {
  useEffect,
  useState,
  Suspense,
} from "react";

import {
  useRouter,
  useSearchParams,
} from "next/navigation";

function BookingContent() {
  const router = useRouter();
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
      const response = await createBooking(
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
        "Booking berhasil! Silakan lakukan pembayaran."
      );

      if (response && response.bookingId) {
        router.push(`/pembayaran?booking_id=${response.bookingId}`);
      } else {
        loadBooking();
      }

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

  <main className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-blue-100 py-6 sm:py-10 px-4">
    <div className="flex justify-center">
      <div className="bg-white/80 backdrop-blur-sm p-4 sm:p-8 rounded-3xl shadow-xl border border-white w-full max-w-4xl">

    <div className="mb-6">
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
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
              p-4
              sm:p-6
              mb-4
              border
              border-gray-100
              flex
              flex-col
              md:flex-row
              justify-between
              items-start
              md:items-center
              gap-4
            "
          >
            <div className="space-y-1">
              <p className="text-black text-lg font-bold">
                {item.nama_user || "Pemesan"}
              </p>

              <p className="text-gray-600 flex items-center gap-2">
                <span>⚽</span> <strong>{item.nama_lapangan}</strong>
              </p>

              <p className="text-gray-600 text-sm">
                📅 {new Date(item.tanggal).toLocaleDateString("id-ID", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </p>

              <p className="text-gray-600 text-sm">
                🕒 {item.jam.substring(0, 5)}
              </p>

              <p className="text-green-600 font-bold text-base mt-2">
                Harga: Rp {item.harga ? item.harga.toLocaleString() : "-"}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
              {/* Status Badge */}
              {item.status_pembayaran === null && (
                <span className="bg-red-50 text-red-600 border border-red-200 px-4 py-2 rounded-full text-sm font-semibold text-center">
                  Belum Bayar
                </span>
              )}
              {item.status_pembayaran === "pending" && (
                <span className="bg-yellow-50 text-yellow-600 border border-yellow-200 px-4 py-2 rounded-full text-sm font-semibold text-center">
                  Menunggu Verifikasi
                </span>
              )}
              {item.status_pembayaran === "lunas" && (
                <span className="bg-green-50 text-green-600 border border-green-200 px-4 py-2 rounded-full text-sm font-semibold text-center">
                  Lunas
                </span>
              )}
              {item.status_pembayaran === "gagal" && (
                <span className="bg-red-100 text-red-700 border border-red-300 px-4 py-2 rounded-full text-sm font-semibold text-center">
                  Gagal
                </span>
              )}

              {/* Action button */}
              {item.status_pembayaran === null && (
                <button
                  onClick={() => router.push(`/pembayaran?booking_id=${item.id}`)}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-xl text-sm transition-all shadow-sm hover:shadow text-center cursor-pointer"
                >
                  Bayar Sekarang
                </button>
              )}
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

export default function BookingPage() {
  return (
    <Suspense fallback={
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-black">
        <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 font-semibold text-gray-700">Memuat halaman...</p>
      </div>
    }>
      <BookingContent />
    </Suspense>
  );
}
