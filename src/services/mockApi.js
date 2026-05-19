import regions from '../data/regions.json'
import suppliers from '../data/suppliers.json'
import shipments from '../data/shipments.json'
import forecast from '../data/forecast.json'
import alerts from '../data/alerts.json'
import timelineScenarios from '../data/timelineScenarios.json'

const delay = (ms = 180) => new Promise((resolve) => setTimeout(resolve, ms))

export const getDashboardData = async () => {
  await delay()
  return {
    regions,
    suppliers,
    shipments,
    forecast,
    alerts,
    timelineScenarios,
  }
}
