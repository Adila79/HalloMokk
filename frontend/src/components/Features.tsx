export default function Features() {
  const features = [
    {
      icon: "🏟️",
      title: "Lapangan Berkualitas",
      description: "Pilihan lapangan futsal terbaik dengan fasilitas lengkap dan terjaga"
    },
    {
      icon: "⏱️",
      title: "Booking Instan",
      description: "Pesan lapangan dalam hitungan detik tanpa ribet"
    },
    {
      icon: "💰",
      title: "Harga Terjangkau",
      description: "Tarif kompetitif dengan berbagai paket diskon menarik"
    },
    {
      icon: "🎯",
      title: "Lokasi Strategis",
      description: "Lapangan tersebar di berbagai lokasi mudah dijangkau"
    },
    {
      icon: "👥",
      title: "Komunitas",
      description: "Bergabung dengan komunitas pemain futsal terbesar"
    },
    {
      icon: "📱",
      title: "Aplikasi Mobile",
      description: "Mudah diakses melalui web dan aplikasi mobile"
    }
  ];

  return (
    <section id="features" className="py-20 px-4 sm:px-6 bg-white w-full">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Mengapa Pilih <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">HalloMokk?</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600">
            Ratusan ribu pengguna telah mempercayai kami untuk booking lapangan futsal
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, idx) => (
            <div 
              key={idx} 
              className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 hover:shadow-xl transition transform hover:scale-105 border border-green-100"
            >
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
