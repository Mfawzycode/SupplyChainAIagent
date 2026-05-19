import { AlertTriangle, Boxes, Truck, TrendingUp } from 'lucide-react'

const cardClass =
  'glass-panel rounded-2xl p-4 border border-slate-700/40 shadow-[0_20px_40px_rgba(0,0,0,.35)]'

const iconMap = {
  risk: AlertTriangle,
  delay: Truck,
  stock: Boxes,
  trend: TrendingUp,
}

export default function KpiCards({ metrics }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {metrics.map((metric) => {
        const Icon = iconMap[metric.icon]
        return (
          <article key={metric.label} className={cardClass}>
            <div className="mb-3 flex items-center justify-between">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{metric.label}</p>
              <Icon className="h-4 w-4 text-cyan-300" />
            </div>
            <p className="text-2xl font-semibold text-slate-50">{metric.value}</p>
            <p className="mt-1 text-xs text-slate-400">{metric.subtext}</p>
          </article>
        )
      })}
    </div>
  )
}
