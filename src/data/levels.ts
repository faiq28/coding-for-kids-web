const titles = ["Explorer", "Builder", "Hacker", "Master", "Legend"];
const XP_PER_LEVEL = 100;

export function getLevel(xp: number) {
  const level = Math.floor(xp / XP_PER_LEVEL) + 1;
  const title = titles[Math.min(level - 1, titles.length - 1)];
  const current = xp % XP_PER_LEVEL;
  return { level, title, current, pct: (current / XP_PER_LEVEL) * 100 };
}
