import type { ReactNode } from "react";
import { motion } from "motion/react";

interface Props {
  emoji: string;
  title: string;
  desc: string;
  children?: ReactNode;
  maxW?: string;
}

function PageHeader({
  emoji,
  title,
  desc,
  children,
  maxW = "max-w-6xl",
}: Props) {
  return (
    <motion.header
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className={`${maxW} mx-auto px-4 sm:px-6 pt-10 sm:pt-14 pb-6`}
    >
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
        <div>
          <div className="text-5xl" aria-hidden="true">
            {emoji}
          </div>
          <h1 className="mt-3 text-4xl sm:text-5xl font-black">{title}</h1>
          <p className="mt-3 text-slate-600 text-lg max-w-xl">{desc}</p>
        </div>
        {children}
      </div>
    </motion.header>
  );
}

export default PageHeader;
