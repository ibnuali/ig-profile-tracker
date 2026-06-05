import { HelpCircle, Moon, Sun } from "lucide-react"

import { Button } from "@/components/ui/button"

export function TopBar({
  isDark,
  onHelpClick,
  onThemeToggle,
}: Readonly<{
  isDark: boolean
  onHelpClick: () => void
  onThemeToggle: () => void
}>) {
  return (
    <header className="flex items-center justify-between gap-3 rounded-2xl border border-border/60 bg-card/80 p-3 shadow-sm backdrop-blur-xl">
      <div className="flex items-center gap-3 px-2">
        <div className="flex size-10 items-center justify-center rounded-xl bg-linear-to-br from-fuchsia-500 to-violet-600 text-sm font-bold text-white shadow-lg shadow-fuchsia-500/25">
          IG
        </div>
        <div>
          <p className="font-semibold tracking-tight">Profile Tracker</p>
          <p className="hidden text-xs text-muted-foreground sm:block">
            Local ZIP analysis
          </p>
        </div>
      </div>
      <div className="flex gap-2">
        <Button
          className="size-9 sm:h-9 sm:w-auto sm:px-4"
          title={isDark ? "Switch to light mode" : "Switch to dark mode"}
          variant="outline"
          onClick={onThemeToggle}
        >
          {isDark ? <Sun /> : <Moon />}
          <span className="hidden sm:inline">
            {isDark ? "Light" : "Dark"}
          </span>
        </Button>
        <Button
          className="size-9 sm:h-9 sm:w-auto sm:px-4"
          title="How to get your ZIP"
          variant="outline"
          onClick={onHelpClick}
        >
          <HelpCircle />
          <span className="hidden sm:inline">Get ZIP</span>
        </Button>
      </div>
    </header>
  )
}
