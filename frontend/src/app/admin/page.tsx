"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  getAdminBookings,
  getLapangan,
  updatePaymentStatus,
  createLapangan,
  deleteLapangan,
} from "@/services/api";

export default function AdminPage() {
  const router = useRouter();
  const { user } = useAuth();

  // Core States
  const [bookings, setBookings] = useState<any[]>([]);
  const [lapangans, setLapangans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Filter States
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all"); // all, pending, lunas, gagal, null (belum bayar)

  // Court Form States
  const [namaLapangan, setNamaLapangan] = useState("");
  const [harga, setHarga] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [addingCourt, setAddingCourt] = useState(false);
  const [courtLoading, setCourtLoading] = useState(false);

  // Active View Proof Modal
  const [selectedProof, setSelectedProof] = useState<any>(null);
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  // Check auth and load data
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    // Verify admin role
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser.role !== "admin") {
        setError("Akses ditolak. Halaman ini hanya untuk Administrator.");
        setLoading(false);
        return;
      }
    } else {
      router.push("/login");
      return;
    }

    loadDashboardData(token);
  }, []);

  const loadDashboardData = async (token: string) => {
    setLoading(true);
    try {
      const [bookingsData, lapangansData] = await Promise.all([
        getAdminBookings(token),
        getLapangan(),
      ]);
      setBookings(bookingsData || []);
      setLapangans(lapangansData || []);
    } catch (err: any) {
      console.error(err);
      setError("Gagal memuat data dashboard.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (paymentId: number, status: string) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    setUpdatingId(paymentId);
    try {
      await updatePaymentStatus(paymentId, status, token);
      alert(`Status pembayaran berhasil diperbarui menjadi ${status.toUpperCase()}`);
      setSelectedProof(null); // Close modal if open
      await loadDashboardData(token); // Reload data
    } catch (err: any) {
      console.error(err);
      alert("Gagal memperbarui status pembayaran.");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleAddCourt = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!namaLapangan || !harga) {
      alert("Nama Lapangan dan Harga wajib diisi!");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) return;

    setCourtLoading(true);
    try {
      await createLapangan(
        {
          nama_lapangan: namaLapangan,
          harga: Number(harga),
          deskripsi,
        },
        token
      );
      alert("Lapangan berhasil ditambahkan!");
      setNamaLapangan("");
      setHarga("");
      setDeskripsi("");
      setAddingCourt(false);
      await loadDashboardData(token);
    } catch (err: any) {
      console.error(err);
      alert("Gagal menambahkan lapangan.");
    } finally {
      setCourtLoading(false);
    }
  };

  const handleDeleteCourt = async (id: number) => {
    if (!confirm("Apakah Anda yakin ingin menghapus lapangan ini?")) return;

    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      await deleteLapangan(id, token);
      alert("Lapangan berhasil dihapus!");
      await loadDashboardData(token);
    } catch (err: any) {
      console.error(err);
      alert("Gagal menghapus lapangan.");
    }
  };

  // Calculations for dashboard statistics
  const totalBookings = bookings.length;
  
  const totalRevenue = bookings
    .filter((b) => b.status_pembayaran === "lunas")
    .reduce((sum, b) => sum + (b.harga || 0), 0);

  const pendingPayments = bookings.filter(
    (b) => b.status_pembayaran === "pending"
  ).length;

  const totalCourts = lapangans.length;

  // Filtered Bookings list
  const filteredBookings = bookings.filter((b) => {
    const matchesSearch =
      (b.nama_user && b.nama_user.toLowerCase().includes(search.toLowerCase())) ||
      (b.email_user && b.email_user.toLowerCase().includes(search.toLowerCase())) ||
      (b.nama_lapangan && b.nama_lapangan.toLowerCase().includes(search.toLowerCase()));

    let matchesStatus = true;
    if (filterStatus !== "all") {
      if (filterStatus === "null") {
        matchesStatus = b.status_pembayaran === null;
      } else {
        matchesStatus = b.status_pembayaran === filterStatus;
      }
    }

    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-black">
        <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 font-semibold text-gray-700">Memuat dashboard admin...</p>
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
            onClick={() => router.push("/")}
            className="mt-6 bg-green-600 text-white font-semibold px-6 py-3 rounded-2xl shadow hover:bg-green-700 transition cursor-pointer"
          >
            Kembali ke Beranda
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 text-white py-10 px-4 md:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Header Dashboard */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-700/50 pb-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
              ⚙️ Admin Dashboard
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Kelola pesanan lapangan, verifikasi pembayaran, dan atur ketersediaan lapangan futsal.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="bg-slate-800 border border-slate-700 px-4 py-2 rounded-xl text-sm font-semibold text-slate-300">
              Admin: {user?.nama || user?.username || "Ammar"}
            </span>
          </div>
        </div>

        {/* Statistics Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card Total Revenue */}
          <div className="bg-slate-800/50 border border-slate-700/50 p-6 rounded-3xl backdrop-blur-sm relative overflow-hidden group hover:border-green-500/50 transition-all duration-300">
            <div className="absolute top-0 right-0 p-4 opacity-10 text-6xl select-none group-hover:scale-110 transition duration-300">💰</div>
            <p className="text-slate-400 text-sm font-semibold">Total Pendapatan</p>
            <h3 className="text-2xl md:text-3xl font-bold mt-2 text-green-400">
              Rp {totalRevenue.toLocaleString("id-ID")}
            </h3>
            <p className="text-xs text-slate-500 mt-2">Dari transaksi terverifikasi (Lunas)</p>
          </div>

          {/* Card Total Bookings */}
          <div className="bg-slate-800/50 border border-slate-700/50 p-6 rounded-3xl backdrop-blur-sm relative overflow-hidden group hover:border-blue-500/50 transition-all duration-300">
            <div className="absolute top-0 right-0 p-4 opacity-10 text-6xl select-none group-hover:scale-110 transition duration-300">⚽</div>
            <p className="text-slate-400 text-sm font-semibold">Total Pemesanan</p>
            <h3 className="text-2xl md:text-3xl font-bold mt-2 text-blue-400">
              {totalBookings}
            </h3>
            <p className="text-xs text-slate-500 mt-2">Jumlah seluruh booking lapangan</p>
          </div>

          {/* Card Pending Verification */}
          <div className="bg-slate-800/50 border border-slate-700/50 p-6 rounded-3xl backdrop-blur-sm relative overflow-hidden group hover:border-yellow-500/50 transition-all duration-300">
            <div className="absolute top-0 right-0 p-4 opacity-10 text-6xl select-none group-hover:scale-110 transition duration-300">🔍</div>
            <p className="text-slate-400 text-sm font-semibold">Menunggu Verifikasi</p>
            <h3 className="text-2xl md:text-3xl font-bold mt-2 text-yellow-400">
              {pendingPayments}
            </h3>
            <p className="text-xs text-slate-500 mt-2">Segera periksa bukti transfer masuk</p>
          </div>

          {/* Card Active Courts */}
          <div className="bg-slate-800/50 border border-slate-700/50 p-6 rounded-3xl backdrop-blur-sm relative overflow-hidden group hover:border-purple-500/50 transition-all duration-300">
            <div className="absolute top-0 right-0 p-4 opacity-10 text-6xl select-none group-hover:scale-110 transition duration-300">🏟️</div>
            <p className="text-slate-400 text-sm font-semibold">Jumlah Lapangan</p>
            <h3 className="text-2xl md:text-3xl font-bold mt-2 text-purple-400">
              {totalCourts}
            </h3>
            <p className="text-xs text-slate-500 mt-2">Kapasitas lapangan aktif terdaftar</p>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left / Main Section: Bookings list (Span 2) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-slate-800/30 border border-slate-700/30 p-6 rounded-3xl backdrop-blur-sm space-y-6">
              
              {/* Header section & filters */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h2 className="text-2xl font-bold">Daftar Booking Masuk</h2>
                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                  
                  {/* Search Input */}
                  <input
                    type="text"
                    placeholder="Cari pelanggan / lapangan..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-green-500"
                  />

                  {/* Filter Status Selector */}
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-green-500 cursor-pointer"
                  >
                    <option value="all">Semua Status</option>
                    <option value="pending">Menunggu Verifikasi</option>
                    <option value="lunas">Lunas</option>
                    <option value="gagal">Gagal</option>
                    <option value="null">Belum Bayar</option>
                  </select>

                </div>
              </div>

              {/* Table / List */}
              {filteredBookings.length === 0 ? (
                <div className="bg-slate-900/50 rounded-2xl p-8 text-center text-slate-400">
                  Tidak ada data booking yang sesuai dengan kriteria filter ⚽
                </div>
              ) : (
                <div className="overflow-x-auto rounded-2xl border border-slate-700/50">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-900/80 border-b border-slate-700/50 text-slate-400 text-xs uppercase tracking-wider">
                        <th className="p-4 font-semibold">Pelanggan</th>
                        <th className="p-4 font-semibold">Lapangan / Jadwal</th>
                        <th className="p-4 font-semibold">Biaya</th>
                        <th className="p-4 font-semibold">Status</th>
                        <th className="p-4 font-semibold text-center">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/80 text-sm">
                      {filteredBookings.map((item) => (
                        <tr key={item.id} className="hover:bg-slate-800/30 transition">
                          
                          {/* Col 1: Customer info */}
                          <td className="p-4">
                            <p className="font-bold text-white">{item.nama_user || "Pemesan"}</p>
                            <p className="text-xs text-slate-400 mt-0.5">{item.email_user || "-"}</p>
                          </td>

                          {/* Col 2: Court & schedule */}
                          <td className="p-4">
                            <p className="text-white font-medium">{item.nama_lapangan}</p>
                            <p className="text-xs text-slate-400 mt-0.5">
                              📅 {new Date(item.tanggal).toLocaleDateString("id-ID", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              })} | 🕒 {item.jam.substring(0, 5)} WIB
                            </p>
                          </td>

                          {/* Col 3: Cost */}
                          <td className="p-4 font-semibold text-slate-200">
                            Rp {item.harga ? item.harga.toLocaleString("id-ID") : "-"}
                          </td>

                          {/* Col 4: Status Badge */}
                          <td className="p-4">
                            {item.status_pembayaran === null && (
                              <span className="bg-red-500/10 text-red-400 border border-red-500/20 px-2.5 py-1 rounded-full text-xs font-semibold">
                                Belum Bayar
                              </span>
                            )}
                            {item.status_pembayaran === "pending" && (
                              <span className="bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 px-2.5 py-1 rounded-full text-xs font-semibold">
                                Verifikasi pending
                              </span>
                            )}
                            {item.status_pembayaran === "lunas" && (
                              <span className="bg-green-500/10 text-green-400 border border-green-500/20 px-2.5 py-1 rounded-full text-xs font-semibold">
                                Lunas
                              </span>
                            )}
                            {item.status_pembayaran === "gagal" && (
                              <span className="bg-red-500/15 text-red-500 border border-red-500/30 px-2.5 py-1 rounded-full text-xs font-semibold">
                                Gagal
                              </span>
                            )}
                          </td>

                          {/* Col 5: Actions */}
                          <td className="p-4 text-center">
                            <div className="flex items-center justify-center gap-2">
                              {item.bukti_pembayaran ? (
                                <button
                                  onClick={() => setSelectedProof(item)}
                                  className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs px-3 py-1.5 rounded-lg transition font-medium shadow-sm cursor-pointer"
                                >
                                  Periksa Bukti
                                </button>
                              ) : (
                                <span className="text-xs text-slate-500">Tidak ada bukti</span>
                              )}
                              
                              {/* Direct action buttons if pending verification */}
                              {item.status_pembayaran === "pending" && (
                                <div className="hidden md:flex gap-1">
                                  <button
                                    onClick={() => handleUpdateStatus(item.pembayaran_id, "lunas")}
                                    className="bg-green-600 hover:bg-green-700 text-white text-xs p-1 px-2 rounded-lg cursor-pointer transition font-bold"
                                    disabled={updatingId === item.pembayaran_id}
                                    title="Setujui Pembayaran"
                                  >
                                    ✓
                                  </button>
                                  <button
                                    onClick={() => handleUpdateStatus(item.pembayaran_id, "gagal")}
                                    className="bg-red-600 hover:bg-red-700 text-white text-xs p-1 px-2 rounded-lg cursor-pointer transition font-bold"
                                    disabled={updatingId === item.pembayaran_id}
                                    title="Tolak Pembayaran"
                                  >
                                    ✕
                                  </button>
                                </div>
                              )}
                            </div>
                          </td>

                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

            </div>
          </div>

          {/* Right Section: Court Management (Span 1) */}
          <div className="space-y-6">
            
            {/* Court Management Panel */}
            <div className="bg-slate-800/30 border border-slate-700/30 p-6 rounded-3xl backdrop-blur-sm space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">🏟️ Kelola Lapangan</h2>
                <button
                  onClick={() => setAddingCourt(!addingCourt)}
                  className="bg-green-600 hover:bg-green-700 text-white text-xs px-3 py-1.5 rounded-lg transition font-semibold cursor-pointer"
                >
                  {addingCourt ? "Batal" : "Tambah"}
                </button>
              </div>

              {/* Add Court Form */}
              {addingCourt && (
                <form onSubmit={handleAddCourt} className="bg-slate-900/60 p-4 rounded-2xl border border-slate-700/50 space-y-4">
                  <h3 className="text-sm font-bold text-green-400">Tambah Lapangan Baru</h3>
                  
                  <div className="space-y-1">
                    <label className="text-xs text-slate-400 block">Nama Lapangan</label>
                    <input
                      type="text"
                      placeholder="Contoh: Lapangan VIP 3"
                      value={namaLapangan}
                      onChange={(e) => setNamaLapangan(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-sm text-white focus:outline-none focus:border-green-500"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs text-slate-400 block">Harga Sewa per Jam (Rp)</label>
                    <input
                      type="number"
                      placeholder="Contoh: 150000"
                      value={harga}
                      onChange={(e) => setHarga(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-sm text-white focus:outline-none focus:border-green-500"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs text-slate-400 block">Deskripsi / Spesifikasi</label>
                    <textarea
                      placeholder="Contoh: Lantai interlock, indoor, tribun penonton"
                      value={deskripsi}
                      onChange={(e) => setDeskripsi(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-sm text-white focus:outline-none focus:border-green-500 h-20 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={courtLoading}
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-2.5 rounded-xl text-sm transition cursor-pointer"
                  >
                    {courtLoading ? "Menambahkan..." : "Simpan Lapangan"}
                  </button>
                </form>
              )}

              {/* Courts List */}
              <div className="space-y-3">
                {lapangans.length === 0 ? (
                  <p className="text-slate-400 text-sm text-center">Belum ada lapangan terdaftar</p>
                ) : (
                  lapangans.map((lap) => (
                    <div
                      key={lap.id}
                      className="bg-slate-900/40 border border-slate-800 rounded-2xl p-4 flex justify-between items-start gap-2 hover:border-slate-700 transition"
                    >
                      <div className="space-y-1">
                        <p className="font-bold text-white text-sm">{lap.nama_lapangan}</p>
                        <p className="text-xs text-slate-400">{lap.deskripsi || "Tanpa deskripsi"}</p>
                        <p className="text-xs font-semibold text-green-400 mt-1">
                          Rp {lap.harga ? lap.harga.toLocaleString("id-ID") : "-"} / Jam
                        </p>
                      </div>
                      <button
                        onClick={() => handleDeleteCourt(lap.id)}
                        className="bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white border border-red-500/20 p-2 rounded-xl transition text-xs cursor-pointer"
                        title="Hapus Lapangan"
                      >
                        🗑️
                      </button>
                    </div>
                  ))
                )}
              </div>

            </div>
          </div>

        </div>

      </div>

      {/* Proof of Payment Zoom Modal */}
      {selectedProof && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-800">
              <div>
                <h3 className="font-bold text-lg text-white">Verifikasi Bukti Transfer</h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  ID Booking: #{selectedProof.id} | Atas Nama: {selectedProof.nama_user}
                </p>
              </div>
              <button
                onClick={() => setSelectedProof(null)}
                className="text-slate-400 hover:text-white text-xl cursor-pointer p-1"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              
              {/* Receipt Image Display */}
              <div className="bg-slate-950 rounded-2xl p-2 border border-slate-800 flex justify-center max-h-72 overflow-hidden select-none">
                <img
                  src={`http://localhost:5000/uploads/${selectedProof.bukti_pembayaran}`}
                  alt="Bukti Transfer"
                  className="object-contain max-h-64 rounded-xl hover:scale-105 transition-all duration-300 cursor-zoom-in"
                  onError={(e: any) => {
                    e.target.src = "https://placehold.co/600x400/0f172a/94a3b8?text=Gambar+Bukti+Pembayaran";
                  }}
                />
              </div>

              {/* Rincian Transaksi */}
              <div className="bg-slate-950/50 border border-slate-800 p-4 rounded-2xl grid grid-cols-2 gap-4 text-xs">
                <div>
                  <p className="text-slate-400">Metode Pembayaran</p>
                  <p className="font-bold text-white text-sm mt-0.5">
                    {selectedProof.metode_pembayaran || "Transfer"}
                  </p>
                </div>
                <div>
                  <p className="text-slate-400">Jumlah Pembayaran</p>
                  <p className="font-bold text-green-400 text-sm mt-0.5">
                    Rp {selectedProof.harga ? selectedProof.harga.toLocaleString("id-ID") : "-"}
                  </p>
                </div>
                <div>
                  <p className="text-slate-400">Jadwal Main</p>
                  <p className="font-semibold text-slate-200 mt-0.5">
                    📅 {new Date(selectedProof.tanggal).toLocaleDateString("id-ID")}
                  </p>
                  <p className="text-slate-300">
                    🕒 {selectedProof.jam.substring(0, 5)} WIB
                  </p>
                </div>
                <div>
                  <p className="text-slate-400">Tanggal Upload</p>
                  <p className="font-semibold text-slate-200 mt-0.5">
                    {selectedProof.tanggal_pembayaran
                      ? new Date(selectedProof.tanggal_pembayaran).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "Tidak diketahui"}
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="p-6 bg-slate-950 border-t border-slate-800 flex gap-3">
              {selectedProof.status_pembayaran === "pending" ? (
                <>
                  <button
                    onClick={() => handleUpdateStatus(selectedProof.pembayaran_id, "gagal")}
                    className="flex-1 bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white border border-red-500/20 font-bold py-3 rounded-2xl text-sm transition cursor-pointer text-center"
                    disabled={updatingId === selectedProof.pembayaran_id}
                  >
                    Tolak Pembayaran
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(selectedProof.pembayaran_id, "lunas")}
                    className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-3 rounded-2xl text-sm transition cursor-pointer text-center"
                    disabled={updatingId === selectedProof.pembayaran_id}
                  >
                    Setujui Pembayaran
                  </button>
                </>
              ) : (
                <div className="w-full text-center py-2 text-sm">
                  <span className="text-slate-400">Pembayaran ini sudah diselesaikan dengan status </span>
                  <span className={`font-bold capitalize ${selectedProof.status_pembayaran === "lunas" ? "text-green-400" : "text-red-400"}`}>
                    {selectedProof.status_pembayaran}
                  </span>
                </div>
              )}
            </div>

          </div>
        </div>
      )}
    </main>
  );
}
