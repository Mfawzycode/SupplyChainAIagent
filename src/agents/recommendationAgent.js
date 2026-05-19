import { calculateRegionRiskScore } from '../services/riskScoring'

export const buildRecommendations = (regions, suppliers) => {
  const topRegion = [...regions]
    .map((region) => ({
      ...region,
      totalRisk: calculateRegionRiskScore(region),
    }))
    .sort((a, b) => b.totalRisk - a.totalRisk)[0]

  const topSupplier = [...suppliers].sort((a, b) => b.riskScore - a.riskScore)[0]

  return [
    `Increase safety stock in ${topRegion.region} region due to supplier delays.`,
    `Diversify ${topSupplier.sku} sourcing away from ${topSupplier.name} until on-time performance stabilizes.`,
    `Prioritize expedited shipping for high-risk SKUs crossing the UAE-Saudi corridor in the next 14 days.`,
  ]
}
