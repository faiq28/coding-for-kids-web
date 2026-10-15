import { useState } from "react";
import { Check, Lightbulb } from "lucide-react";
import PageHeader from "../components/PageHeader";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";
import { useProgress } from "../context/ProgressContext";
import { challenges, type ChallengeItem } from "../data/challenges";

const tone = { Mudah: "green", Sedang: "yellow", Sulit: "red" } as const;

function Challenge() {
  const { progress } = useProgress();
  const doneCount = challenges.filter((c) =>
    progress.challenges.includes(c.id),
  ).length;
  const [dayIndex] = useState(() => {
    if (challenges.length === 0) return 0;

    const today = Math.floor(Date.now() / 86_400_000);

    return today % challenges.length;
  });

  const featured = challenges[dayIndex];

  return (
    <div className="pb-20">
      <PageHeader
        maxW="max-w-4xl"
        emoji="🎯"
        title="Challenge"
        desc="Pecahkan teka-teki kode dan kumpulkan XP. Baca kodenya baik-baik, lalu tebak hasilnya!"
      >
        <Badge
          text={`${doneCount}/${challenges.length} selesai`}
          tone="indigo"
        />
      </PageHeader>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6">
        <div className="rounded-[2rem] bg-[#5B5BF7] p-6 sm:p-8 text-white">
          <p className="font-bold text-indigo-100">Tantangan hari ini</p>
          <h2 className="mt-1 text-3xl font-black">{featured.title}</h2>
          <p className="mt-2 text-indigo-100">
            Selesaikan untuk mendapat +{featured.xp} XP.
          </p>
          <a
            href={`#${featured.id}`}
            className="mt-5 inline-block rounded-full bg-white px-6 py-3 font-bold text-[#5B5BF7] shadow-[0_4px_0_#c7c7fb]"
          >
            Kerjakan sekarang
          </a>
        </div>

        {challenges.map((c) => (
          <ChallengeCard
            key={c.id}
            item={c}
            done={progress.challenges.includes(c.id)}
          />
        ))}
      </div>
    </div>
  );
}

function ChallengeCard({ item, done }: { item: ChallengeItem; done: boolean }) {
  const { completeChallenge } = useProgress();
  const [picked, setPicked] = useState<number | null>(null);
  const [hint, setHint] = useState(false);
  const correct = picked === item.answer;

  const choose = (i: number) => {
    setPicked(i);
    if (i === item.answer) completeChallenge(item.id, item.xp);
  };

  return (
    <section
      id={item.id}
      className="scroll-mt-24 rounded-[2rem] bg-white p-5 sm:p-8 shadow-sm"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-2xl font-black">{item.title}</h2>
        <div className="flex items-center gap-2">
          <Badge text={item.level} tone={tone[item.level]} />
          <Badge text={`+${item.xp} XP`} tone="indigo" />
          {done && (
            <span
              className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500 text-white"
              aria-label="Selesai"
            >
              <Check size={18} />
            </span>
          )}
        </div>
      </div>

      <pre className="mt-5 overflow-x-auto rounded-2xl bg-[#182033] p-5 font-mono text-sm text-green-200">
        {item.code}
      </pre>

      <p className="mt-5 font-bold">{item.question}</p>

      <div className="mt-3 grid gap-3 sm:grid-cols-3">
        {item.options.map((opt, i) => {
          const state =
            picked === null
              ? done && i === item.answer
                ? "border-green-300 bg-green-50"
                : "border-slate-200 hover:border-indigo-300"
              : i === item.answer && correct
                ? "border-green-400 bg-green-50"
                : i === picked
                  ? "border-rose-300 bg-rose-50"
                  : "border-slate-100";
          return (
            <button
              key={opt}
              type="button"
              onClick={() => choose(i)}
              className={`rounded-2xl border-2 px-4 py-3 font-bold transition font-mono ${state}`}
            >
              {opt}
            </button>
          );
        })}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        {picked !== null && (
          <p
            role="status"
            className={`font-bold ${correct ? "text-green-700" : "text-rose-700"}`}
          >
            {correct ? "✅ Benar!" : "❌ Belum tepat, coba lagi."}
          </p>
        )}
        <div className="ml-auto">
          <Button variant="outline" onClick={() => setHint((h) => !h)}>
            <Lightbulb size={18} /> Petunjuk
          </Button>
        </div>
      </div>

      {hint && (
        <p className="mt-3 rounded-2xl bg-yellow-50 p-4 text-yellow-800">
          💡 {item.hint}
        </p>
      )}
    </section>
  );
}

export default Challenge;
