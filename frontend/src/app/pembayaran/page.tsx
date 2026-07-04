"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getBookingDetails, createPayment, uploadPaymentProof } from "@/services/api";

function PembayaranContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("booking_id");

  const [booking, setBooking] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [metodePembayaran, setMetodePembayaran] = useState("Transfer BCA");
  const [buktiFile, setBuktiFile] = useState<File | null>(null);
  const [buktiPreview, setBuktiPreview] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Silakan login terlebih dahulu.");
      router.push("/login");
      return;
    }

    if (!bookingId) {
      setError("ID Booking tidak ditemukan. Silakan lakukan booking terlebih dahulu.");
      setLoading(false);
      return;
    }

    loadBookingDetails(bookingId, token);
  }, [bookingId]);

  const loadBookingDetails = async (id: string, token: string) => {
    try {
      const data = await getBookingDetails(id, token);
      if (data.status_pembayaran && data.status_pembayaran !== "gagal") {
        setError(`Booking ini sudah dibayar dengan status: ${data.status_pembayaran.toUpperCase()}`);
      } else {
        setBooking(data);
      }
    } catch (err: any) {
      console.error(err);
      setError("Gagal memuat detail booking. Pastikan booking ID valid.");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setBuktiFile(file);
      setBuktiPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Sesi Anda telah berakhir. Silakan login kembali.");
      router.push("/login");
      return;
    }

    if (!buktiFile) {
      alert("Silakan unggah bukti pembayaran terlebih dahulu!");
      return;
    }

    setSubmitting(false);
    setSubmitting(true);

    try {
      const uploadRes = await uploadPaymentProof(buktiFile);
      const filename = uploadRes.filename;

      await createPayment(
        {
          booking_id: Number(bookingId),
          metode_pembayaran: metodePembayaran,
          jumlah_bayar: booking.harga,
          bukti_pembayaran: filename,
        },
        token
      );

      alert("Pembayaran berhasil dikirim! Silakan tunggu konfirmasi admin.");
      router.push("/booking");
    } catch (err: any) {
      console.error(err);
      alert(err?.response?.data?.message || "Gagal mengirim pembayaran.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-black">
        <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 font-semibold text-gray-700">Memuat detail booking...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-6 text-center text-black">
        <div className="bg-red-50 border border-red-200 rounded-3xl p-8 max-w-md shadow-lg">
          <span className="text-5xl">⚠️</span>
          <p className="mt-4 text-red-600 font-semibold">{error}</p>
          <button
            onClick={() => router.push("/booking")}
            className="mt-6 bg-green-600 text-white font-semibold px-6 py-3 rounded-2xl shadow hover:bg-green-700 transition cursor-pointer"
          >
            Kembali ke Booking
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.16),_transparent_24%),radial-gradient(circle_at_bottom_right,_rgba(6,182,212,0.16),_transparent_28%),linear-gradient(135deg,_#020617_0%,_#111827_50%,_#0f172a_100%)] px-4 py-8 sm:px-6 lg:px-8 text-slate-100">
      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-[32px] border border-white/10 bg-slate-950/75 p-6 shadow-[0_25px_80px_rgba(2,6,23,0.35)] backdrop-blur-xl sm:p-8">
          <div>
            <span className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-300">Langkah terakhir</span>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">Pembayaran</h1>
            <p className="mt-2 text-sm leading-7 text-slate-400">Selesaikan pembayaran Anda agar jadwal tetap aman dan booking segera diproses.</p>
          </div>

          <div className="mt-6 rounded-[24px] border border-white/10 bg-gradient-to-br from-emerald-500/10 to-sky-500/10 p-5">
            <h3 className="text-lg font-semibold text-white">Ringkasan pesanan</h3>
            <div className="mt-4 space-y-3 text-sm">
              <div className="flex items-center justify-between rounded-2xl bg-slate-900/70 px-4 py-3">
                <span className="text-slate-400">Lapangan</span>
                <span className="font-semibold text-white">{booking.nama_lapangan}</span>
              </div>
              <div className="flex items-center justify-between rounded-2xl bg-slate-900/70 px-4 py-3">
                <span className="text-slate-400">Tanggal</span>
                <span className="font-semibold text-white">
                  {new Date(booking.tanggal).toLocaleDateString("id-ID", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              <div className="flex items-center justify-between rounded-2xl bg-slate-900/70 px-4 py-3">
                <span className="text-slate-400">Jam</span>
                <span className="font-semibold text-white">{booking.jam.substring(0, 5)} WIB</span>
              </div>
              <div className="flex items-center justify-between rounded-2xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-3">
                <span className="font-semibold text-white">Total biaya</span>
                <span className="text-lg font-semibold text-emerald-300">Rp {booking.harga ? booking.harga.toLocaleString() : "-"}</span>
              </div>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <h3 className="text-lg font-semibold text-white">Rekening tujuan</h3>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-[22px] border border-emerald-400/20 bg-emerald-500/10 p-4">
                <p className="font-semibold text-emerald-300">Bank BCA</p>
                <p className="mt-2 font-mono text-base text-white">7651714351</p>
                <p className="mt-1 text-xs text-slate-400">a.n. PT HalloMokk Futsal</p>
              </div>
              <div className="rounded-[22px] border border-cyan-400/20 bg-cyan-500/10 p-4">
                <p className="font-semibold text-cyan-300">Bank Mandiri</p>
                <p className="mt-2 font-mono text-base text-white">137-00-1234-5678</p>
                <p className="mt-1 text-xs text-slate-400">a.n. PT HalloMokk Futsal</p>
              </div>
              <div className="rounded-[22px] border border-cyan-400/20 bg-cyan-500/10 p-4">
                <p className="font-semibold text-cyan-300">DANA</p>
                <p className="mt-2 font-mono text-base text-white">08957382954</p>
                <p className="mt-1 text-xs text-slate-400">a.n. PT HalloMokk Futsal</p>
              </div>
              <div className="rounded-[22px] border border-cyan-400/20 bg-cyan-500/10 p-4">
                <p className="font-semibold text-cyan-300">GoPay</p>
                <p className="mt-2 font-mono text-base text-white">08957382954</p>
                <p className="mt-1 text-xs text-slate-400">a.n. PT HalloMokk Futsal</p>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="rounded-[32px] border border-white/10 bg-white/95 p-6 shadow-[0_20px_70px_rgba(2,6,23,0.25)] sm:p-8">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">Form pembayaran</h2>
            <p className="mt-1 text-sm text-slate-500">Pilih metode dan unggah bukti transfer dengan cepat.</p>
          </div>

          <div className="mt-6 space-y-3">
            <label className="block text-sm font-semibold text-slate-700">Metode pembayaran</label>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { id: "Transfer BCA", label: "Transfer BCA", icon: "🏦" },
                { id: "Transfer Mandiri", label: "Transfer Mandiri", icon: "💳" },
                { id: "GoPay", label: "GoPay", icon: "📱" },
                { id: "DANA", label: "DANA", icon: "💸" },
              ].map((method) => (
                <label
                  key={method.id}
                  className={`flex cursor-pointer items-center justify-between rounded-2xl border p-4 transition-all hover:-translate-y-0.5 hover:shadow-md ${
                    metodePembayaran === method.id
                      ? "border-emerald-400 bg-emerald-50 text-emerald-700"
                      : "border-slate-200 bg-white text-slate-600 hover:border-cyan-300"
                  }`}
                >
                  <span className="text-sm font-semibold">{method.icon} {method.label}</span>
                  <input
                    type="radio"
                    name="metodePembayaran"
                    value={method.id}
                    checked={metodePembayaran === method.id}
                    onChange={(e) => setMetodePembayaran(e.target.value)}
                    className="accent-emerald-600"
                  />
                </label>
              ))}
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <label className="block text-sm font-semibold text-slate-700">Unggah bukti transfer</label>
            <div className="group relative cursor-pointer rounded-[24px] border-2 border-dashed border-slate-200 bg-slate-50 p-6 text-center transition hover:border-emerald-400 hover:bg-emerald-50/60">
              <input type="file" accept="image/png, image/jpeg" onChange={handleFileChange} className="absolute inset-0 h-full w-full cursor-pointer opacity-0" required />
              <div className="space-y-2">
                <span className="block text-4xl">📸</span>
                <p className="text-sm font-semibold text-slate-700">Klik untuk mengunggah bukti</p>
                <p className="text-xs text-slate-500">JPG atau PNG, maksimal 2MB</p>
              </div>
            </div>
          </div>

          {buktiPreview && (
            <div className="mt-6 space-y-2">
              <span className="block text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Pratinjau bukti</span>
              <div className="flex max-h-48 justify-center overflow-hidden rounded-[20px] border border-slate-200 bg-slate-100 p-2">
                <img src={buktiPreview} alt="Bukti Transfer" className="max-h-48 object-contain" />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className={`mt-8 w-full rounded-2xl py-4 text-center font-semibold text-white shadow-lg transition-all ${
              submitting
                ? "cursor-not-allowed bg-slate-400"
                : "bg-gradient-to-r from-emerald-600 via-cyan-600 to-sky-600 hover:-translate-y-0.5 hover:shadow-xl"
            }`}
          >
            {submitting ? (
              <span className="flex items-center justify-center gap-2">
                <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                Memproses...
              </span>
            ) : (
              "Kirim Konfirmasi Pembayaran"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function PembayaranPage() {
  return (
    <Suspense fallback={
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-black">
        <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 font-semibold text-gray-700">Memuat halaman...</p>
      </div>
    }>
      <PembayaranContent />
    </Suspense>
  );
}
