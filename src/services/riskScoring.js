export const calculateRegionRiskScore = ({ delayedShipments, inventoryHealth, supplierRisk }) => {
  const shipmentRisk = Math.min(100, delayedShipments * 4)
  const inventoryRisk = 100 - inventoryHealth
  return Math.round(shipmentRisk * 0.4 + inventoryRisk * 0.25 + supplierRisk * 0.35)
}

export const severityFromScore = (score) => {
  if (score >= 75) return 'critical'
  if (score >= 55) return 'warning'
  return 'healthy'
}
