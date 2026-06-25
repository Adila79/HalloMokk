import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="space-y-8">
          <div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600 mb-4">
              Pesan Futsal
            </h1>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800">
              Dengan Mudah
            </h2>
          </div>

          <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
            Platform booking lapangan futsal terlengkap di Indonesia. 
            Temukan lapangan terbaik di kota Anda, booking dengan mudah, 
            dan main futsal kapan saja! ⚽
          </p>

          <div className="flex flex-wrap gap-4">
            <Link href="/booking" className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-lg font-bold text-base sm:text-lg hover:shadow-lg hover:scale-105 transition transform">
              Mulai Booking
            </Link>
            <Link href="#features" className="border-2 border-green-600 text-green-600 px-6 sm:px-8 py-3.5 sm:py-4 rounded-lg font-bold text-base sm:text-lg hover:bg-green-50 transition">
              Pelajari Lebih
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-8">
            <div className="bg-white rounded-lg p-3 sm:p-4 shadow-md text-center">
              <p className="text-2xl sm:text-3xl font-bold text-green-600">500+</p>
              <p className="text-xs sm:text-sm text-gray-600">Lapangan</p>
            </div>
            <div className="bg-white rounded-lg p-3 sm:p-4 shadow-md text-center">
              <p className="text-2xl sm:text-3xl font-bold text-green-600">10K+</p>
              <p className="text-xs sm:text-sm text-gray-600">Pemain</p>
            </div>
            <div className="bg-white rounded-lg p-3 sm:p-4 shadow-md text-center">
              <p className="text-2xl sm:text-3xl font-bold text-green-600">24/7</p>
              <p className="text-xs sm:text-sm text-gray-600">Support</p>
            </div>
          </div>
        </div>

        {/* Right Illustration */}
        <div className="hidden md:flex justify-center">
          <div className="relative w-full h-96">
            <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 rounded-3xl opacity-20 blur-3xl"></div>
            <div className="relative bg-white rounded-3xl shadow-2xl p-8 flex flex-col items-center justify-center h-full">
              <div className="text-8xl mb-4">⚽</div>
              <p className="text-2xl font-bold text-gray-800 text-center">
                Siap Bermain?
              </p>
              <p className="text-gray-600 text-center mt-2">
                Cari lapangan & booking sekarang
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}