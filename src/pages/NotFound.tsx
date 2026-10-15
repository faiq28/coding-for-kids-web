import Button from "../components/ui/Button";

function NotFound() {
  return (
    <section className="px-6 py-24 text-center">
      <div className="text-7xl" aria-hidden="true">
        🛰️
      </div>
      <h1 className="mt-6 text-4xl font-black">Halaman tidak ditemukan</h1>
      <p className="mt-3 text-slate-500">
        Q-Bot tersesat di luar angkasa. Ayo kembali ke Home.
      </p>
      <div className="mt-8">
        <Button to="/">Kembali ke Home</Button>
      </div>
    </section>
  );
}

export default NotFound;
