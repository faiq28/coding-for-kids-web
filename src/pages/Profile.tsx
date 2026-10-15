import PageHeader from "../components/PageHeader";
import XPBar from "../components/XPBar";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import { useProgress } from "../context/ProgressContext";
import { badges } from "../data/badges";
import { allLessons } from "../data/worlds";
import { challenges } from "../data/challenges";

const avatars = ["🤖", "🦊", "🐼", "🦄", "🐯", "🐙", "🐸", "🚀"];

function Profile() {
  const { progress, setName, setAvatar, reset } = useProgress();
  const unlocked = badges.filter((b) => b.check(progress)).length;

  const stats = [
    {
      icon: "📚",
      label: "Pelajaran",
      value: `${progress.lessons.length}/${allLessons.length}`,
    },
    {
      icon: "🎯",
      label: "Tantangan",
      value: `${challenges.filter((c) => progress.challenges.includes(c.id)).length}/${challenges.length}`,
    },
    { icon: "🏆", label: "Badge", value: `${unlocked}/${badges.length}` },
    { icon: "💻", label: "Kode dijalankan", value: String(progress.runs) },
  ];

  return (
    <div className="pb-20">
      <PageHeader
        maxW="max-w-4xl"
        emoji="👤"
        title="Profile"
        desc="Atur nama dan avatar Explorer, lalu lihat seberapa jauh petualanganmu."
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 grid gap-6 md:grid-cols-5">
        <Card className="md:col-span-2 text-center">
          <div
            className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-indigo-100 text-6xl"
            aria-hidden="true"
          >
            {progress.avatar}
          </div>

          <label className="mt-5 block text-left">
            <span className="text-sm font-bold text-slate-500">
              Nama Explorer
            </span>
            <input
              value={progress.name}
              onChange={(e) => setName(e.target.value)}
              maxLength={16}
              className="mt-1 w-full rounded-2xl border-2 border-slate-200 px-4 py-3 font-bold outline-none focus:border-indigo-400"
            />
          </label>

          <fieldset className="mt-5 text-left">
            <legend className="text-sm font-bold text-slate-500">
              Pilih avatar
            </legend>
            <div className="mt-2 grid grid-cols-4 gap-2">
              {avatars.map((a) => (
                <button
                  key={a}
                  type="button"
                  onClick={() => setAvatar(a)}
                  aria-pressed={progress.avatar === a}
                  aria-label={`Avatar ${a}`}
                  className={`aspect-square rounded-2xl text-2xl transition ${
                    progress.avatar === a
                      ? "bg-indigo-500 scale-105"
                      : "bg-slate-100 hover:bg-indigo-100"
                  }`}
                >
                  {a}
                </button>
              ))}
            </div>
          </fieldset>
        </Card>

        <div className="md:col-span-3 space-y-6">
          <XPBar />

          <div className="grid grid-cols-2 gap-4">
            {stats.map((s) => (
              <Card key={s.label} className="!p-5">
                <div className="text-3xl" aria-hidden="true">
                  {s.icon}
                </div>
                <p className="mt-2 text-2xl font-black">{s.value}</p>
                <p className="text-sm text-slate-500">{s.label}</p>
              </Card>
            ))}
          </div>

          <Card>
            <h2 className="text-xl font-black">Badge terbaru</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {unlocked === 0 && (
                <p className="text-slate-500">
                  Belum ada badge. Mulai dari pelajaran pertama!
                </p>
              )}
              {badges
                .filter((b) => b.check(progress))
                .map((b) => (
                  <span
                    key={b.id}
                    className="rounded-full bg-yellow-100 px-4 py-2 text-sm font-bold text-yellow-800"
                  >
                    {b.icon} {b.title}
                  </span>
                ))}
            </div>
          </Card>

          <div className="flex flex-wrap gap-3">
            <Button to="/learn">Lanjut belajar</Button>
            <Button
              variant="outline"
              onClick={() => {
                if (window.confirm("Hapus semua progres dan mulai dari awal?"))
                  reset();
              }}
            >
              Reset progres
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
