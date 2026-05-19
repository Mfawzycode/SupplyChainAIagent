import { useEffect, useMemo, useState } from 'react'
import KpiCards from '../components/KpiCards'
import RiskMap from '../components/RiskMap'
import ChartsPanel from '../components/ChartsPanel'
import AlertsPanel from '../components/AlertsPanel'
import AIRecommendationPanel from '../components/AIRecommendationPanel'
import RegionDrilldown from '../components/RegionDrilldown'
import TimelineSimulation from '../components/TimelineSimulation'
import ChatbotPanel from '../components/ChatbotPanel'
import ExecutiveSummary from '../components/ExecutiveSummary'
import { getDashboardData } from '../services/mockApi'
import { calculateRegionRiskScore } from '../services/riskScoring'
import { buildRecommendations } from '../agents/recommendationAgent'

export default function DashboardPage() {
  const [data, setData] = useState(null)
  const [selectedRegion, setSelectedRegion] = useState(null)
  const [scenario, setScenario] = useState(null)

  useEffect(() => {
    getDashboardData().then((payload) => {
      const regionsWithRisk = payload.regions.map((region) => ({
        ...region,
        totalRisk: Math.min(100, calculateRegionRiskScore(region)),
      }))
      setData({ ...payload, regions: regionsWithRisk })
      setSelectedRegion(regionsWithRisk[0])
      setScenario(payload.timelineScenarios[0])
    })
  }, [])

  const kpis = useMemo(() => {
    if (!data || !scenario) return []
    const delayed = data.shipments.filter((shipment) => shipment.status === 'Delayed').length
    const weakInventory = data.regions.filter((region) => region.inventoryHealth < 70).length
    const avgRisk = Math.round(
      data.regions.reduce((sum, region) => sum + region.totalRisk, 0) / data.regions.length +
        scenario.riskImpact,
    )

    return [
      { label: 'Total Risk Score', value: avgRisk, subtext: 'Composite risk index', icon: 'risk' },
      { label: 'Delayed Shipments', value: delayed, subtext: `x${scenario.delayMultiplier} disruption stress`, icon: 'delay' },
      { label: 'Weak Inventory Areas', value: weakInventory, subtext: 'Below 70% health', icon: 'stock' },
      { label: 'Forecast Alerts', value: data.alerts.length, subtext: 'AI monitored exceptions', icon: 'trend' },
    ]
  }, [data, scenario])

  const recommendations = useMemo(() => {
    if (!data) return []
    return buildRecommendations(data.regions, data.suppliers)
  }, [data])

  const chatInsights = useMemo(() => {
    if (!data) return {}
    const weakest = [...data.regions].sort((a, b) => a.inventoryHealth - b.inventoryHealth)[0]
    const topSupplier = [...data.suppliers].sort((a, b) => b.riskScore - a.riskScore)[0]
    const delayedSupplier = [...data.shipments]
      .filter((shipment) => shipment.status === 'Delayed')
      .sort((a, b) => b.delayDays - a.delayDays)[0]

    return {
      weakestRegion: weakest.region,
      topRiskySku: topSupplier.sku,
      delayedSupplier: delayedSupplier.supplier,
      inventoryForecast: 'Inventory forecast indicates moderate-to-high pressure between July and August.',
    }
  }, [data])

  if (!data || !scenario) {
    return <div className="p-8 text-slate-300">Loading AI command center...</div>
  }

  const highRiskRegions = data.regions.filter((region) => region.totalRisk >= 75).length
  const expectedShortages = data.regions.filter((region) => region.inventoryHealth <= 65).length

  return (
    <main className="min-h-screen bg-grid px-4 py-6 text-slate-100 md:px-6 xl:px-8">
      <header className="mb-6">
        <p className="text-xs uppercase tracking-[0.35em] text-cyan-300">AI Supply Chain Risk Command Center</p>
        <h1 className="mt-2 text-2xl font-semibold md:text-3xl">Enterprise Risk Dashboard Demo</h1>
      </header>

      <ExecutiveSummary
        totalRiskScore={kpis[0]?.value}
        highRiskRegions={highRiskRegions}
        expectedShortages={expectedShortages}
      />

      <div className="mt-4">
        <KpiCards metrics={kpis} />
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-[2fr_1fr]">
        <RiskMap regions={data.regions} onSelectRegion={setSelectedRegion} />
        <AlertsPanel alerts={data.alerts} />
      </div>

      <div className="mt-4">
        <RegionDrilldown region={selectedRegion} />
      </div>

      <div className="mt-4">
        <ChartsPanel forecast={data.forecast} regions={data.regions} />
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-2">
        <AIRecommendationPanel recommendations={recommendations} />
        <ChatbotPanel insights={chatInsights} />
      </div>

      <div className="mt-4">
        <TimelineSimulation
          scenario={scenario}
          scenarios={data.timelineScenarios}
          onChange={setScenario}
        />
      </div>
    </main>
  )
}
