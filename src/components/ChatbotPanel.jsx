import { useMemo, useState } from 'react'
import { Bot, Send } from 'lucide-react'

const getReply = (message, insights) => {
  const query = message.toLowerCase()
  if (query.includes('weakest region')) return `Weakest region is ${insights.weakestRegion}.`
  if (query.includes('top risky sku')) return `Top risky SKU is ${insights.topRiskySku}.`
  if (query.includes('delayed supplier')) return `Most delayed supplier is ${insights.delayedSupplier}.`
  if (query.includes('inventory forecast')) return insights.inventoryForecast
  return 'Try asking: weakest region, top risky SKU, delayed suppliers, inventory forecast.'
}

export default function ChatbotPanel({ insights }) {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Ask me about weakest region, top risky SKU, delayed suppliers, or inventory forecast.' },
  ])

  const canSend = useMemo(() => input.trim().length > 0, [input])

  const sendMessage = () => {
    if (!canSend) return
    const userMessage = input.trim()
    setMessages((previous) => [
      ...previous,
      { role: 'user', text: userMessage },
      { role: 'bot', text: getReply(userMessage, insights) },
    ])
    setInput('')
  }

  return (
    <section className="glass-panel rounded-2xl border border-slate-700/50 p-4">
      <div className="mb-3 flex items-center gap-2">
        <Bot className="h-4 w-4 text-cyan-300" />
        <h3 className="text-base font-semibold text-slate-100">Supply Chain Copilot Chatbot</h3>
      </div>
      <div className="mb-3 h-44 space-y-2 overflow-y-auto rounded-xl border border-slate-700/50 bg-slate-900/60 p-3">
        {messages.map((message, index) => (
          <div
            key={`${message.role}-${index}`}
            className={`rounded-lg px-3 py-2 text-xs ${
              message.role === 'user'
                ? 'ml-10 bg-cyan-500/20 text-cyan-100'
                : 'mr-10 bg-slate-700/60 text-slate-200'
            }`}
          >
            {message.text}
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={(event) => event.key === 'Enter' && sendMessage()}
          className="w-full rounded-lg border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm text-slate-100 outline-none focus:border-cyan-400"
          placeholder="Ask: weakest region"
        />
        <button
          type="button"
          onClick={sendMessage}
          className="rounded-lg bg-cyan-500 px-3 py-2 text-slate-950 transition hover:bg-cyan-400"
        >
          <Send className="h-4 w-4" />
        </button>
      </div>
    </section>
  )
}
