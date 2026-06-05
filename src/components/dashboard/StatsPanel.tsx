import { VIEW_CONTENT } from "@/constants/instagram"
import type { DashboardView, StatSummary } from "@/types/instagram"

export function StatsPanel({
  activeView,
  onSelectView,
  stats,
}: Readonly<{
  activeView: DashboardView
  onSelectView: (view: DashboardView) => void
  stats: StatSummary[]
}>) {
  return (
    <nav className="flex gap-2 overflow-x-auto lg:flex-col lg:gap-3" aria-label="Dashboard views">
      {stats.map((stat) => (
        <StatCard
          active={activeView === stat.view}
          highlight={stat.highlight}
          key={stat.view}
          label={VIEW_CONTENT[stat.view].title}
          value={stat.value}
          onClick={() => onSelectView(stat.view)}
        />
      ))}
    </nav>
  )
}

function StatCard({
  label,
  value,
  active,
  highlight = false,
  onClick,
}: Readonly<{
  label: string
  value: number
  active: boolean
  highlight?: boolean
  onClick: () => void
}>) {
  return (
    <button
      className={[
        "group relative shrink-0 overflow-hidden rounded-xl border px-4 py-3 text-left transition-all duration-200",
        "min-w-32 lg:min-w-0",
        active
          ? "border-primary/30 bg-primary/10 shadow-md shadow-primary/10 ring-1 ring-primary/20 dark:border-primary/40 dark:bg-primary/15"
          : "border-border/60 bg-card/80 backdrop-blur-xl hover:border-primary/20 hover:bg-card dark:hover:border-primary/30",
      ].join(" ")}
      type="button"
      onClick={onClick}
    >
      {/* Left accent line */}
      <div
        className={[
          "absolute inset-y-3 left-0 w-0.5 rounded-full transition-opacity",
          active ? "opacity-100" : "opacity-0 group-hover:opacity-60",
          highlight
            ? "bg-linear-to-b from-rose-400 to-orange-400"
            : "bg-linear-to-b from-violet-400 to-indigo-400",
        ].join(" ")}
      />
      <div className="flex items-center justify-between gap-3">
        <p
          className={
            active
              ? "text-sm font-medium text-primary"
              : "text-sm text-muted-foreground"
          }
        >
          {label}
        </p>
        <p className="text-xl font-bold tabular-nums tracking-tight">
          {value.toLocaleString()}
        </p>
      </div>
    </button>
  )
}
