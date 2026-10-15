import type { ReactNode } from "react"

interface CardProps {
  children: ReactNode
  className?: string
}

function Card({children, className = ""}: CardProps){

  return (
    <div
      className={`
      bg-white
      rounded-3xl
      shadow-md
      p-6
      hover:shadow-xl
      transition
      duration-300
      ${className}
      `}
    >
      {children}
    </div>
  )
}

export default Card
