import type { ChangeEvent, RefObject } from "react"
import { Upload } from "lucide-react"

import { Button } from "@/components/ui/button"
import type { DashboardData } from "@/types/instagram"

export function HeroPanel({
  dashboardData,
  fileInputRef,
  isAnalyzing,
  onFileChange,
  onUploadClick,
}: Readonly<{
  dashboardData: DashboardData | null
  fileInputRef: RefObject<HTMLInputElement | null>
  isAnalyzing: boolean
  onFileChange: (event: ChangeEvent<HTMLInputElement>) => void
  onUploadClick: () => void
}>) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-card/80 backdrop-blur-xl">
      {/* Gradient accent */}
      <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-fuchsia-500 via-violet-500 to-indigo-500" />

      <div className="flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
        {/* Left: copy */}
        <div className="max-w-lg space-y-2">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-0.5 text-[0.7rem] font-medium text-primary">
            <span className="size-1.5 rounded-full bg-primary animate-pulse" />
            Instagram relationship dashboard
          </div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Know who follows back.
          </h1>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Upload your Instagram export ZIP and review followers, following,
            and one-sided follows.
          </p>
        </div>

        {/* Right: upload action */}
        <div className="flex shrink-0 flex-col items-start gap-2 sm:items-end">
          <input
            ref={fileInputRef}
            className="hidden"
            type="file"
            accept=".zip,application/zip,application/x-zip-compressed"
            onChange={onFileChange}
          />
          <Button
            className="h-10 rounded-xl bg-linear-to-r from-fuchsia-500 to-violet-600 px-5 text-white shadow-lg shadow-fuchsia-500/25 transition-all hover:shadow-xl hover:shadow-fuchsia-500/30 hover:brightness-110 dark:shadow-fuchsia-500/15"
            disabled={isAnalyzing}
            onClick={onUploadClick}
          >
            <Upload />
            {isAnalyzing ? "Analyzing..." : "Upload ZIP"}
          </Button>
          <p className="max-w-48 truncate text-xs text-muted-foreground">
            {dashboardData
              ? `Loaded ${dashboardData.fileName}`
              : "JSON format ZIP recommended"}
          </p>
        </div>
      </div>
    </div>
  )
}
