import { useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";
import { Link, NavLink } from "react-router-dom";
import {
  ArrowUpRight,
  BookOpen,
  Code2,
  Gamepad2,
  House,
  Menu,
  Swords,
  Trophy,
  UserRound,
  X,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { siteConfig } from "../data/site";
import { useProgress } from "../context/ProgressContext";
import { getLevel } from "../data/levels";

const links = [
  { to: "/", label: "Home", subtitle: "Kembali ke beranda", icon: House },
  {
    to: "/learn",
    label: "Learn",
    subtitle: "Mulai petualangan belajar",
    icon: BookOpen,
  },
  {
    to: "/playground",
    label: "Playground",
    subtitle: "Eksperimen dengan kode",
    icon: Code2,
  },
  {
    to: "/games",
    label: "Games",
    subtitle: "Belajar sambil bermain",
    icon: Gamepad2,
  },
  {
    to: "/challenge",
    label: "Challenge",
    subtitle: "Uji kemampuanmu",
    icon: Swords,
  },
  {
    to: "/achievement",
    label: "Achievement",
    subtitle: "Lihat pencapaianmu",
    icon: Trophy,
  },
  {
    to: "/profile",
    label: "Profile",
    subtitle: "Statistik dan progres",
    icon: UserRound,
  },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const reduceMotion = useReducedMotion();
  const { progress } = useProgress();
  const level = getLevel(progress.xp);

  // Effects are only for external systems, never for resetting route state.
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const close = () => setOpen(false);
  const duration = reduceMotion ? 0 : 0.42;

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-slate-200/70 bg-white/95 backdrop-blur-xl">
        <nav
          aria-label="Navigasi utama"
          className="mx-auto flex h-[68px] max-w-7xl items-center justify-between gap-3 px-4 sm:h-[76px] sm:px-6 xl:px-8"
        >
          <Link
            to="/"
            onClick={close}
            className="flex min-w-0 shrink-0 items-center gap-2.5 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-600"
            aria-label={`${siteConfig.name}, beranda`}
          >
            <img
              src="/quest-art/robot.svg"
              alt=""
              className="size-10 shrink-0 object-contain sm:size-11"
            />
            <span className="min-w-0">
              <span className="block text-xl font-bold tracking-tight text-slate-900">
                Code<span className="text-indigo-600">Quest</span>
              </span>
              <span className="hidden text-[11px] font-medium text-slate-500 sm:block">
                {siteConfig.tagline}
              </span>
            </span>
          </Link>

          <div className="hidden items-center gap-0.5 xl:flex">
            {links.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === "/"}
                className={({ isActive }) =>
                  `rounded-xl px-3 py-2.5 text-[13px] font-semibold transition-colors ${isActive ? "bg-indigo-50 text-indigo-700" : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"}`
                }
              >
                {label}
              </NavLink>
            ))}
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <Link
              to="/profile"
              onClick={close}
              className="inline-flex min-h-10 items-center gap-1.5 rounded-xl bg-amber-50 px-3 text-xs font-semibold text-amber-900"
              aria-label={`Level ${level.level}, ${progress.xp} XP`}
            >
              <Zap
                size={16}
                className="fill-amber-500 text-amber-500"
                aria-hidden="true"
              />
              <span>Lv {level.level}</span>
              <span className="hidden border-l border-amber-200 pl-2 sm:inline">
                {progress.xp} XP
              </span>
            </Link>
            <button
              type="button"
              aria-label={open ? "Tutup navigasi" : "Buka navigasi"}
              aria-expanded={open}
              aria-controls={menuId}
              onClick={() => setOpen((value) => !value)}
              className="grid size-11 place-items-center rounded-xl border border-slate-200 bg-white text-slate-800 transition-colors hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-indigo-600 xl:hidden"
            >
              <Menu size={22} aria-hidden="true" />
            </button>
          </div>
        </nav>
      </header>

      {createPortal(
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              id={menuId}
              key="full-screen-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Menu navigasi CodeQuest"
              initial={reduceMotion ? { opacity: 0 } : { x: "100%" }}
              animate={reduceMotion ? { opacity: 1 } : { x: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { x: "100%" }}
              transition={{ duration, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-0 z-[100] flex h-[100dvh] w-screen flex-col overflow-hidden bg-[#f9f8f4] xl:hidden"
            >
              <div className="mx-auto flex h-[76px] w-full max-w-3xl shrink-0 items-center justify-between border-b border-slate-200/80 px-5 sm:px-8">
                <div className="flex items-center gap-2.5">
                  <img
                    src="/quest-art/robot.svg"
                    alt=""
                    className="size-10 object-contain"
                  />
                  <span className="text-xl font-bold tracking-tight text-slate-900">
                    Code<span className="text-indigo-600">Quest</span>
                  </span>
                </div>
                <button
                  type="button"
                  autoFocus
                  onClick={close}
                  aria-label="Tutup menu"
                  className="grid size-11 place-items-center rounded-xl border border-slate-200 bg-white text-slate-800 focus-visible:outline-2 focus-visible:outline-indigo-600"
                >
                  <X size={23} aria-hidden="true" />
                </button>
              </div>

              <div className="mx-auto flex w-full max-w-3xl min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain px-5 pb-7 pt-7 sm:px-8 sm:pt-10">
                <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-indigo-600">
                  Explore / Menu
                </p>
                <div className="flex flex-col gap-1.5">
                  {links.map(({ to, label, subtitle, icon: Icon }, index) => (
                    <motion.div
                      key={to}
                      initial={reduceMotion ? false : { opacity: 0, x: 22 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: reduceMotion ? 0 : 0.3,
                        delay: reduceMotion ? 0 : 0.07 + index * 0.045,
                      }}
                    >
                      <NavLink
                        to={to}
                        end={to === "/"}
                        onClick={close}
                        className={({ isActive }) =>
                          `group flex min-h-[66px] items-center gap-4 rounded-2xl border px-4 py-3 transition-colors sm:min-h-[74px] sm:px-5 ${isActive ? "border-indigo-200 bg-indigo-50 text-indigo-700" : "border-transparent text-slate-800 hover:border-slate-200 hover:bg-white"}`
                        }
                      >
                        <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white shadow-sm sm:size-11">
                          <Icon
                            size={20}
                            strokeWidth={1.8}
                            aria-hidden="true"
                          />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-[17px] font-semibold leading-snug sm:text-xl">
                            {label}
                          </span>
                          <span className="block text-xs font-normal leading-relaxed text-slate-500 sm:text-sm">
                            {subtitle}
                          </span>
                        </span>
                        <ArrowUpRight
                          size={18}
                          className="shrink-0 opacity-50 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          aria-hidden="true"
                        />
                      </NavLink>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-auto pt-7">
                  <div className="flex items-center justify-between rounded-2xl border border-indigo-100 bg-indigo-50 p-4 text-sm text-indigo-900">
                    <span className="font-medium">
                      Petualanganmu berlanjut!
                    </span>
                    <span className="font-semibold">{progress.xp} XP</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </>
  );
}
