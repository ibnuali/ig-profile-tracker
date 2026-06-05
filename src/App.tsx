import { useMemo, useRef, useState, type ChangeEvent } from "react"

import { BackgroundGlow } from "@/components/dashboard/BackgroundGlow"
import { ErrorBanner } from "@/components/dashboard/ErrorBanner"
import { HeroPanel } from "@/components/dashboard/HeroPanel"
import { ResultsSection } from "@/components/dashboard/ResultsSection"
import { StatsPanel } from "@/components/dashboard/StatsPanel"
import { TopBar } from "@/components/dashboard/TopBar"
import { ZipHelpModal } from "@/components/dashboard/ZipHelpModal"
import { useTheme } from "@/components/theme-provider"
import { analyzeInstagramZip } from "@/lib/instagram"
import type {
  DashboardData,
  DashboardView,
  InstagramAccount,
  StatSummary,
} from "@/types/instagram"

export function App() {
  const { theme, setTheme } = useTheme()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null)
  const [activeView, setActiveView] = useState<DashboardView>("notFollowingBack")
  const [query, setQuery] = useState("")
  const [error, setError] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [isHelpOpen, setIsHelpOpen] = useState(false)

  const activeAccounts = dashboardData?.[activeView] ?? []
  const filteredAccounts = useFilteredAccounts(activeAccounts, query)
  const stats = getStats(dashboardData)

  function selectView(view: DashboardView) {
    setActiveView(view)
    setQuery("")
  }

  async function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]

    if (!file) {
      return
    }

    setError("")
    setIsAnalyzing(true)

    try {
      setDashboardData(await analyzeInstagramZip(file))
      setActiveView("notFollowingBack")
      setQuery("")
    } catch (nextError) {
      setDashboardData(null)
      setError(
        nextError instanceof Error
          ? nextError.message
          : "Could not analyze this Instagram export ZIP."
      )
    } finally {
      setIsAnalyzing(false)
      event.target.value = ""
    }
  }

  return (
    <main className="flex min-h-svh flex-col bg-background text-foreground lg:h-svh lg:overflow-hidden">
      <BackgroundGlow />

      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-4 px-4 py-4 sm:px-6 lg:overflow-hidden lg:px-8">
        {/* Top bar */}
        <div className="shrink-0">
          <TopBar
            isDark={theme === "dark"}
            onHelpClick={() => setIsHelpOpen(true)}
            onThemeToggle={() => setTheme(theme === "dark" ? "light" : "dark")}
          />
        </div>

        {/* Main content: stacked on mobile, two-column on large screens */}
        <div className="flex flex-1 flex-col gap-4 lg:grid lg:min-h-0 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-6">
          {/* Stats: horizontal row on mobile, vertical sidebar on desktop */}
          <aside className="shrink-0 lg:flex lg:flex-col lg:gap-4 lg:overflow-y-auto">
            <StatsPanel
              activeView={activeView}
              onSelectView={selectView}
              stats={stats}
            />
          </aside>

          {/* Right main area: hero + results */}
          <div className="flex min-h-0 flex-1 flex-col gap-4">
            <HeroPanel
              dashboardData={dashboardData}
              fileInputRef={fileInputRef}
              isAnalyzing={isAnalyzing}
              onFileChange={handleFileChange}
              onUploadClick={() => fileInputRef.current?.click()}
            />

            {error ? <ErrorBanner message={error} /> : null}

            <ResultsSection
              activeAccounts={activeAccounts}
              activeView={activeView}
              dashboardData={dashboardData}
              filteredAccounts={filteredAccounts}
              query={query}
              onQueryChange={setQuery}
            />
          </div>
        </div>
      </div>

      {isHelpOpen ? <ZipHelpModal onClose={() => setIsHelpOpen(false)} /> : null}
    </main>
  )
}

function useFilteredAccounts(accounts: InstagramAccount[], query: string) {
  return useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    if (!normalizedQuery) {
      return accounts
    }

    return accounts.filter((account) =>
      account.username.toLowerCase().includes(normalizedQuery)
    )
  }, [accounts, query])
}

function getStats(dashboardData: DashboardData | null): StatSummary[] {
  return [
    {
      view: "followers",
      value: dashboardData?.followers.length ?? 0,
    },
    {
      view: "following",
      value: dashboardData?.following.length ?? 0,
    },
    {
      view: "notFollowingBack",
      value: dashboardData?.notFollowingBack.length ?? 0,
      highlight: true,
    },
  ]
}

export default App
