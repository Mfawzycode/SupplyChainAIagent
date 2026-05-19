import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

export default function ChartsPanel({ forecast, regions }) {
  const regionRisk = regions.map((region) => ({
    name: region.country,
    risk: region.totalRisk,
    delay: region.delayedShipments,
  }))

  return (
    <section className="grid gap-4 xl:grid-cols-2">
      <article className="glass-panel rounded-2xl border border-slate-700/50 p-4">
        <h3 className="mb-4 text-base font-semibold text-slate-100">Inventory & Delay Forecast</h3>
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={forecast}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="month" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="inventoryRisk" stroke="#38bdf8" strokeWidth={2} />
            <Line type="monotone" dataKey="delayRisk" stroke="#f43f5e" strokeWidth={2} />
            <Line type="monotone" dataKey="demandPressure" stroke="#facc15" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </article>

      <article className="glass-panel rounded-2xl border border-slate-700/50 p-4">
        <h3 className="mb-4 text-base font-semibold text-slate-100">Region Risk vs Delays</h3>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={regionRisk}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="name" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip />
            <Legend />
            <Bar dataKey="risk" fill="#f43f5e" radius={[4, 4, 0, 0]} />
            <Bar dataKey="delay" fill="#38bdf8" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </article>
    </section>
  )
}
