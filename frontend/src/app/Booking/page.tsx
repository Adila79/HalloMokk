"use client";

import { createBooking, getLapangan, getBooking } from "@/services/api";
import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function BookingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [lapangan, setLapangan] = useState<any[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  const [lapanganId, setLapanganId] = useState(searchParams.get("id") || "");
  const [tanggal, setTanggal] = useState("");
  const [jam, setJam] = useState("");

  useEffect(() => {
    loadLapangan();
    loadBooking();
  }, []);

  const loadLapangan = async () => {
    try {
      const data = await getLapangan();
      setLapangan(data);
    } catch (err) {
      console.log(err);
    }
  };

  const loadBooking = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const data = await getBooking(token);
      setBookings(data);
    } catch (err) {
      console.log(err);
    }
  };

  const formatDate = (value: string) =>
    new Date(value).toLocaleDateString("id-ID", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  const getStatusBadge = (status: string | null) => {
    if (status === null) {
      return "border-red-400/30 bg-red-500/10 text-red-300";
    }
    if (status === "pending") {
      return "border-amber-400/30 bg-amber-500/10 text-amber-300";
    }
    if (status === "lunas") {
      return "border-emerald-400/30 bg-emerald-500/10 text-emerald-300";
    }
    return "border-rose-400/30 bg-rose-500/10 text-rose-300";
  };

  const getStatusLabel = (status: string | null) => {
    if (status === null) return "Belum Bayar";
    if (status === "pending") return "Menunggu Verifikasi";
    if (status === "lunas") return "Lunas";
    return "Gagal";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!lapanganId || !tanggal || !jam) {
      alert("Semua field wajib diisi!");
      return;
    }

    const today = new Date().toISOString().split("T")[0];
    if (tanggal < today) {
      alert("Tanggal booking tidak boleh kurang dari hari ini!");
      return;
    }

    if (jam < "08:00" || jam > "22:00") {
      alert("Jam booking hanya boleh antara 08:00 - 22:00!");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Silakan login dulu");
      return;
    }

    try {
      const response = await createBooking(
        { lapangan_id: Number(lapanganId), tanggal, jam },
        token
      );

      alert("Booking berhasil! Silakan lakukan pembayaran.");

      if (response && response.bookingId) {
        router.push(`/pembayaran?booking_id=${response.bookingId}`);
      } else {
        loadBooking();
      }

      setTanggal("");
      setJam("");
    } catch (error: any) {
      alert(error?.response?.data?.message || "Booking gagal");
    }
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(6,182,212,0.16),_transparent_24%),radial-gradient(circle_at_bottom_right,_rgba(16,185,129,0.18),_transparent_28%),linear-gradient(135deg,_#020617_0%,_#111827_50%,_#0f172a_100%)] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="w-full rounded-[36px] border border-white/15 bg-slate-950/75 p-4 text-white shadow-[0_25px_90px_rgba(2,6,23,0.35)] backdrop-blur-xl sm:p-8">
          <div className="mb-8 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="rounded-[28px] border border-white/10 bg-gradient-to-br from-emerald-500/10 to-sky-500/10 p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-300">Corporate booking system</p>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">Reservasi lapangan yang lebih tertata</h1>
              <p className="mt-3 max-w-2xl text-slate-300">
                Proses pemesanan dibuat lebih rapi, cepat, dan mudah dipantau untuk kebutuhan klub, tim, maupun individu.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/8 p-3">
                  <p className="text-xl font-semibold text-white">24/7</p>
                  <p className="text-xs text-slate-400">Akses booking</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/8 p-3">
                  <p className="text-xl font-semibold text-white">Fast</p>
                  <p className="text-xs text-slate-400">Proses reservasi</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/8 p-3">
                  <p className="text-xl font-semibold text-white">Secure</p>
                  <p className="text-xs text-slate-400">Pembayaran aman</p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4 rounded-[28px] border border-white/10 bg-white/10 p-5 shadow-sm sm:p-6">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-300">Form pemesanan</p>
                <h2 className="mt-1 text-xl font-semibold text-white">Isi detail booking</h2>
              </div>

              <select value={lapanganId} onChange={(e) => setLapanganId(e.target.value)} className="rounded-2xl border border-white/10 bg-slate-900/80 p-4 text-white shadow-sm outline-none focus:border-emerald-400" required>
                <option value="">Pilih Lapangan</option>
                {lapangan.map((item) => (
                  <option key={item.id} value={item.id}>{item.nama_lapangan}</option>
                ))}
              </select>

              <input type="date" value={tanggal} onChange={(e) => setTanggal(e.target.value)} className="rounded-2xl border border-white/10 bg-white p-4 text-slate-800 shadow-sm outline-none focus:border-emerald-400" required />

              <input type="time" value={jam} onChange={(e) => setJam(e.target.value)} className="rounded-2xl border border-white/10 bg-white p-4 text-slate-800 shadow-sm outline-none focus:border-emerald-400" required />

              <button type="submit" className="w-full rounded-2xl bg-gradient-to-r from-emerald-600 to-sky-600 py-3.5 font-semibold text-white shadow-lg transition hover:shadow-xl">
                Lanjutkan Booking
              </button>
            </form>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-slate-900/70 p-4 sm:p-6">
            <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-white">Riwayat booking</h2>
                <p className="text-sm text-slate-400">Status pemesanan dan pembayaran dalam satu tampilan yang teratur.</p>
              </div>
              <div className="rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-1 text-sm font-medium text-emerald-300">
                {bookings.length} transaksi
              </div>
            </div>

            {bookings.length === 0 ? (
              <div className="rounded-[24px] border border-dashed border-white/15 bg-white/5 p-8 text-center text-slate-300">
                Belum ada booking yang tercatat.
              </div>
            ) : (
              <>
                <div className="hidden overflow-x-auto md:block">
                  <table className="min-w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-white/10 text-slate-400">
                        <th className="px-3 py-3 font-medium">No</th>
                        <th className="px-3 py-3 font-medium">Lapangan</th>
                        <th className="px-3 py-3 font-medium">Tanggal</th>
                        <th className="px-3 py-3 font-medium">Jam</th>
                        <th className="px-3 py-3 font-medium">Harga</th>
                        <th className="px-3 py-3 font-medium">Status</th>
                        <th className="px-3 py-3 font-medium">Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.map((item, index) => (
                        <tr key={item.id} className="border-b border-white/10 text-slate-300 last:border-b-0">
                          <td className="px-3 py-4 text-slate-400">#{index + 1}</td>
                          <td className="px-3 py-4">
                            <div className="font-semibold text-white">{item.nama_lapangan}</div>
                            <div className="text-xs text-slate-500">{item.nama_user || "Pemesan"}</div>
                          </td>
                          <td className="px-3 py-4">{formatDate(item.tanggal)}</td>
                          <td className="px-3 py-4">{item.jam.substring(0, 5)}</td>
                          <td className="px-3 py-4">Rp {item.harga ? item.harga.toLocaleString() : "-"}</td>
                          <td className="px-3 py-4">
                            <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${getStatusBadge(item.status_pembayaran)}`}>
                              {getStatusLabel(item.status_pembayaran)}
                            </span>
                          </td>
                          <td className="px-3 py-4">
                            {item.status_pembayaran === null ? (
                              <button onClick={() => router.push(`/pembayaran?booking_id=${item.id}`)} className="rounded-full bg-sky-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-sky-700">
                                Bayar
                              </button>
                            ) : (
                              <span className="text-xs text-slate-500">Tersimpan</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="space-y-3 md:hidden">
                  {bookings.map((item, index) => (
                    <div key={item.id} className="rounded-[22px] border border-white/10 bg-white/5 p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-semibold text-white">{item.nama_lapangan}</p>
                          <p className="mt-1 text-xs text-slate-400">{item.nama_user || "Pemesan"}</p>
                        </div>
                        <span className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold ${getStatusBadge(item.status_pembayaran)}`}>
                          {getStatusLabel(item.status_pembayaran)}
                        </span>
                      </div>
                      <div className="mt-3 grid gap-2 text-sm text-slate-300">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400">Tanggal</span>
                          <span>{formatDate(item.tanggal)}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400">Jam</span>
                          <span>{item.jam.substring(0, 5)}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400">Harga</span>
                          <span>Rp {item.harga ? item.harga.toLocaleString() : "-"}</span>
                        </div>
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <span className="text-xs text-slate-500">#{index + 1}</span>
                        {item.status_pembayaran === null ? (
                          <button onClick={() => router.push(`/pembayaran?booking_id=${item.id}`)} className="rounded-full bg-sky-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-sky-700">
                            Bayar
                          </button>
                        ) : (
                          <span className="text-xs text-slate-500">Tersimpan</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default function BookingPage() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-black">
          <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 font-semibold text-gray-700">Memuat halaman...</p>
        </div>
      }
    >
      <BookingContent />
    </Suspense>
  );
}
