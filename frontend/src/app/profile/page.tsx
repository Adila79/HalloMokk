"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function ProfilePage() {
  const router = useRouter();
  const { logout } = useAuth();

  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");

    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    logout();

    alert("Logout berhasil");

    router.push("/login");
  };

  return (
    <main className="min-h-screen bg-sky-100 flex justify-center items-center p-4 sm:p-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-sky-400 mb-6">
          Profile User
        </h1>

        {user ? (
          <div className="space-y-4">
            <div>
              <p className="font-semibold text-black">
                Nama
              </p>

              <p className="text-gray-600">
                {user.name || user.username || user.nama || "-"}
              </p>
            </div>

            <div>
              <p className="font-semibold text-black">
                Email
              </p>

              <p className="text-gray-600">
                {user.email}
              </p>
            </div>

            <button
              onClick={handleLogout}
              className="w-full bg-red-500 hover:bg-red-600 text-white p-3 rounded-xl"
            >
              Logout
            </button>
          </div>
        ) : (
          <p className="text-center text-black">
            Data user tidak ditemukan
          </p>
        )}
      </div>
    </main>
  );
}