export default function TimelineSimulation({ scenario, scenarios, onChange }) {
  return (
    <section className="glass-panel rounded-2xl border border-slate-700/50 p-4">
      <h3 className="mb-3 text-base font-semibold text-slate-100">War Disruption Timeline Simulation</h3>
      <input
        type="range"
        min={0}
        max={scenarios.length - 1}
        value={scenarios.findIndex((item) => item.day === scenario.day)}
        onChange={(event) => onChange(scenarios[Number(event.target.value)])}
        className="w-full accent-rose-500"
      />
      <div className="mt-3 rounded-xl border border-slate-700/50 bg-slate-900/60 p-3 text-sm">
        <p className="font-semibold text-slate-100">Day {scenario.day}: {scenario.label}</p>
        <p className="mt-1 text-slate-300">{scenario.note}</p>
        <p className="mt-2 text-xs text-slate-400">
          Delay multiplier: <span className="text-rose-300">x{scenario.delayMultiplier}</span> • Risk impact: <span className="text-amber-300">+{scenario.riskImpact}</span>
        </p>
      </div>
    </section>
  )
}
