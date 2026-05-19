export default function ExecutiveSummary({ totalRiskScore, highRiskRegions, expectedShortages }) {
  return (
    <section className="glass-panel rounded-2xl border border-slate-700/50 p-5">
      <h2 className="mb-4 text-lg font-semibold text-slate-100">Executive Summary</h2>
      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Total risk score</p>
          <p className="mt-2 text-2xl font-bold text-rose-300">{totalRiskScore}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">High-risk regions</p>
          <p className="mt-2 text-2xl font-bold text-amber-300">{highRiskRegions}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Expected shortages</p>
          <p className="mt-2 text-2xl font-bold text-cyan-200">{expectedShortages}</p>
        </div>
      </div>
    </section>
  )
}
