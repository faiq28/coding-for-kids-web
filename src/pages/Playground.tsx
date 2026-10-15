import { useEffect, useMemo, useState } from "react";
import { Check, Play, RotateCcw } from "lucide-react";
import PageHeader from "../components/PageHeader";
import Button from "../components/ui/Button";
import { useProgress } from "../context/ProgressContext";

const templates = {
  "Kartu Nama": `<h1>Halo, aku Dika!</h1>
<p>Aku suka coding dan robot.</p>

<style>
  body { font-family: sans-serif; text-align: center; background: #eef; }
  h1 { color: #5B5BF7; }
</style>`,
  "Tombol Ajaib": `<h1 id="judul">Klik tombolnya!</h1>
<button onclick="document.getElementById('judul').innerText = 'Hore, berhasil! 🎉'">
  Klik aku
</button>

<style>
  body { font-family: sans-serif; text-align: center; padding-top: 30px; }
  h1 { color: #16a34a; }
  button { font-size: 20px; padding: 12px 24px; border-radius: 999px; border: 0; background: #5B5BF7; color: white; }
</style>`,
  "Mulai Kosong": `<h1>Tulis judulmu di sini</h1>
`,
} as const;

type TemplateName = keyof typeof templates;

function Playground() {
  const { progress, addRun, completeChallenge } = useProgress();
  const [code, setCode] = useState<string>(templates["Kartu Nama"]);
  const [html, setHtml] = useState<string>(code);
  const [claimedNow, setClaimedNow] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setHtml(code), 500);
    return () => window.clearTimeout(t);
  }, [code]);

  const checks = useMemo(() => {
    const c = code.toLowerCase();
    return [
      { label: "Buat judul dengan <h1>", ok: c.includes("<h1") },
      { label: "Beri warna dengan color", ok: c.includes("color") },
      { label: "Tambahkan <button>", ok: c.includes("<button") },
      {
        label: "Buat tombol bereaksi dengan onclick",
        ok: c.includes("onclick"),
      },
    ];
  }, [code]);

  const allOk = checks.every((c) => c.ok);
  const claimed = progress.challenges.includes("pg-mission") || claimedNow;

  const run = () => {
    setHtml(code);
    addRun();
    if (allOk && !progress.challenges.includes("pg-mission")) {
      completeChallenge("pg-mission", 25);
      setClaimedNow(true);
    }
  };

  return (
    <div className="pb-20">
      <PageHeader
        emoji="💻"
        title="Coding Playground"
        desc="Eksperimen membuat program sendiri. Tulis kode di kiri, lihat hasilnya langsung di kanan."
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div
          className="flex flex-wrap items-center gap-2"
          role="group"
          aria-label="Pilih contoh"
        >
          {(Object.keys(templates) as TemplateName[]).map((name) => (
            <button
              key={name}
              type="button"
              onClick={() => {
                setCode(templates[name]);
                setHtml(templates[name]);
              }}
              className="rounded-full border-2 border-slate-200 bg-white px-4 py-2 text-sm font-bold hover:border-indigo-300 transition"
            >
              {name}
            </button>
          ))}
        </div>

        <div className="mt-5 grid lg:grid-cols-2 gap-5">
          <div className="rounded-3xl bg-[#182033] p-4 flex flex-col">
            <div className="flex items-center justify-between px-2 pb-3">
              <div className="flex gap-1.5" aria-hidden="true">
                <span className="w-3 h-3 rounded-full bg-rose-400" />
                <span className="w-3 h-3 rounded-full bg-yellow-400" />
                <span className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <span className="text-xs text-slate-400 font-mono">
                index.html
              </span>
            </div>
            <label className="sr-only" htmlFor="editor">
              Editor kode
            </label>
            <textarea
              id="editor"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              spellCheck={false}
              autoCapitalize="off"
              autoCorrect="off"
              className="h-[320px] sm:h-[380px] w-full resize-none rounded-2xl bg-[#0f1626] p-4 font-mono text-sm leading-relaxed text-green-200 outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <div className="mt-4 flex flex-wrap gap-3">
              <Button variant="secondary" onClick={run}>
                <Play size={18} /> Jalankan
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setCode(templates["Kartu Nama"]);
                  setHtml(templates["Kartu Nama"]);
                }}
              >
                <RotateCcw size={18} /> Reset
              </Button>
            </div>
          </div>

          <div className="rounded-3xl bg-white shadow-sm overflow-hidden flex flex-col">
            <div className="px-5 py-3 border-b text-sm font-bold text-slate-500">
              Hasil
            </div>
            <iframe
              title="Hasil kode"
              sandbox="allow-scripts"
              srcDoc={html}
              className="h-[320px] sm:h-[420px] w-full bg-white"
            />
          </div>
        </div>

        <div className="mt-6 rounded-3xl bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-black">Misi Playground</h2>
          <p className="mt-1 text-slate-500">
            Lengkapi semua langkah lalu tekan Jalankan untuk dapat +25 XP.
          </p>
          <ul className="mt-4 grid sm:grid-cols-2 gap-3">
            {checks.map((c) => (
              <li
                key={c.label}
                className={`flex items-center gap-3 rounded-2xl px-4 py-3 ${c.ok ? "bg-green-50 text-green-800" : "bg-slate-50 text-slate-600"}`}
              >
                <span
                  className={`flex h-6 w-6 items-center justify-center rounded-full ${c.ok ? "bg-green-500 text-white" : "bg-slate-200"}`}
                >
                  {c.ok && <Check size={14} />}
                </span>
                <span className="font-semibold">{c.label}</span>
              </li>
            ))}
          </ul>
          {claimed && (
            <p className="mt-4 font-bold text-green-700">
              Misi selesai, kerja bagus! 🎉
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Playground;
