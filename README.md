# AI Supply Chain Risk Dashboard (Demo)

Modern enterprise-style AI command center built with **React + Vite + Tailwind + Recharts + React Leaflet**.

## Features

- Interactive world map with colored risk markers (red/yellow/green)
- Heatmap-style regional intensity overlays
- KPI cards for risk, delays, inventory weakness, and forecast alerts
- Executive summary (total risk score, high-risk regions, expected shortages)
- Region drill-down panel
- Recharts analytics (forecast trend + region risk vs delay)
- Animated alerts panel
- AI Agent recommendation panel
- Chatbot UI for:
  - weakest region
  - top risky SKU
  - delayed suppliers
  - inventory forecast
- War disruption timeline simulation
- Mock API layer powered by local JSON data
- Realistic sample countries: UAE, Saudi Arabia, Egypt, Qatar, Oman

## Install

```bash
npm install
```

## Run

```bash
npm run dev
```

Production build:

```bash
npm run build
```

Lint:

```bash
npm run lint
```

## Architecture

```text
src/
  agents/
    recommendationAgent.js
  components/
    AIRecommendationPanel.jsx
    AlertsPanel.jsx
    ChatbotPanel.jsx
    ChartsPanel.jsx
    ExecutiveSummary.jsx
    KpiCards.jsx
    RegionDrilldown.jsx
    RiskMap.jsx
    TimelineSimulation.jsx
  data/
    alerts.json
    forecast.json
    regions.json
    shipments.json
    suppliers.json
    timelineScenarios.json
  pages/
    DashboardPage.jsx
  services/
    mockApi.js
    riskScoring.js
  App.jsx
  main.jsx
  index.css
```

## Region Risk Scoring Formula

`regionRisk = (delayedShipments * 4 * 0.40) + ((100 - inventoryHealth) * 0.25) + (supplierRisk * 0.35)`

This formula is implemented in `src/services/riskScoring.js` and drives map severity and KPI insights.
