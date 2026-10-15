import { useEffect, useState } from "react";
import {
  Check,
  Lock,
  X,
  ArrowRight,
  Map,
  Flag,
  Sparkles,
  Zap,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import Button from "../components/ui/Button";
import qbot from "../assets/qbot.png";
import { useProgress } from "../context/ProgressContext";
import { worlds, type Lesson } from "../data/worlds";
import "../styles/adventure.css";

const art = ["village", "forest", "castle", "city"];
const palettes = ["#d6f4c2", "#b9ede0", "#d8d4ff", "#ffe0b3"];
export default function Learn() {
  const { progress, completeLesson } = useProgress();
  const [active, setActive] = useState<Lesson | null>(null);
  const reduced = useReducedMotion();
  const total = worlds.reduce((n, w) => n + w.lessons.length, 0);
  const doneTotal = worlds.reduce(
    (n, w) =>
      n + w.lessons.filter((l) => progress.lessons.includes(l.id)).length,
    0,
  );
  return (
    <main className="cq-map-page">
      <section className="cq-map-hero">
        <div className="cq-container cq-map-hero-inner">
          <div>
            <span className="cq-overline">THE CODEQUEST ATLAS · VOL. 01</span>
            <h1>
              Your adventure
              <br />
              <em>starts here.</em>
            </h1>
            <p>
              Empat dunia, banyak tantangan, satu tujuan: jadi coding explorer
              yang nggak takut mencoba.
            </p>
            <div className="cq-map-meta">
              <span>
                <Map size={17} /> 4 WORLDS
              </span>
              <span>
                <Flag size={17} /> {doneTotal}/{total} QUESTS
              </span>
              <span>
                <Zap size={17} /> {progress.xp} XP
              </span>
            </div>
          </div>
          <div className="cq-map-stamp" aria-hidden="true">
            EXPLORE
            <br />
            <strong>
              THE
              <br />
              UNKNOWN
            </strong>
            <Sparkles size={26} />
          </div>
        </div>
      </section>
      <section
        className="cq-container cq-map-layout"
        aria-label="Peta petualangan belajar"
      >
        <div className="cq-map-intro">
          <span className="cq-overline">YOUR JOURNEY</span>
          <h2>Choose a destination</h2>
          <p>
            Kerjakan semua quest dalam satu dunia untuk membuka dunia
            berikutnya.
          </p>
          <div className="cq-progress-track">
            <div
              style={{ width: `${total ? (doneTotal / total) * 100 : 0}%` }}
            />
          </div>
          <small>
            {Math.round(total ? (doneTotal / total) * 100 : 0)}% perjalanan
            selesai
          </small>
        </div>
        <div className="cq-map-worlds">
          {worlds.map((world, i) => {
            const done = world.lessons.filter((l) =>
              progress.lessons.includes(l.id),
            ).length;
            const prev = worlds[i - 1];
            const locked = Boolean(
              prev &&
              !prev.lessons.every((l) => progress.lessons.includes(l.id)),
            );
            const complete = done === world.lessons.length;
            return (
              <motion.section
                key={world.id}
                className={`cq-map-world ${locked ? "cq-map-locked" : ""}`}
                initial={reduced ? false : { opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.12 }}
                transition={{ duration: 0.4 }}
                aria-label={world.title}
              >
                <div className="cq-map-world-header">
                  <div
                    className="cq-map-illustration"
                    style={{ background: palettes[i] }}
                  >
                    <svg aria-hidden="true" viewBox="0 0 200 180">
                      <use href={`/world-art.svg#${art[i]}`} />
                    </svg>
                    <span className="cq-world-number">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="cq-map-world-copy">
                    <span className="cq-overline">
                      CHAPTER {String(i + 1).padStart(2, "0")} / 04
                    </span>
                    <h3>{world.title}</h3>
                    <p>{world.desc}</p>
                    <span
                      className={`cq-map-status ${complete ? "is-complete" : ""}`}
                    >
                      {complete ? (
                        <>
                          <Check size={14} /> COMPLETED
                        </>
                      ) : locked ? (
                        <>
                          <Lock size={14} /> LOCKED
                        </>
                      ) : (
                        <>
                          <Sparkles size={14} /> {done}/{world.lessons.length}{" "}
                          QUESTS
                        </>
                      )}
                    </span>
                  </div>
                </div>
                <div className="cq-quest-list">
                  {world.lessons.map((lesson, j) => {
                    const finished = progress.lessons.includes(lesson.id);
                    return (
                      <button
                        key={lesson.id}
                        type="button"
                        disabled={locked}
                        onClick={() => setActive(lesson)}
                        className={`cq-quest ${finished ? "cq-quest-done" : ""}`}
                      >
                        <span className="cq-quest-step">
                          {finished ? (
                            <Check size={20} />
                          ) : locked ? (
                            <Lock size={17} />
                          ) : (
                            String(j + 1).padStart(2, "0")
                          )}
                        </span>
                        <span className="cq-quest-copy">
                          <strong>{lesson.title}</strong>
                          <small>
                            {finished
                              ? "Quest completed"
                              : `Earn ${lesson.xp} XP`}
                          </small>
                        </span>
                        <span className="cq-quest-arrow">
                          <ArrowRight size={19} />
                        </span>
                      </button>
                    );
                  })}
                </div>
              </motion.section>
            );
          })}
        </div>
        <div className="cq-map-end">
          <img src={qbot} alt="" />
          <div>
            <span className="cq-overline">A MESSAGE FROM Q-BOT</span>
            <h3>Small steps. Big adventures.</h3>
            <p>
              Nggak perlu terburu-buru. Setiap quest yang kamu selesaikan bikin
              kamu makin jago.
            </p>
          </div>
        </div>
      </section>
      {active && (
        <LessonModal
          lesson={active}
          alreadyDone={progress.lessons.includes(active.id)}
          onClose={() => setActive(null)}
          onFinish={() => {
            completeLesson(active.id, active.xp);
            setActive(null);
          }}
        />
      )}
    </main>
  );
}

function LessonModal({
  lesson,
  alreadyDone,
  onClose,
  onFinish,
}: {
  lesson: Lesson;
  alreadyDone: boolean;
  onClose: () => void;
  onFinish: () => void;
}) {
  const [step, setStep] = useState<"story" | "quiz">("story");
  const [picked, setPicked] = useState<number | null>(null);
  const q = lesson.question;
  const correct = picked === q.answer;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center bg-[#182033]/60 p-0 sm:p-6"
      onClick={onClose}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={lesson.title}
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full sm:max-w-xl max-h-[92vh] overflow-y-auto rounded-t-[2rem] sm:rounded-[2rem] bg-white p-6 sm:p-8"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Tutup"
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100"
        >
          <X />
        </button>

        <div className="flex items-center gap-3 pr-10">
          <span className="text-4xl" aria-hidden="true">
            {lesson.emoji}
          </span>
          <h2 className="text-2xl sm:text-3xl font-semibold">{lesson.title}</h2>
        </div>

        {step === "story" ? (
          <>
            <div className="mt-6 flex gap-4 items-start">
              <img src={qbot} alt="" className="w-16 sm:w-20 shrink-0" />
              <p className="bg-indigo-50 rounded-2xl rounded-tl-sm p-4 text-slate-700 leading-relaxed">
                {lesson.story}
              </p>
            </div>

            {lesson.code && (
              <pre className="mt-5 overflow-x-auto rounded-2xl bg-[#182033] p-5 font-mono text-sm text-green-200">
                {lesson.code}
              </pre>
            )}

            <div className="mt-8 flex justify-end">
              <Button onClick={() => setStep("quiz")}>Lanjut ke kuis</Button>
            </div>
          </>
        ) : (
          <>
            <p className="mt-6 text-lg font-bold">{q.q}</p>

            <div className="mt-4 grid gap-3">
              {q.options.map((opt, i) => {
                const state =
                  picked === null
                    ? "border-slate-200 hover:border-indigo-300"
                    : i === q.answer
                      ? "border-green-400 bg-green-50"
                      : i === picked
                        ? "border-rose-300 bg-rose-50"
                        : "border-slate-100 opacity-60";
                return (
                  <button
                    key={opt}
                    type="button"
                    disabled={picked !== null && correct}
                    onClick={() => setPicked(i)}
                    className={`text-left rounded-2xl border-2 px-5 py-3 font-semibold transition ${state}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>

            {picked !== null && (
              <div
                role="status"
                className={`mt-5 rounded-2xl p-4 ${correct ? "bg-green-50 text-green-800" : "bg-rose-50 text-rose-800"}`}
              >
                {correct
                  ? q.explain
                  : "Belum tepat. Baca ceritanya lagi atau coba pilih jawaban lain!"}
              </div>
            )}

            <div className="mt-8 flex flex-wrap justify-between gap-3">
              <Button
                variant="outline"
                onClick={() => {
                  setStep("story");
                  setPicked(null);
                }}
              >
                Baca lagi
              </Button>
              {correct && (
                <Button variant="secondary" onClick={onFinish}>
                  {alreadyDone ? "Selesai" : `Selesaikan (+${lesson.xp} XP)`}
                </Button>
              )}
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}
