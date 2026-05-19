export default function RegionDrilldown({ region }) {
  if (!region) {
    return (
      <section className="glass-panel rounded-2xl border border-slate-700/50 p-4 text-sm text-slate-300">
        Select a map marker to open region drill-down.
      </section>
    )
  }

  return (
    <section className="glass-panel rounded-2xl border border-slate-700/50 p-4">
      <h3 className="mb-3 text-base font-semibold text-slate-100">Region Drill-down: {region.region}</h3>
      <div className="grid gap-3 sm:grid-cols-2">
        <p className="text-sm text-slate-300">Delayed shipments: <span className="font-semibold text-rose-300">{region.delayedShipments}</span></p>
        <p className="text-sm text-slate-300">Inventory health: <span className="font-semibold text-cyan-300">{region.inventoryHealth}%</span></p>
        <p className="text-sm text-slate-300">Supplier risk: <span className="font-semibold text-amber-300">{region.supplierRisk}</span></p>
        <p className="text-sm text-slate-300">Forecast alert: <span className="font-semibold text-slate-100">{region.forecastAlert}</span></p>
      </div>
      <ul className="mt-3 list-disc space-y-1 pl-5 text-xs text-slate-400">
        {region.riskDrivers.map((driver) => (
          <li key={driver}>{driver}</li>
        ))}
      </ul>
    </section>
  )
}
