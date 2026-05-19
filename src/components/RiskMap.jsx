import { Fragment } from 'react'
import { MapContainer, TileLayer, Circle, CircleMarker, Popup } from 'react-leaflet'

const severityColor = {
  critical: '#f43f5e',
  warning: '#facc15',
  healthy: '#22c55e',
}

export default function RiskMap({ regions, onSelectRegion }) {
  return (
    <section className="glass-panel rounded-2xl border border-slate-700/50 p-4">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-100">Global Risk Map</h2>
        <div className="flex gap-4 text-xs text-slate-300">
          <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-rose-500" />critical</span>
          <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-yellow-400" />warning</span>
          <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-green-500" />healthy</span>
        </div>
      </div>
      <MapContainer center={[24.5, 43]} zoom={4} className="h-[360px] w-full rounded-xl">
        <TileLayer
          attribution='&copy; OpenStreetMap contributors &copy; CARTO'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        {regions.map((region) => {
          const color = severityColor[region.severity]
          return (
            <Fragment key={region.id}>
              <Circle
                center={[region.lat, region.lng]}
                radius={70000}
                pathOptions={{ color, fillColor: color, fillOpacity: 0.18, weight: 0 }}
              />
              <CircleMarker
                center={[region.lat, region.lng]}
                radius={9}
                pathOptions={{ color: '#0f172a', weight: 2, fillColor: color, fillOpacity: 1 }}
                eventHandlers={{
                  click: () => onSelectRegion(region),
                }}
              >
                <Popup>
                  <strong>{region.region}</strong>
                  <br />
                  Supplier risk: {region.supplierRisk}
                </Popup>
              </CircleMarker>
            </Fragment>
          )
        })}
      </MapContainer>
    </section>
  )
}
