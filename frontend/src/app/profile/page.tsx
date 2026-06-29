"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function ProfilePage() {
  const router = useRouter();
  const { user, updateUser, logout } = useAuth();

  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    phone: "",
    avatar: "",
  });
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        nama: user.nama || user.name || user.username || "",
        email: user.email || "",
        phone: user.phone || "",
        avatar: user.avatar || "",
      });
    }
  }, [user]);

  const handleLogout = () => {
    logout();
    alert("Logout berhasil");
    router.push("/login");
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setFormData((prev) => ({ ...prev, avatar: reader.result as string }));
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    if (!user) return;

    const updatedUser = {
      ...user,
      ...formData,
      nama: formData.nama,
      phone: formData.phone,
      avatar: formData.avatar,
    };

    updateUser(updatedUser);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2200);
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(6,182,212,0.16),_transparent_24%),radial-gradient(circle_at_bottom_right,_rgba(16,185,129,0.18),_transparent_28%),linear-gradient(135deg,_#020617_0%,_#111827_50%,_#0f172a_100%)] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl justify-center">
        <div className="w-full rounded-[36px] border border-white/15 bg-slate-950/75 p-4 text-white shadow-[0_25px_90px_rgba(2,6,23,0.35)] backdrop-blur-xl sm:p-8">
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-[28px] border border-white/10 bg-gradient-to-br from-emerald-500/10 to-sky-500/10 p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border border-white/20 bg-slate-900 text-2xl font-semibold text-white">
                  {formData.avatar ? (
                    <img src={formData.avatar} alt="Avatar pengguna" className="h-full w-full object-cover" />
                  ) : (
                    formData.nama?.charAt(0) || formData.email?.charAt(0) || "U"
                  )}
                </div>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-300">Account profile</p>
                  <h1 className="text-2xl font-semibold text-white">
                    {formData.nama || "Pengguna"}
                  </h1>
                  <p className="text-sm text-slate-400">Anggota HalloMokk</p>
                </div>
              </div>

              <div className="mt-6 rounded-[24px] border border-white/10 bg-white/8 p-4">
                <p className="text-sm text-slate-400">Status akun</p>
                <div className="mt-2 flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                  <span className="text-sm font-medium text-emerald-300">Aktif dan terverifikasi</span>
                </div>
              </div>

              <label className="mt-6 block cursor-pointer rounded-full border border-white/10 bg-slate-900/70 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-slate-800">
                Ubah avatar
                <input type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
              </label>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-white/8 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-white">Informasi akun</h2>
                  <p className="mt-1 text-sm text-slate-400">Ubah profil Anda sesuai kebutuhan.</p>
                </div>
                <div className="rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-1 text-sm font-medium text-emerald-300">
                  Personal
                </div>
              </div>

              <div className="mt-6 grid gap-4">
                <div>
                  <label className="mb-2 block text-sm text-slate-400">Nama lengkap</label>
                  <input
                    value={formData.nama}
                    onChange={(e) => setFormData((prev) => ({ ...prev, nama: e.target.value }))}
                    className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white outline-none focus:border-emerald-400"
                    placeholder="Masukkan nama lengkap"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-slate-400">Email</label>
                  <input
                    value={formData.email}
                    disabled
                    className="w-full rounded-2xl border border-white/10 bg-slate-800/80 px-4 py-3 text-sm text-slate-400 outline-none"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-slate-400">Nomor telepon</label>
                  <input
                    value={formData.phone}
                    onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                    className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white outline-none focus:border-emerald-400"
                    placeholder="Contoh: 081234567890"
                  />
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button onClick={handleSave} className="rounded-full bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-500">
                  {isSaved ? "Tersimpan" : "Simpan perubahan"}
                </button>
                <button onClick={() => router.push("/booking")} className="rounded-full border border-white/10 bg-white/8 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/12">
                  Lihat Booking Saya
                </button>
                <button onClick={handleLogout} className="rounded-full border border-rose-400/30 bg-rose-500/10 px-5 py-3 text-sm font-semibold text-rose-300 transition hover:bg-rose-500/20">
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}