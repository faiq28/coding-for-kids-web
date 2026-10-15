import type { ReactNode } from "react"
import { Link } from "react-router-dom"

interface ButtonProps {
  children: ReactNode
  variant?: "primary" | "secondary" | "outline"
  to?: string
  onClick?: () => void
  disabled?: boolean
  type?: "button" | "submit"
  className?: string
}

function Button({
  children,
  variant = "primary",
  to,
  onClick,
  disabled,
  type = "button",
  className = "",
}: ButtonProps) {

  const style =
    variant === "primary"
      ? "bg-indigo-600 text-white hover:bg-indigo-700 shadow-[0_4px_0_#3f3fc4]"
      : variant === "secondary"
        ? "bg-green-500 text-white hover:bg-green-600 shadow-[0_4px_0_#15803d]"
        : "bg-white text-[#182033] border-2 border-slate-200 hover:border-indigo-300 shadow-[0_4px_0_#e2e8f0]"

  const classes = `
    inline-flex items-center justify-center gap-2
    px-6 py-3
    rounded-full
    font-semibold
    transition
    duration-300
    active:translate-y-1 active:shadow-none
    disabled:opacity-50 disabled:pointer-events-none
    focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-indigo-500
    ${style}
    ${className}
  `

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    )
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  )
}

export default Button
