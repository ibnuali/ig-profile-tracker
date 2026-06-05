import { ExternalLink, Search } from "lucide-react"

import { VIEW_CONTENT } from "@/constants/instagram"
import { formatDate } from "@/lib/instagram"
import type {
  DashboardData,
  DashboardView,
  InstagramAccount,
} from "@/types/instagram"

export function ResultsSection({
  activeAccounts,
  activeView,
  dashboardData,
  filteredAccounts,
  query,
  onQueryChange,
}: Readonly<{
  activeAccounts: InstagramAccount[]
  activeView: DashboardView
  dashboardData: DashboardData | null
  filteredAccounts: InstagramAccount[]
  query: string
  onQueryChange: (query: string) => void
}>) {
  const view = VIEW_CONTENT[activeView]

  return (
    <section className="flex min-h-[50vh] flex-1 flex-col overflow-hidden rounded-2xl border border-border/60 bg-card/80 backdrop-blur-xl lg:min-h-0">
      {/* Header with title + search */}
      <div className="flex shrink-0 flex-col gap-3 border-b border-border p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
        <div>
          <h2 className="text-lg font-bold tracking-tight">{view.title}</h2>
          <p className="text-sm text-muted-foreground">
            {view.description}
            {" · "}
            <span className="tabular-nums">
              {filteredAccounts.length.toLocaleString()}
            </span>{" "}
            results
          </p>
        </div>
        <SearchInput query={query} onQueryChange={onQueryChange} />
      </div>

      {/* Account list — only this scrolls */}
      <AccountList
        activeAccounts={activeAccounts}
        dashboardData={dashboardData}
        filteredAccounts={filteredAccounts}
      />
    </section>
  )
}

function SearchInput({
  query,
  onQueryChange,
}: Readonly<{
  query: string
  onQueryChange: (query: string) => void
}>) {
  return (
    <label className="flex h-9 w-full items-center gap-2 rounded-lg border border-border bg-background/60 px-3 text-sm transition-colors focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/20 sm:w-56">
      <Search className="size-3.5 text-muted-foreground" />
      <input
        className="min-w-0 flex-1 bg-transparent outline-none placeholder:text-muted-foreground/60"
        placeholder="Search username..."
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
      />
    </label>
  )
}

function AccountList({
  activeAccounts,
  dashboardData,
  filteredAccounts,
}: Readonly<{
  activeAccounts: InstagramAccount[]
  dashboardData: DashboardData | null
  filteredAccounts: InstagramAccount[]
}>) {
  if (!dashboardData) {
    return (
      <EmptyState
        title="Upload an Instagram ZIP to begin"
        description="Use the export ZIP from Instagram. The app will look for followers_1.json and following.json inside it."
      />
    )
  }

  if (activeAccounts.length === 0) {
    return (
      <EmptyState
        title="No accounts in this list"
        description="Choose another view from the sidebar or upload another export ZIP."
      />
    )
  }

  if (filteredAccounts.length === 0) {
    return (
      <EmptyState
        title="No usernames match your search"
        description="Try another search term or clear the search box."
      />
    )
  }

  return (
    <div className="min-h-0 flex-1 divide-y divide-border overflow-y-auto scrollbar-thin">
      {filteredAccounts.map((account) => (
        <AccountRow account={account} key={account.username} />
      ))}
    </div>
  )
}

function AccountRow({ account }: Readonly<{ account: InstagramAccount }>) {
  return (
    <article className="flex items-center justify-between gap-3 px-5 py-3 transition-colors hover:bg-muted/40">
      <div className="min-w-0">
        <h3 className="truncate text-sm font-medium">@{account.username}</h3>
        <p className="text-xs text-muted-foreground">
          {formatDate(account.timestamp)}
        </p>
      </div>
      <a
        className="inline-flex h-7 shrink-0 items-center gap-1.5 rounded-md border border-border bg-background px-2.5 text-xs font-medium transition-colors hover:bg-muted"
        href={account.href}
        target="_blank"
        rel="noreferrer"
      >
        Profile
        <ExternalLink className="size-3" />
      </a>
    </article>
  )
}

function EmptyState({
  title,
  description,
}: Readonly<{ title: string; description: string }>) {
  return (
    <div className="flex min-h-48 flex-col items-center justify-center px-6 py-10 text-center">
      <h3 className="font-medium">{title}</h3>
      <p className="mt-1.5 max-w-sm text-sm text-muted-foreground">
        {description}
      </p>
    </div>
  )
}
