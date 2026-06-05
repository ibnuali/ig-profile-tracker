import { X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ZIP_INSTRUCTIONS } from "@/constants/instagram"

export function ZipHelpModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="zip-help-title"
    >
      <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-2xl shadow-black/20">
        {/* Gradient top accent */}
        <div className="absolute inset-x-0 top-0 h-0.5 bg-linear-to-r from-fuchsia-500 via-violet-500 to-indigo-500" />

        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 id="zip-help-title" className="text-xl font-bold">
              How to get your Instagram ZIP
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Request your Instagram data export, then upload the ZIP file here.
            </p>
          </div>
          <Button
            aria-label="Close instructions"
            size="icon-sm"
            variant="ghost"
            onClick={onClose}
          >
            <X />
          </Button>
        </div>

        <ol className="mt-6 space-y-4 text-sm">
          {ZIP_INSTRUCTIONS.map((instruction, index) => (
            <li className="flex gap-3" key={instruction}>
              <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-fuchsia-500 to-violet-600 text-xs font-bold text-white">
                {index + 1}
              </span>
              <p className="leading-relaxed">{instruction}</p>
            </li>
          ))}
        </ol>

        <div className="mt-6 rounded-xl bg-muted p-4 text-sm text-muted-foreground">
          This app only needs the ZIP structure containing
          <span className="font-mono text-foreground">
            {" "}connections/followers_and_following
          </span>
          . The analysis runs locally in your browser.
        </div>
      </div>
    </div>
  )
}
