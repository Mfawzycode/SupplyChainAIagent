import { Sparkles } from 'lucide-react'

export default function AIRecommendationPanel({ recommendations }) {
  return (
    <section className="glass-panel rounded-2xl border border-slate-700/50 p-4">
      <div className="mb-3 flex items-center gap-2 text-cyan-200">
        <Sparkles className="h-4 w-4" />
        <h3 className="text-base font-semibold text-slate-100">AI Agent Recommendations</h3>
      </div>
      <ul className="space-y-3 text-sm text-slate-200">
        {recommendations.map((recommendation) => (
          <li key={recommendation} className="rounded-xl border border-cyan-400/20 bg-cyan-400/5 p-3">
            {recommendation}
          </li>
        ))}
      </ul>
    </section>
  )
}
