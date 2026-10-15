import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Play,
  RotateCcw,
  Undo2,
} from "lucide-react";
import PageHeader from "../components/PageHeader";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";
import { useProgress } from "../context/ProgressContext";

type GameId = "memory" | "maze" | "quiz";

const tabs: { id: GameId; icon: string; title: string; desc: string }[] = [
  {
    id: "memory",
    icon: "🧠",
    title: "Memory Match",
    desc: "Cocokkan pasangan kartu",
  },
  {
    id: "maze",
    icon: "🧭",
    title: "Robot Maze",
    desc: "Susun perintah untuk Q-Bot",
  },
  { id: "quiz", icon: "⚡", title: "Kuis Cepat", desc: "Jawab 5 soal kode" },
];

function Games() {
  const [active, setActive] = useState<GameId>("memory");

  return (
    <div className="pb-20">
      <PageHeader
        maxW="max-w-5xl"
        emoji="🎮"
        title="Games"
        desc="Belajar sambil bermain. Latih logika, ingatan, dan algoritma lewat tiga permainan seru."
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div
          className="grid sm:grid-cols-3 gap-3"
          role="tablist"
          aria-label="Pilih game"
        >
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={active === t.id}
              onClick={() => setActive(t.id)}
              className={`flex items-center gap-3 rounded-2xl border-2 p-4 text-left transition ${
                active === t.id
                  ? "border-indigo-500 bg-indigo-50"
                  : "border-slate-100 bg-white hover:border-indigo-200"
              }`}
            >
              <span className="text-3xl" aria-hidden="true">
                {t.icon}
              </span>
              <span>
                <span className="block font-black">{t.title}</span>
                <span className="block text-sm text-slate-500">{t.desc}</span>
              </span>
            </button>
          ))}
        </div>

        <div
          className="mt-6 rounded-[2rem] bg-white p-5 sm:p-8 shadow-sm"
          role="tabpanel"
        >
          {active === "memory" && <Memory />}
          {active === "maze" && <Maze />}
          {active === "quiz" && <Quiz />}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------ MEMORY ------------------------------ */

const EMOJIS = ["💻", "🤖", "⭐", "🚀", "🎮", "🧩", "🏆", "🔥"];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const newDeck = () => shuffle([...EMOJIS, ...EMOJIS]);

