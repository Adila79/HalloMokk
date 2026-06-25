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
      // 1. Upload the payment proof receipt image
      const uploadRes = await uploadPaymentProof(buktiFile);
      const filename = uploadRes.filename;

      // 2. Submit payment information
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
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50 py-12 px-4 md:px-8 text-black">
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 items-start">
        
        {/* Left Column: Booking details & instructions */}
        <div className="bg-white/80 backdrop-blur-sm p-6 md:p-8 rounded-3xl shadow-xl border border-white space-y-6">
          <div>
            <span className="text-sm font-semibold text-green-600 uppercase tracking-wider">Langkah Terakhir</span>
            <h1 className="text-3xl font-extrabold text-gray-900 mt-1">Pembayaran</h1>
            <p className="text-gray-500 text-sm mt-1">Segera selesaikan pembayaran Anda agar jadwal tidak hangus.</p>
          </div>

          <div className="border-t border-gray-100 pt-6 space-y-4">
            <h3 className="font-bold text-gray-800 text-lg">Ringkasan Pesanan</h3>
            
            <div className="bg-gray-50 rounded-2xl p-4 space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-500">Lapangan</span>
                <span className="font-semibold text-gray-800">{booking.nama_lapangan}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Tanggal</span>
                <span className="font-semibold text-gray-800">
                  {new Date(booking.tanggal).toLocaleDateString("id-ID", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Jam</span>
                <span className="font-semibold text-gray-800">{booking.jam.substring(0, 5)} WIB</span>
              </div>
              <div className="border-t border-gray-200 my-2 pt-2 flex justify-between items-center">
                <span className="font-bold text-gray-800">Total Biaya</span>
                <span className="text-xl font-extrabold text-green-600">
                  Rp {booking.harga ? booking.harga.toLocaleString() : "-"}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-bold text-gray-800 text-lg">Rekening Tujuan</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div className="border border-green-100 rounded-2xl p-4 bg-green-50/50">
                <p className="font-bold text-green-700">Bank BCA</p>
                <p className="text-gray-800 mt-1 font-mono text-base">804-1234-567</p>
                <p className="text-xs text-gray-500">a.n. PT HalloMok Futsal</p>
              </div>
              <div className="border border-emerald-100 rounded-2xl p-4 bg-emerald-50/50">
                <p className="font-bold text-emerald-700">Bank Mandiri</p>
                <p className="text-gray-800 mt-1 font-mono text-base">137-00-1234-5678</p>
                <p className="text-xs text-gray-500">a.n. PT HalloMok Futsal</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Payment Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 md:p-8 rounded-3xl shadow-xl border border-gray-100 space-y-6"
        >
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Form Pembayaran</h2>
            <p className="text-gray-500 text-sm mt-1">Pilih metode dan unggah bukti transfer.</p>
          </div>

          {/* Payment Method Selector */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-700">Metode Pembayaran</label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { id: "Transfer BCA", label: "Transfer BCA" },
                { id: "Transfer Mandiri", label: "Transfer Mandiri" },
                { id: "GoPay", label: "GoPay" },
                { id: "DANA", label: "DANA" },
              ].map((method) => (
                <label
                  key={method.id}
                  className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                    metodePembayaran === method.id
                      ? "border-green-600 bg-green-50/20 text-green-700 font-bold"
                      : "border-gray-200 hover:border-gray-300 text-gray-600"
                  }`}
                >
                  <span className="text-sm">{method.label}</span>
                  <input
                    type="radio"
                    name="metodePembayaran"
                    value={method.id}
                    checked={metodePembayaran === method.id}
                    onChange={(e) => setMetodePembayaran(e.target.value)}
                    className="accent-green-600 cursor-pointer"
                  />
                </label>
              ))}
            </div>
          </div>

          {/* Payment Proof Image Upload */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-700">Unggah Bukti Transfer</label>
            <div className="border-2 border-dashed border-gray-200 hover:border-green-400 rounded-2xl p-6 text-center cursor-pointer transition relative">
              <input
                type="file"
                accept="image/png, image/jpeg"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                required
              />
              <div className="space-y-2">
                <span className="text-4xl block">📸</span>
                <p className="text-sm font-medium text-gray-600">Klik atau seret file gambar untuk mengunggah</p>
                <p className="text-xs text-gray-400">Hanya file JPG/PNG dengan ukuran maksimal 2MB</p>
              </div>
            </div>
          </div>

          {/* Proof Preview */}
          {buktiPreview && (
            <div className="space-y-2">
              <span className="block text-xs font-semibold text-gray-500">Pratinjau Bukti:</span>
              <div className="relative rounded-2xl overflow-hidden border border-gray-100 max-h-48 flex justify-center bg-gray-50">
                <img src={buktiPreview} alt="Bukti Transfer" className="object-contain max-h-48" />
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={submitting}
            className={`w-full py-4 rounded-2xl font-semibold text-white transition-all shadow-lg text-center cursor-pointer ${
              submitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 hover:shadow-xl hover:scale-[1.01]"
            }`}
          >
            {submitting ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
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
