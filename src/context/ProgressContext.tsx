import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { getLevel } from "../data/levels";

export interface Progress {
  name: string;
  avatar: string;
  xp: number;
  lessons: string[];
  challenges: string[];
  mazeDone: number[];
  memoryBest: number | null;
  quizBest: number;
  runs: number;
}

const KEY = "codequest-progress-v1";

const initial: Progress = {
  name: "Explorer",
  avatar: "🤖",
  xp: 0,
  lessons: [],
  challenges: [],
  mazeDone: [],
  memoryBest: null,
  quizBest: 0,
  runs: 0,
};

function load(): Progress {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return { ...initial, ...JSON.parse(raw) };
  } catch {
    /* localStorage tidak tersedia */
  }
  return initial;
}

interface ProgressContextValue {
  progress: Progress;
  completeLesson: (id: string, xp: number) => void;
  completeChallenge: (id: string, xp: number) => void;
  completeMaze: (level: number, xp: number) => void;
  recordMemory: (moves: number) => void;
  recordQuiz: (score: number) => void;
  addRun: () => void;
  setName: (name: string) => void;
  setAvatar: (avatar: string) => void;
  reset: () => void;
}

const ProgressContext = createContext<ProgressContextValue | null>(null);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<Progress>(load);
  const [toast, setToast] = useState<string | null>(null);
  const ref = useRef(progress);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(progress));
    } catch {
      /* abaikan */
    }
  }, [progress]);

  const show = useCallback((msg: string) => {
    setToast(msg);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setToast(null), 2600);
  }, []);

  const commit = useCallback(
    (next: Progress, gained = 0, label = "") => {
      const before = getLevel(ref.current.xp).level;
      const after = getLevel(next.xp).level;
      ref.current = next;
      setProgress(next);
      if (after > before) show(`🎉 Naik ke Level ${after}!`);
      else if (gained > 0) show(`⭐ +${gained} XP ${label}`.trim());
    },
    [show],
  );

  const value = useMemo<ProgressContextValue>(
    () => ({
      progress,
      completeLesson: (id, xp) => {
        const p = ref.current;
        if (p.lessons.includes(id)) return;
        commit(
          { ...p, lessons: [...p.lessons, id], xp: p.xp + xp },
          xp,
          "pelajaran selesai",
        );
      },
      completeChallenge: (id, xp) => {
        const p = ref.current;
        if (p.challenges.includes(id)) return;
        commit(
          { ...p, challenges: [...p.challenges, id], xp: p.xp + xp },
          xp,
          "tantangan selesai",
        );
      },
      completeMaze: (level, xp) => {
        const p = ref.current;
        if (p.mazeDone.includes(level)) return;
        commit(
          { ...p, mazeDone: [...p.mazeDone, level], xp: p.xp + xp },
          xp,
          "level labirin",
        );
      },
      recordMemory: (moves) => {
        const p = ref.current;
        const first = p.memoryBest === null;
        const best = first ? moves : Math.min(p.memoryBest!, moves);
        commit(
          { ...p, memoryBest: best, xp: p.xp + (first ? 30 : 0) },
          first ? 30 : 0,
          "Memory Match",
        );
      },
      recordQuiz: (score) => {
        const p = ref.current;
        const gain = Math.max(0, score - p.quizBest) * 5;
        commit(
          { ...p, quizBest: Math.max(p.quizBest, score), xp: p.xp + gain },
          gain,
          "Kuis Cepat",
        );
      },
      addRun: () => commit({ ...ref.current, runs: ref.current.runs + 1 }),
      setName: (name) => commit({ ...ref.current, name }),
      setAvatar: (avatar) => commit({ ...ref.current, avatar }),
      reset: () => commit(initial),
    }),
    [progress, commit],
  );

  return (
    <ProgressContext.Provider value={value}>
      {children}
      <div
        role="status"
        aria-live="polite"
        className={`fixed bottom-6 left-1/2 z-[60] -translate-x-1/2 rounded-full bg-[#182033] px-6 py-3 font-bold text-white shadow-xl transition-all duration-300 ${
          toast
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-4 opacity-0"
        }`}
      >
        {toast}
      </div>
    </ProgressContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx)
    throw new Error("useProgress harus dipakai di dalam ProgressProvider");
  return ctx;
}
