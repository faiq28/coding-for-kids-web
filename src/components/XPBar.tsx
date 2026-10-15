import { useProgress } from "../context/ProgressContext";
import { getLevel } from "../data/levels";

function XPBar({ className = "" }: { className?: string }) {
  const { progress } = useProgress();
  const lv = getLevel(progress.xp);

  return (
    <div className={`bg-white rounded-3xl p-5 shadow-sm ${className}`}>
      <div className="flex justify-between font-bold text-sm">
        <span>
          ⭐ Level {lv.level} {lv.title}
        </span>

        <span>{progress.xp} XP</span>
      </div>

      <div
        className="mt-3 h-3 bg-slate-100 rounded-full overflow-hidden"
        role="progressbar"
        aria-valuenow={lv.current}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Progres level"
      >
        <div
          className="h-full bg-[#5B5BF7] rounded-full transition-all duration-700"
          style={{ width: `${Math.max(lv.pct, 3)}%` }}
        />
      </div>
    </div>
  );
}

export default XPBar;
