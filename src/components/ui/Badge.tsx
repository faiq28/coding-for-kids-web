interface BadgeProps {
  text: string
  tone?: "yellow" | "green" | "indigo" | "red" | "gray"
}

const tones = {
  yellow: "bg-yellow-100 text-yellow-700",
  green: "bg-green-100 text-green-700",
  indigo: "bg-indigo-100 text-indigo-700",
  red: "bg-rose-100 text-rose-700",
  gray: "bg-slate-100 text-slate-500",
}

function Badge({ text, tone = "yellow" }: BadgeProps) {

  return (
    <span
      className={`
px-4
py-1
rounded-full
font-semibold
text-sm
${tones[tone]}
`}
    >
      {text}
    </span>
  )

}

export default Badge
