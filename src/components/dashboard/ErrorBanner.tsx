import { XCircle } from "lucide-react"

export function ErrorBanner({ message }: { message: string }) {
  return (
    <section className="flex items-start gap-3 rounded-2xl border border-destructive/30 bg-destructive/5 p-4 text-destructive dark:border-destructive/40 dark:bg-destructive/10">
      <XCircle className="mt-0.5 size-5 shrink-0" />
      <div>
        <h2 className="font-medium">Upload failed</h2>
        <p className="text-sm opacity-80">{message}</p>
      </div>
    </section>
  )
}
