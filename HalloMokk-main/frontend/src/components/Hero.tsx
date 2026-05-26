import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-orange-50 via-red-50 to-orange-100 min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="space-y-8">
          <div>
            <h1 className="text-6xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600 mb-4">
              Pesan Futsal
            </h1>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800">
              Dengan Mudah
            </h2>
          </div>

          <p className="text-xl text-gray-600 leading-relaxed">
            Platform booking lapangan futsal terlengkap di Indonesia. 
            Temukan lapangan terbaik di kota Anda, booking dengan mudah, 
            dan main futsal kapan saja! ⚽
          </p>

          <div className="flex flex-wrap gap-4">
            <Link href="/booking" className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:shadow-lg hover:scale-105 transition transform">
              Mulai Booking
            </Link>
            <Link href="#features" className="border-2 border-orange-600 text-orange-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-orange-50 transition">
              Pelajari Lebih
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 pt-8">
            <div className="bg-white rounded-lg p-4 shadow-md">
              <p className="text-3xl font-bold text-orange-600">500+</p>
              <p className="text-sm text-gray-600">Lapangan</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-md">
              <p className="text-3xl font-bold text-orange-600">10K+</p>
              <p className="text-sm text-gray-600">Pemain</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-md">
              <p className="text-3xl font-bold text-orange-600">24/7</p>
              <p className="text-sm text-gray-600">Support</p>
            </div>
          </div>
        </div>

        {/* Right Illustration */}
        <div className="hidden md:flex justify-center">
          <div className="relative w-full h-96">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-400 rounded-3xl opacity-20 blur-3xl"></div>
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