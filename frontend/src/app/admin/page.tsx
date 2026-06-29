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

  const [bookings, setBookings] = useState<any[]>([]);
  const [lapangans, setLapangans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const [namaLapangan, setNamaLapangan] = useState("");
  const [harga, setHarga] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [addingCourt, setAddingCourt] = useState(false);
  const [courtLoading, setCourtLoading] = useState(false);

  const [selectedProof, setSelectedProof] = useState<any>(null);
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

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
      setSelectedProof(null);
      await loadDashboardData(token);
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

  const totalBookings = bookings.length;
  const totalRevenue = bookings
    .filter((b) => b.status_pembayaran === "lunas")
    .reduce((sum, b) => sum + (b.harga || 0), 0);
  const pendingPayments = bookings.filter((b) => b.status_pembayaran === "pending").length;
  const totalCourts = lapangans.length;

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
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-6 text-slate-700">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-green-600 border-t-transparent" />
          <p className="mt-4 font-semibold">Memuat dashboard admin...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-6 text-center text-slate-700">
        <div className="max-w-md rounded-[28px] border border-red-200 bg-red-50 p-8 shadow-lg">
          <div className="text-5xl">⚠️</div>
          <p className="mt-4 font-semibold text-red-600">{error}</p>
          <button onClick={() => router.push("/")} className="mt-6 rounded-full bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700">
            Kembali ke Beranda
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.22),_transparent_24%),radial-gradient(circle_at_bottom_right,_rgba(6,182,212,0.18),_transparent_28%),linear-gradient(135deg,_#020617_0%,_#064e3b_50%,_#0f766e_100%)] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="flex flex-col gap-4 rounded-[32px] border border-white/10 bg-gradient-to-br from-slate-950 via-emerald-950/80 to-slate-900 p-6 text-white shadow-[0_20px_70px_rgba(2,6,23,0.35)] backdrop-blur md:flex-row md:items-center md:justify-between md:p-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-300">Admin dashboard</p>
            <h1 className="mt-2 text-3xl font-bold text-white sm:text-4xl">Kelola booking dan lapangan secara real-time</h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-300 sm:text-base">Pantau transaksi, verifikasi pembayaran, dan atur daftar lapangan dari satu panel yang lebih rapi dan terorganisir.</p>
          </div>
          <div className="rounded-2xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-3 text-sm font-semibold text-emerald-200 shadow-lg shadow-emerald-950/20">
            Admin: {user?.nama || user?.username || "Ammar"}
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {[
            { label: "Total Pendapatan", value: `Rp ${totalRevenue.toLocaleString("id-ID")}`, accent: "text-emerald-300", icon: "💰", glow: "from-emerald-500/20 to-cyan-500/10" },
            { label: "Total Pemesanan", value: totalBookings, accent: "text-cyan-300", icon: "⚽", glow: "from-cyan-500/20 to-emerald-500/10" },
            { label: "Menunggu Verifikasi", value: pendingPayments, accent: "text-amber-300", icon: "🔍", glow: "from-amber-500/20 to-orange-500/10" },
            { label: "Jumlah Lapangan", value: totalCourts, accent: "text-violet-300", icon: "🏟️", glow: "from-violet-500/20 to-fuchsia-500/10" },
          ].map((card) => (
            <div key={card.label} className={`rounded-[24px] border border-white/10 bg-gradient-to-br ${card.glow} p-6 text-white shadow-sm`}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-slate-300">{card.label}</p>
                  <p className={`mt-2 text-2xl font-bold ${card.accent}`}>{card.value}</p>
                </div>
                <div className="rounded-2xl bg-white/10 p-3 text-2xl">{card.icon}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.35fr_0.65fr]">
          <div className="rounded-[30px] border border-slate-200 bg-white/95 p-5 shadow-sm sm:p-6">
            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">Daftar booking masuk</h2>
                <p className="text-sm text-slate-500">Pantau status pembayaran dan kelola jadwal secara cepat.</p>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row">
                <input
                  type="text"
                  placeholder="Cari pelanggan / lapangan..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-700 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                />
                <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100">
                  <option value="all">Semua Status</option>
                  <option value="pending">Menunggu Verifikasi</option>
                  <option value="lunas">Lunas</option>
                  <option value="gagal">Gagal</option>
                  <option value="null">Belum Bayar</option>
                </select>
              </div>
            </div>

            {filteredBookings.length === 0 ? (
              <div className="rounded-[24px] border border-dashed border-slate-200 bg-slate-50 p-8 text-center text-slate-500">Tidak ada data booking yang sesuai dengan kriteria filter.</div>
            ) : (
              <div className="overflow-x-auto rounded-[24px] border border-slate-200">
                <table className="min-w-full text-left text-sm">
                  <thead className="bg-slate-50 text-slate-500">
                    <tr>
                      <th className="px-4 py-3 font-semibold">Pelanggan</th>
                      <th className="px-4 py-3 font-semibold">Lapangan / Jadwal</th>
                      <th className="px-4 py-3 font-semibold">Biaya</th>
                      <th className="px-4 py-3 font-semibold">Status</th>
                      <th className="px-4 py-3 font-semibold text-center">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 bg-white">
                    {filteredBookings.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50">
                        <td className="px-4 py-3">
                          <p className="font-semibold text-slate-900">{item.nama_user || "Pemesan"}</p>
                          <p className="text-xs text-slate-500">{item.email_user || "-"}</p>
                        </td>
                        <td className="px-4 py-3">
                          <p className="font-medium text-slate-900">{item.nama_lapangan}</p>
                          <p className="text-xs text-slate-500">📅 {new Date(item.tanggal).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })} | 🕒 {item.jam.substring(0, 5)} WIB</p>
                        </td>
                        <td className="px-4 py-3 font-semibold text-slate-700">Rp {item.harga ? item.harga.toLocaleString("id-ID") : "-"}</td>
                        <td className="px-4 py-3">
                          {item.status_pembayaran === null && <span className="rounded-full border border-red-200 bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-600">Belum Bayar</span>}
                          {item.status_pembayaran === "pending" && <span className="rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-600">Verifikasi pending</span>}
                          {item.status_pembayaran === "lunas" && <span className="rounded-full border border-green-200 bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-600">Lunas</span>}
                          {item.status_pembayaran === "gagal" && <span className="rounded-full border border-rose-200 bg-rose-50 px-2.5 py-1 text-xs font-semibold text-rose-600">Gagal</span>}
                        </td>
                        <td className="px-4 py-3 text-center">
                          <div className="flex items-center justify-center gap-2">
                            {item.bukti_pembayaran ? (
                              <button onClick={() => setSelectedProof(item)} className="rounded-full bg-gradient-to-r from-emerald-600 to-cyan-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-md">Periksa Bukti</button>
                            ) : (
                              <span className="text-xs text-slate-500">Tidak ada bukti</span>
                            )}
                            {item.status_pembayaran === "pending" && (
                              <div className="hidden gap-1 md:flex">
                                <button onClick={() => handleUpdateStatus(item.pembayaran_id, "lunas")} className="rounded-full bg-emerald-600 px-2 py-1 text-xs font-bold text-white transition hover:-translate-y-0.5 hover:bg-emerald-700" disabled={updatingId === item.pembayaran_id}>✓</button>
                                <button onClick={() => handleUpdateStatus(item.pembayaran_id, "gagal")} className="rounded-full bg-rose-600 px-2 py-1 text-xs font-bold text-white transition hover:-translate-y-0.5 hover:bg-rose-700" disabled={updatingId === item.pembayaran_id}>✕</button>
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

          <div className="rounded-[30px] border border-slate-200 bg-white/95 p-5 shadow-sm sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">Kelola lapangan</h2>
                <p className="text-sm text-slate-500">Tambah atau hapus lapangan yang tersedia.</p>
              </div>
              <button onClick={() => setAddingCourt(!addingCourt)} className="rounded-full bg-gradient-to-r from-emerald-600 to-cyan-600 px-3.5 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-lg">
                {addingCourt ? "Batal" : "Tambah"}
              </button>
            </div>

            {addingCourt && (
              <form onSubmit={handleAddCourt} className="mt-5 space-y-4 rounded-[24px] border border-slate-200 bg-slate-50 p-4">
                <h3 className="text-sm font-semibold text-emerald-700">Tambah lapangan baru</h3>
                <div className="space-y-1">
                  <label className="block text-xs font-medium text-slate-500">Nama Lapangan</label>
                  <input type="text" placeholder="Contoh: Lapangan VIP 3" value={namaLapangan} onChange={(e) => setNamaLapangan(e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100" required />
                </div>
                <div className="space-y-1">
                  <label className="block text-xs font-medium text-slate-500">Harga Sewa per Jam (Rp)</label>
                  <input type="number" placeholder="Contoh: 150000" value={harga} onChange={(e) => setHarga(e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100" required />
                </div>
                <div className="space-y-1">
                  <label className="block text-xs font-medium text-slate-500">Deskripsi / Spesifikasi</label>
                  <textarea placeholder="Contoh: Lantai interlock, indoor, tribun penonton" value={deskripsi} onChange={(e) => setDeskripsi(e.target.value)} className="h-24 w-full resize-none rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100" />
                </div>
                <button type="submit" disabled={courtLoading} className="w-full rounded-2xl bg-gradient-to-r from-emerald-600 to-cyan-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-lg">
                  {courtLoading ? "Menambahkan..." : "Simpan Lapangan"}
                </button>
              </form>
            )}

            <div className="mt-5 space-y-3">
              {lapangans.length === 0 ? (
                <p className="rounded-[20px] border border-dashed border-slate-200 bg-slate-50 p-5 text-center text-sm text-slate-500">Belum ada lapangan terdaftar</p>
              ) : (
                lapangans.map((lap) => (
                  <div key={lap.id} className="flex items-start justify-between gap-3 rounded-[20px] border border-slate-200 bg-slate-50 p-4">
                    <div>
                      <p className="font-semibold text-slate-900">{lap.nama_lapangan}</p>
                      <p className="mt-1 text-sm text-slate-500">{lap.deskripsi || "Tanpa deskripsi"}</p>
                      <p className="mt-2 text-sm font-semibold text-emerald-600">Rp {lap.harga ? lap.harga.toLocaleString("id-ID") : "-"} / Jam</p>
                    </div>
                    <button onClick={() => handleDeleteCourt(lap.id)} className="rounded-2xl border border-rose-200 bg-rose-50 p-2 text-xs font-semibold text-rose-600 transition hover:-translate-y-0.5 hover:bg-rose-600 hover:text-white" title="Hapus Lapangan">🗑️</button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedProof && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg overflow-hidden rounded-[32px] border border-slate-800 bg-slate-900 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 p-6">
              <div>
                <h3 className="text-lg font-semibold text-white">Verifikasi bukti transfer</h3>
                <p className="mt-1 text-sm text-slate-400">ID Booking: #{selectedProof.id} | Atas Nama: {selectedProof.nama_user}</p>
              </div>
              <button onClick={() => setSelectedProof(null)} className="rounded-full p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white">✕</button>
            </div>

            <div className="space-y-5 p-6">
              <div className="flex max-h-72 justify-center overflow-hidden rounded-[24px] border border-slate-800 bg-slate-950 p-2">
                <img src={`http://localhost:5000/uploads/${selectedProof.bukti_pembayaran}`} alt="Bukti Transfer" className="max-h-64 rounded-[18px] object-contain transition hover:scale-105" onError={(e: any) => { e.target.src = "https://placehold.co/600x400/0f172a/94a3b8?text=Gambar+Bukti+Pembayaran"; }} />
              </div>

              <div className="grid gap-4 rounded-[24px] border border-slate-800 bg-slate-950/50 p-4 text-sm sm:grid-cols-2">
                <div>
                  <p className="text-slate-400">Metode Pembayaran</p>
                  <p className="mt-1 font-semibold text-white">{selectedProof.metode_pembayaran || "Transfer"}</p>
                </div>
                <div>
                  <p className="text-slate-400">Jumlah Pembayaran</p>
                  <p className="mt-1 font-semibold text-green-400">Rp {selectedProof.harga ? selectedProof.harga.toLocaleString("id-ID") : "-"}</p>
                </div>
                <div>
                  <p className="text-slate-400">Jadwal Main</p>
                  <p className="mt-1 font-semibold text-slate-200">📅 {new Date(selectedProof.tanggal).toLocaleDateString("id-ID")}</p>
                  <p className="text-slate-300">🕒 {selectedProof.jam.substring(0, 5)} WIB</p>
                </div>
                <div>
                  <p className="text-slate-400">Tanggal Upload</p>
                  <p className="mt-1 font-semibold text-slate-200">{selectedProof.tanggal_pembayaran ? new Date(selectedProof.tanggal_pembayaran).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }) : "Tidak diketahui"}</p>
                </div>
              </div>
            </div>

            <div className="flex gap-3 border-t border-slate-800 bg-slate-950 p-6">
              {selectedProof.status_pembayaran === "pending" ? (
                <>
                  <button onClick={() => handleUpdateStatus(selectedProof.pembayaran_id, "gagal")} className="flex-1 rounded-2xl border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-sm font-semibold text-rose-400 transition hover:bg-rose-600 hover:text-white" disabled={updatingId === selectedProof.pembayaran_id}>Tolak Pembayaran</button>
                  <button onClick={() => handleUpdateStatus(selectedProof.pembayaran_id, "lunas")} className="flex-1 rounded-2xl bg-gradient-to-r from-green-600 to-emerald-600 px-4 py-3 text-sm font-semibold text-white transition hover:from-green-700 hover:to-emerald-700" disabled={updatingId === selectedProof.pembayaran_id}>Setujui Pembayaran</button>
                </>
              ) : (
                <div className="w-full text-center text-sm text-slate-400">Pembayaran ini sudah selesai dengan status <span className={`font-semibold capitalize ${selectedProof.status_pembayaran === "lunas" ? "text-green-400" : "text-rose-400"}`}>{selectedProof.status_pembayaran}</span></div>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
