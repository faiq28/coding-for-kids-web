import type { Progress } from "../context/ProgressContext";
import { getLevel } from "./levels";
import { worlds, allLessons } from "./worlds";
import { challenges } from "./challenges";

export interface BadgeDef {
  id: string;
  icon: string;
  title: string;
  desc: string;
  check: (p: Progress) => boolean;
  progress: (p: Progress) => string;
}

const worldDone = (p: Progress, id: string) =>
  worlds
    .find((w) => w.id === id)!
    .lessons.every((l) => p.lessons.includes(l.id));

export const badges: BadgeDef[] = [
  {
    id: "first",
    icon: "🌟",
    title: "Langkah Pertama",
    desc: "Selesaikan 1 pelajaran",
    check: (p) => p.lessons.length >= 1,
    progress: (p) => `${Math.min(p.lessons.length, 1)}/1`,
  },
  {
    id: "village",
    icon: "🌱",
    title: "Warga Starter Village",
    desc: "Tamatkan Starter Village",
    check: (p) => worldDone(p, "starter"),
    progress: (p) =>
      `${worlds[0].lessons.filter((l) => p.lessons.includes(l.id)).length}/${worlds[0].lessons.length}`,
  },
  {
    id: "scholar",
    icon: "📚",
    title: "Kutu Buku",
    desc: "Selesaikan semua pelajaran",
    check: (p) => p.lessons.length >= allLessons.length,
    progress: (p) => `${p.lessons.length}/${allLessons.length}`,
  },
  {
    id: "coder",
    icon: "💻",
    title: "Penjelajah Kode",
    desc: "Jalankan kode di Playground 3 kali",
    check: (p) => p.runs >= 3,
    progress: (p) => `${Math.min(p.runs, 3)}/3`,
  },
  {
    id: "memory",
    icon: "🧠",
    title: "Si Ingatan Tajam",
    desc: "Menangkan Memory Match",
    check: (p) => p.memoryBest !== null,
    progress: (p) => (p.memoryBest !== null ? "1/1" : "0/1"),
  },
  {
    id: "maze",
    icon: "🧭",
    title: "Master Labirin",
    desc: "Selesaikan 3 level Robot Maze",
    check: (p) => p.mazeDone.length >= 3,
    progress: (p) => `${Math.min(p.mazeDone.length, 3)}/3`,
  },
  {
    id: "quiz",
    icon: "⚡",
    title: "Kilat Kode",
    desc: "Dapat nilai 5/5 di Kuis Cepat",
    check: (p) => p.quizBest >= 5,
    progress: (p) => `${Math.min(p.quizBest, 5)}/5`,
  },
  {
    id: "challenger",
    icon: "🎯",
    title: "Penantang Handal",
    desc: "Selesaikan 3 tantangan",
    check: (p) => p.challenges.filter((c) => c.startsWith("c")).length >= 3,
    progress: (p) =>
      `${Math.min(p.challenges.filter((c) => c.startsWith("c")).length, 3)}/3`,
  },
  {
    id: "allchal",
    icon: "🏅",
    title: "Juara Tantangan",
    desc: "Selesaikan semua tantangan",
    check: (p) => challenges.every((c) => p.challenges.includes(c.id)),
    progress: (p) =>
      `${challenges.filter((c) => p.challenges.includes(c.id)).length}/${challenges.length}`,
  },
  {
    id: "level3",
    icon: "🏆",
    title: "Level 3 Hacker",
    desc: "Capai Level 3",
    check: (p) => getLevel(p.xp).level >= 3,
    progress: (p) => `Lv ${Math.min(getLevel(p.xp).level, 3)}/3`,
  },
];
