import { motion } from 'framer-motion'
import { AlertOctagon } from 'lucide-react'

const tone = {
  critical: 'border-rose-500/40 bg-rose-500/10',
  warning: 'border-yellow-500/40 bg-yellow-500/10',
  healthy: 'border-green-500/40 bg-green-500/10',
}

export default function AlertsPanel({ alerts }) {
  return (
    <section className="glass-panel rounded-2xl border border-slate-700/50 p-4">
      <h3 className="mb-3 text-base font-semibold text-slate-100">Live Alerts</h3>
      <div className="space-y-3">
        {alerts.map((alert) => (
          <motion.article
            key={alert.id}
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className={`rounded-xl border p-3 ${tone[alert.severity]}`}
          >
            <div className="mb-1 flex items-center gap-2 text-slate-100">
              <AlertOctagon className="h-4 w-4" />
              <p className="text-sm font-semibold">{alert.title}</p>
            </div>
            <p className="text-xs text-slate-300">{alert.message}</p>
          </motion.article>
        ))}
      </div>
    </section>
  )
}
