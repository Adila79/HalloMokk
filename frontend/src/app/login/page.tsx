import Navbar from "@/components/Navbar";

export default function LoginPage() {
  return (
    <>
      <Navbar />

      <div className="p-10">
        <h1 className="text-3xl font-bold mb-5">
          Login
        </h1>

        <form className="flex flex-col gap-3 max-w-md">
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
            className="bg-green-600 text-white p-2 rounded"
          >
            Login
          </button>
        </form>
      </div>
    </>
  );
}