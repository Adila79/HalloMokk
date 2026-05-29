import Navbar from "@/components/Navbar";

export default function RegisterPage() {
  return (
    <>
      <Navbar />

      <div className="p-10">
        <h1 className="text-3xl font-bold mb-5">
          Register
        </h1>

        <form className="flex flex-col gap-3 max-w-md">
          <input
            type="text"
            placeholder="Nama"
            className="border p-2"
          />

          <input
            type="email"
            placeholder="Email"
            className="border p-2"
          />

          <input
            type="password"
            placeholder="Password"
            className="border p-2"
          />

          <button
            className="bg-blue-600 text-white p-2 rounded"
          >
            Register
          </button>
        </form>
      </div>
    </>
  );
}