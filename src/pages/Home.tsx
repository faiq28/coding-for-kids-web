import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  ArrowUpRight,
  Compass,
  Sparkles,
  Zap,
  Play,
  CheckCircle2,
} from "lucide-react";
import { worlds } from "../data/worlds";
import { useProgress } from "../context/ProgressContext";
import { getLevel } from "../data/levels";
import qbot from "../assets/qbot.png";
import "../styles/adventure.css";

const art = ["village", "forest", "castle", "city"];
const color = ["#d6f4c2", "#b9ede0", "#d8d4ff", "#ffe0b3"];
const labels = [
  "01 / THE BEGINNING",
  "02 / THINK SMART",
  "03 / BUILD THE WEB",
  "04 / THE FUTURE",
];

export default function Home() {
  const { progress } = useProgress();
  const level = getLevel(progress.xp);
  const reduced = useReducedMotion();
  const completed = worlds
    .flatMap((w) => w.lessons)
    .filter((l) => progress.lessons.includes(l.id)).length;
  return (
    <main className="cq-home">
      <section className="cq-hero">
        <div className="cq-hero-grain" aria-hidden="true" />
        <div className="cq-container cq-hero-grid">
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="cq-hero-copy"
          >
            <div className="cq-eyebrow">
              <span className="cq-pulse" /> THE ADVENTURE STARTS HERE{" "}
              <Sparkles size={15} />
            </div>
            <h1>
              Code your
              <br />
              <span>
                own adventure<span className="cq-dot">.</span>
              </span>
            </h1>
            <p>
              Belajar coding nggak harus membosankan. Jelajahi dunia baru,
              pecahkan tantangan, dan bangun sesuatu yang keren bersama Q-Bot.
            </p>
            <div className="cq-actions">
              <Link className="cq-primary" to="/learn">
                Mulai petualangan <ArrowUpRight size={20} />
              </Link>
              <a className="cq-secondary" href="#explore">
                <Play size={17} fill="currentColor" /> Lihat dunianya
              </a>
            </div>
            <div className="cq-hero-metrics">
              <div>
                <strong>{String(completed).padStart(2, "0")}</strong>
                <span>QUEST COMPLETE</span>
              </div>
              <div>
                <strong>{progress.xp}</strong>
                <span>TOTAL XP</span>
              </div>
              <div>
                <strong>LV.{level.level}</strong>
                <span>{level.title.toUpperCase()}</span>
              </div>
            </div>
          </motion.div>
          <motion.div
            className="cq-hero-art"
            initial={reduced ? false : { opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.12 }}
          >
            <div className="cq-orbit cq-orbit-one" />
            <div className="cq-orbit cq-orbit-two" />
            <div className="cq-planet" />
            <div className="cq-ring" />
            <div className="cq-mascot-wrap">
              <img
                src={qbot}
                alt="Q-Bot, teman petualangan coding"
                className="cq-mascot"
              />
            </div>
            <div className="cq-floating cq-floating-top">
              <span className="cq-float-icon">✦</span>
              <span>
                NEW WORLD
                <br />
                <b>UNLOCKED</b>
              </span>
            </div>
            <div className="cq-floating cq-floating-bottom">
              <Zap size={21} fill="#f5b83b" color="#f5b83b" />
              <span>
                LEVEL UP
                <br />
                <b>KEEP GOING!</b>
              </span>
            </div>
            <div className="cq-coordinate">CQ / 001 — EXPLORE MORE</div>
          </motion.div>
        </div>
        <div className="cq-hero-bottom cq-container">
          <span>DESIGNED FOR CURIOUS MINDS</span>
          <a href="#explore">SCROLL TO EXPLORE ↓</a>
        </div>
      </section>
      <section className="cq-world-section" id="explore">
        <div className="cq-container">
          <motion.div
            className="cq-section-head"
            initial={reduced ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <div>
              <span className="cq-overline">✳ PICK YOUR NEXT DESTINATION</span>
              <h2>
                Four worlds.
                <br />
                <em>Infinite possibilities.</em>
              </h2>
            </div>
            <p>
              Setiap dunia punya cerita dan tantangan sendiri. Mulai dari nol,
              lalu lihat sejauh mana kamu bisa melangkah.
            </p>
          </motion.div>
          <div className="cq-world-grid">
            {worlds.map((world, i) => (
              <motion.div
                key={world.id}
                initial={reduced ? false : { opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ delay: i * 0.08 }}
              >
                <Link
                  to="/learn"
                  className="cq-world-card"
                  style={{ background: color[i] }}
                >
                  <span className="cq-world-top">
                    {labels[i]} <ArrowUpRight size={19} />
                  </span>
                  <div className="cq-world-art">
                    <svg aria-hidden="true" viewBox="0 0 200 180">
                      <use href={`/world-art.svg#${art[i]}`} />
                    </svg>
                  </div>
                  <div className="cq-world-info">
                    <span>WORLD {String(i + 1).padStart(2, "0")}</span>
                    <h3>{world.title}</h3>
                    <p>{world.desc}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <section className="cq-banner">
        <div className="cq-container cq-banner-inner">
          <div>
            <span className="cq-overline">YOUR JOURNEY, YOUR RULES</span>
            <h2>
              Ready to write
              <br />
              your next chapter?
            </h2>
            <p>Satu quest kecil hari ini, skill besar besok.</p>
            <Link to="/learn" className="cq-primary cq-primary-light">
              Explore the map <ArrowRight size={19} />
            </Link>
          </div>
          <div className="cq-banner-mark" aria-hidden="true">
            <Compass size={210} strokeWidth={0.8} />
            <span>
              LET'S
              <br />
              GO!
            </span>
          </div>
        </div>
      </section>
      <section className="cq-container cq-features">
        <div>
          <CheckCircle2 /> Belajar sesuai ritmemu
        </div>
        <div>
          <Zap /> Kumpulkan XP sungguhan
        </div>
        <div>
          <Sparkles /> Temukan dunia baru
        </div>
      </section>
    </main>
  );
}
