import Navbar from "@/components/Navbar";

export default function BookingPage() {
  return (
    <>
      <Navbar />

      <div className="p-10">
        <h1 className="text-3xl font-bold">
          Halaman Booking
        </h1>

        <form className="mt-5 flex flex-col gap-3 max-w-md">
          <input
            type="text"
            placeholder="Nama"
            className="border p-2"
          />

          <input
            type="date"
            className="border p-2"
          />

          <button
            className="bg-blue-600 text-white p-2 rounded"
          >
            Booking
          </button>
        </form>
      </div>
    </>
  );
}