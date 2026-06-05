export function BackgroundGlow() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Top-left warm glow */}
      <div className="absolute -left-32 -top-32 size-120 rounded-full bg-linear-to-br from-fuchsia-400/25 to-violet-500/20 blur-[100px] dark:from-fuchsia-500/15 dark:to-violet-600/10" />
      {/* Top-right cool glow */}
      <div className="absolute -right-20 top-20 size-104 rounded-full bg-linear-to-bl from-indigo-400/20 to-cyan-400/15 blur-[100px] dark:from-indigo-500/10 dark:to-cyan-500/8" />
      {/* Bottom center warm accent */}
      <div className="absolute -bottom-20 left-1/3 size-96 rounded-full bg-linear-to-t from-rose-400/20 to-orange-300/15 blur-[100px] dark:from-rose-500/10 dark:to-orange-500/8" />
      {/* Subtle grid overlay for texture */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgb(0_0_0/0.03)_1px,transparent_0)] bg-size-[32px_32px] dark:bg-[radial-gradient(circle_at_1px_1px,rgb(255_255_255/0.03)_1px,transparent_0)]" />
    </div>
  )
}