function Memory() {
  const { progress, recordMemory } = useProgress();
  const [deck, setDeck] = useState(newDeck);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const lock = useRef(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const won = matched.length === deck.length;

  useEffect(() => {
    if (won) recordMemory(moves);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [won]);

  const flip = (i: number) => {
    if (lock.current || flipped.includes(i) || matched.includes(i)) return;
    const next = [...flipped, i];
    setFlipped(next);
    if (next.length === 2) {
      setMoves((m) => m + 1);
      const [a, b] = next;
      if (deck[a] === deck[b]) {
        setMatched((m) => [...m, a, b]);
        setFlipped([]);
      } else {
        lock.current = true;
        timer.current = window.setTimeout(() => {
          setFlipped([]);
          lock.current = false;
        }, 800);
      }
    }
  };

  const restart = () => {
    window.clearTimeout(timer.current);
    lock.current = false;
    setDeck(newDeck());
    setFlipped([]);
    setMatched([]);
    setMoves(0);
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-2">
          <Badge text={`Langkah: ${moves}`} tone="indigo" />
          <Badge
            text={
              progress.memoryBest !== null
                ? `Terbaik: ${progress.memoryBest}`
                : "Belum ada rekor"
            }
            tone="yellow"
          />
        </div>
        <Button variant="outline" onClick={restart}>
          <RotateCcw size={18} /> Acak ulang
        </Button>
      </div>

      <div className="mx-auto mt-6 grid max-w-md grid-cols-4 gap-2 sm:gap-3">
        {deck.map((emoji, i) => {
          const open = flipped.includes(i) || matched.includes(i);
          return (
            <button
              key={i}
              type="button"
              onClick={() => flip(i)}
              aria-label={open ? `Kartu ${emoji}` : "Kartu tertutup"}
              className={`aspect-square rounded-2xl text-3xl sm:text-4xl flex items-center justify-center transition duration-300 ${
                matched.includes(i)
                  ? "bg-green-100"
                  : open
                    ? "bg-yellow-100"
                    : "bg-[#5B5BF7] text-white hover:bg-indigo-600 shadow-[0_4px_0_#3f3fc4]"
              }`}
            >
              {open ? emoji : "?"}
            </button>
          );
        })}
      </div>

      {won && (
        <div
          role="status"
          className="mt-6 rounded-2xl bg-green-50 p-4 text-center font-bold text-green-800"
          style={{ animation: "pop .4s ease" }}
        >
          🎉 Hebat! Kamu menyelesaikannya dalam {moves} langkah.
        </div>
      )}
    </div>
  );
}

/* ------------------------------- MAZE ------------------------------- */

type Cmd = "up" | "down" | "left" | "right";

const MAZES = [
  ["S..G.", ".....", ".....", ".....", "....."],
  ["S.#..", "..#.G", ".....", "..#..", "....."],
  ["S#..G", ".#.#.", ".#.#.", "...#.", "....."],
];

const MAX_CMDS = 12;
const delta: Record<Cmd, [number, number]> = {
  up: [-1, 0],
  down: [1, 0],
  left: [0, -1],
  right: [0, 1],
};
const arrow: Record<Cmd, React.ReactNode> = {
  up: <ArrowUp size={18} />,
  down: <ArrowDown size={18} />,
  left: <ArrowLeft size={18} />,
  right: <ArrowRight size={18} />,
};

function find(grid: string[], ch: string): [number, number] {
  for (let r = 0; r < grid.length; r++) {
    const c = grid[r].indexOf(ch);
    if (c >= 0) return [r, c];
  }
  return [0, 0];
}

function Maze() {
  const { progress, completeMaze } = useProgress();
  const [level, setLevel] = useState(0);
  const grid = MAZES[level];
  const start = useMemo(() => find(grid, "S"), [grid]);
  const goal = useMemo(() => find(grid, "G"), [grid]);
  const [pos, setPos] = useState<[number, number]>(start);
  const [queue, setQueue] = useState<Cmd[]>([]);
  const [running, setRunning] = useState(false);
  const [bump, setBump] = useState(false);
  const [message, setMessage] = useState("");
  const alive = useRef(true);

  useEffect(() => {
    alive.current = true;
    return () => {
      alive.current = false;
    };
  }, []);

  const reset = (lv = level) => {
    setPos(find(MAZES[lv], "S"));
    setQueue([]);
    setMessage("");
    setBump(false);
  };

  const choose = (lv: number) => {
    if (running) return;
    setLevel(lv);
    reset(lv);
  };

  const run = async () => {
    if (running || queue.length === 0) return;
    setRunning(true);
    setMessage("");
    let [r, c] = start;
    setPos([r, c]);
    for (const cmd of queue) {
      await new Promise((res) => setTimeout(res, 450));
      if (!alive.current) return;
      const [dr, dc] = delta[cmd];
      const nr = r + dr;
      const nc = c + dc;
      const blocked =
        nr < 0 ||
        nc < 0 ||
        nr >= grid.length ||
        nc >= grid[0].length ||
        grid[nr][nc] === "#";
      if (blocked) {
        setBump(true);
        await new Promise((res) => setTimeout(res, 300));
        if (!alive.current) return;
        setBump(false);
      } else {
        r = nr;
        c = nc;
        setPos([r, c]);
      }
      if (r === goal[0] && c === goal[1]) break;
    }
    if (!alive.current) return;
    if (r === goal[0] && c === goal[1]) {
      setMessage("🎉 Q-Bot sampai di bintang!");
      completeMaze(level, 20);
    } else {
      setMessage("Q-Bot belum sampai. Ubah urutan perintahnya lalu coba lagi!");
    }
    setRunning(false);
  };

  const add = (cmd: Cmd) => {
    if (running || queue.length >= MAX_CMDS) return;
    setQueue((q) => [...q, cmd]);
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-2" role="group" aria-label="Pilih level">
          {MAZES.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => choose(i)}
              aria-pressed={level === i}
              className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                level === i
                  ? "bg-[#5B5BF7] text-white"
                  : "bg-slate-100 hover:bg-indigo-100"
              }`}
            >
              Level {i + 1} {progress.mazeDone.includes(i) && "✓"}
            </button>
          ))}
        </div>
        <Badge text={`Perintah: ${queue.length}/${MAX_CMDS}`} tone="indigo" />
      </div>

      <p className="mt-4 text-slate-600">
        Susun perintah panah, lalu tekan Jalankan agar Q-Bot sampai ke bintang.
        Batu tidak bisa dilewati!
      </p>

      <div className="mx-auto mt-5 grid max-w-sm grid-cols-5 gap-1.5 rounded-3xl bg-indigo-50 p-3">
        {grid.flatMap((row, r) =>
          row.split("").map((ch, c) => {
            const here = pos[0] === r && pos[1] === c;
            return (
              <div
                key={`${r}-${c}`}
                className={`aspect-square rounded-xl flex items-center justify-center text-2xl sm:text-3xl ${
                  ch === "#" ? "bg-slate-300" : "bg-white"
                }`}
                style={here && bump ? { animation: "shake .3s" } : undefined}
              >
                {here ? "🤖" : ch === "#" ? "🪨" : ch === "G" ? "⭐" : ""}
              </div>
            );
          }),
        )}
      </div>

      <div
        className="mx-auto mt-5 flex max-w-sm justify-center gap-2"
        role="group"
        aria-label="Tambah perintah"
      >
        {(Object.keys(arrow) as Cmd[]).map((cmd) => (
          <button
            key={cmd}
            type="button"
            onClick={() => add(cmd)}
            disabled={running || queue.length >= MAX_CMDS}
            aria-label={`Tambah perintah ${cmd}`}
            className="flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-300 font-bold shadow-[0_4px_0_#ca9a04] active:translate-y-1 active:shadow-none disabled:opacity-50"
          >
            {arrow[cmd]}
          </button>
        ))}
      </div>

      <div
        className="mx-auto mt-4 min-h-12 max-w-sm rounded-2xl bg-slate-50 p-3 flex flex-wrap gap-1.5"
        aria-label="Urutan perintah"
      >
        {queue.length === 0 && (
          <span className="text-sm text-slate-400">Belum ada perintah</span>
        )}
        {queue.map((cmd, i) => (
          <span
            key={i}
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-white shadow-sm"
          >
            {arrow[cmd]}
          </span>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap justify-center gap-3">
        <Button
          variant="secondary"
          onClick={run}
          disabled={running || queue.length === 0}
        >
          <Play size={18} /> Jalankan
        </Button>
        <Button
          variant="outline"
          onClick={() => setQueue((q) => q.slice(0, -1))}
          disabled={running || queue.length === 0}
        >
          <Undo2 size={18} /> Hapus
        </Button>
        <Button variant="outline" onClick={() => reset()} disabled={running}>
          <RotateCcw size={18} /> Ulang
        </Button>
      </div>

      {message && (
        <div
          role="status"
          className={`mx-auto mt-5 max-w-sm rounded-2xl p-4 text-center font-bold ${message.startsWith("🎉") ? "bg-green-50 text-green-800" : "bg-yellow-50 text-yellow-800"}`}
        >
          {message}
        </div>
      )}
    </div>
  );
}

/* ------------------------------- QUIZ ------------------------------- */

const BANK = [
  { q: "Apa hasil dari 4 + 6 ?", o: ["46", "10", "24"], a: 1 },
  { q: "Tag HTML untuk judul paling besar?", o: ["<h1>", "<p>", "<br>"], a: 0 },
  {
    q: "Perulangan dipakai untuk...",
    o: ["Mengulang perintah", "Menghapus file", "Mematikan komputer"],
    a: 0,
  },
  {
    q: "Kesalahan di dalam program disebut...",
    o: ["Bug", "Bonus", "Badge"],
    a: 0,
  },
  {
    q: "CSS dipakai untuk mengatur...",
    o: ["Tampilan", "Baterai", "Suara speaker"],
    a: 0,
  },
  {
    q: "Variabel itu seperti...",
    o: ["Kotak berlabel", "Kabel charger", "Layar"],
    a: 0,
  },
  {
    q: "Komputer membaca program dari...",
    o: ["Atas ke bawah", "Bawah ke atas", "Acak"],
    a: 0,
  },
  {
    q: "Bahasa yang membuat web interaktif?",
    o: ["JavaScript", "Bahasa Isyarat", "Bahasa Daerah"],
    a: 0,
  },
];

const pick = () => shuffle(BANK).slice(0, 5);

function Quiz() {
  const { progress, recordQuiz } = useProgress();
  const [qs, setQs] = useState(pick);
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [chosen, setChosen] = useState<number | null>(null);
  const done = idx >= qs.length;

  const answer = (i: number) => {
    if (chosen !== null) return;
    setChosen(i);
    if (i === qs[idx].a) setScore((s) => s + 1);
  };

  const next = () => {
    const last = idx === qs.length - 1;
    if (last) recordQuiz(score);
    setChosen(null);
    setIdx((n) => n + 1);
  };

  const again = () => {
    setQs(pick());
    setIdx(0);
    setScore(0);
    setChosen(null);
  };

  if (done) {
    return (
      <div className="text-center py-6">
        <div className="text-6xl" aria-hidden="true">
          {score === 5 ? "🏆" : score >= 3 ? "🌟" : "💪"}
        </div>
        <h2 className="mt-4 text-3xl font-black">Skor kamu {score}/5</h2>
        <p className="mt-2 text-slate-500">
          Rekor terbaik: {progress.quizBest}/5. Setiap kenaikan rekor memberi +5
          XP per poin.
        </p>
        <div className="mt-6">
          <Button onClick={again}>
            <RotateCcw size={18} /> Main lagi
          </Button>
        </div>
      </div>
    );
  }

  const cur = qs[idx];

  return (
    <div>
      <div className="flex items-center justify-between">
        <Badge text={`Soal ${idx + 1}/${qs.length}`} tone="indigo" />
        <Badge text={`Skor ${score}`} tone="yellow" />
      </div>

      <h2 className="mt-6 text-2xl sm:text-3xl font-black">{cur.q}</h2>

      <div className="mt-5 grid gap-3">
        {cur.o.map((opt, i) => {
          const state =
            chosen === null
              ? "border-slate-200 hover:border-indigo-300"
              : i === cur.a
                ? "border-green-400 bg-green-50"
                : i === chosen
                  ? "border-rose-300 bg-rose-50"
                  : "border-slate-100 opacity-60";
          return (
            <button
              key={opt}
              type="button"
              onClick={() => answer(i)}
              className={`rounded-2xl border-2 px-5 py-4 text-left font-bold transition ${state}`}
            >
              {opt}
            </button>
          );
        })}
      </div>

      {chosen !== null && (
        <div className="mt-6 flex items-center justify-between gap-3">
          <p role="status" className="font-bold">
            {chosen === cur.a ? "✅ Benar!" : "❌ Belum tepat"}
          </p>
          <Button onClick={next}>
            {idx === qs.length - 1 ? "Lihat skor" : "Lanjut"}
          </Button>
        </div>
      )}
    </div>
  );
}

export default Games;
