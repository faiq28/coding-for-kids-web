import PageHeader from "../components/PageHeader";
import XPBar from "../components/XPBar";
import Badge from "../components/ui/Badge";
import { useProgress } from "../context/ProgressContext";
import { badges } from "../data/badges";

function Achievement() {
  const { progress } = useProgress();
  const unlocked = badges.filter((b) => b.check(progress)).length;

  return (
    <div className="pb-20">
      <PageHeader
        emoji="🏆"
        title="Achievement"
        desc="Kumpulkan badge dan naik level. Setiap petualangan membuka lencana baru."
      >
        <Badge text={`${unlocked}/${badges.length} badge`} tone="yellow" />
      </PageHeader>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <XPBar className="max-w-md" />

        <ul className="mt-8 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-5">
          {badges.map((b) => {
            const ok = b.check(progress);
            return (
              <li
                key={b.id}
                className={`rounded-3xl p-5 text-center transition ${
                  ok ? "bg-white shadow-md" : "bg-slate-100/70"
                }`}
              >
                <div
                  className={`mx-auto flex h-20 w-20 items-center justify-center rounded-full text-4xl ${
                    ok ? "bg-yellow-100" : "bg-slate-200 grayscale opacity-60"
                  }`}
                  style={ok ? { animation: "pop .5s ease" } : undefined}
                  aria-hidden="true"
                >
                  {b.icon}
                </div>
                <h2 className="mt-4 font-black leading-snug">{b.title}</h2>
                <p className="mt-1 text-sm text-slate-500">{b.desc}</p>
                <p
                  className={`mt-3 text-sm font-bold ${ok ? "text-green-600" : "text-slate-400"}`}
                >
                  {ok ? "Terbuka ✓" : b.progress(progress)}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default Achievement;
