'use client'

import React, { useEffect } from 'react'
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  CircleMarker,
  Circle,
  useMapEvents
} from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Custom styles to remove zoom control borders
const customMapStyles = `
  .leaflet-control-zoom a {
    border: none !important;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12) !important;
  }
  .leaflet-control-zoom {
    border: none !important;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12) !important;
  }
`

// Fix for default markers in Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png'
})

// Create custom icons
const satelliteIcon = new L.Icon({
  iconUrl:
    'data:image/svg+xml;base64,' +
    btoa(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
      <circle cx="12" cy="12" r="8" fill="#3b82f6" stroke="white" stroke-width="2"/>
      <text x="12" y="16" text-anchor="middle" fill="white" font-size="10" font-weight="bold">S</text>
    </svg>
  `),
  iconSize: [24, 24],
  iconAnchor: [12, 12],
  popupAnchor: [0, -12]
})

const groundStationIcon = new L.Icon({
  iconUrl:
    'data:image/svg+xml;base64,' +
    btoa(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
      <circle cx="12" cy="12" r="6" fill="#22c55e" stroke="white" stroke-width="2"/>
      <text x="12" y="15" text-anchor="middle" fill="white" font-size="8" font-weight="bold">G</text>
    </svg>
  `),
  iconSize: [20, 20],
  iconAnchor: [10, 10],
  popupAnchor: [0, -10]
})

// Custom icon for TX (Transmitter) station
const txStationIcon = new L.Icon({
  iconUrl:
    'data:image/svg+xml;base64,' +
    btoa(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" width="30" height="30">
      <circle cx="15" cy="15" r="12" fill="#dc2626" stroke="white" stroke-width="3"/>
      <text x="15" y="19" text-anchor="middle" fill="white" font-size="10" font-weight="bold">TX</text>
    </svg>
  `),
  iconSize: [30, 30],
  iconAnchor: [15, 15],
  popupAnchor: [0, -15]
})

// Custom icon for RX (Receiver) station
const rxStationIcon = new L.Icon({
  iconUrl:
    'data:image/svg+xml;base64,' +
    btoa(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" width="30" height="30">
      <circle cx="15" cy="15" r="12" fill="#2563eb" stroke="white" stroke-width="3"/>
      <text x="15" y="19" text-anchor="middle" fill="white" font-size="10" font-weight="bold">RX</text>
    </svg>
  `),
  iconSize: [30, 30],
  iconAnchor: [15, 15],
  popupAnchor: [0, -15]
})

interface LeafletMapProps {
  height?: string
  onCoordinateSelect?: (lat: number, lng: number) => void
  selectedCoordinates?: {
    tx?: { lat: number; lng: number }
    rx?: { lat: number; lng: number }
  }
  mapCenter?: { lat: number; lng: number } | null
  zoom?: number
}

// Component to handle map clicks for coordinate selection
const MapClickHandler: React.FC<{
  onCoordinateSelect: (lat: number, lng: number) => void
}> = ({ onCoordinateSelect }) => {
  useMapEvents({
    click: (e) => {
      onCoordinateSelect(e.latlng.lat, e.latlng.lng)
    }
  })
  return null
}

// Component to handle map centering
const MapCenterHandler: React.FC<{
  center: { lat: number; lng: number }
}> = ({ center }) => {
  const map = useMapEvents({})

  React.useEffect(() => {
    // Zoom in closely when searching for coordinates (zoom level 15)
    map.setView([center.lat, center.lng], 15)
  }, [center, map])

  return null
}

const LeafletMap: React.FC<LeafletMapProps> = ({
  height = '400px',
  onCoordinateSelect,
  selectedCoordinates,
  mapCenter,
  zoom = 10
}) => {
  // Satellite positions focused on China coverage
  const satellites = [
    {
      id: 'BDS-1',
      name: '北斗三号-1',
      lat: 40.0,
      lng: 110.0,
      status: 'active'
    },
    {
      id: 'BDS-2',
      name: '北斗三号-2',
      lat: 35.0,
      lng: 125.0,
      status: 'active'
    },
    {
      id: 'BDS-3',
      name: '北斗三号-3',
      lat: 30.0,
      lng: 105.0,
      status: 'active'
    },
    { id: 'TT-1', name: '天通一号', lat: 25.0, lng: 115.0, status: 'active' }
  ]

  // Ground stations across China
  const groundStations = [
    { id: 'BJ-001', name: '北京站', lat: 39.9042, lng: 116.4074 },
    { id: 'SH-001', name: '上海站', lat: 31.2304, lng: 121.4737 },
    { id: 'GZ-001', name: '广州站', lat: 23.1291, lng: 113.2644 },
    { id: 'SZ-001', name: '深圳站', lat: 22.5431, lng: 114.0579 },
    { id: 'CD-001', name: '成都站', lat: 30.5728, lng: 104.0668 },
    { id: 'WH-001', name: '武汉站', lat: 30.5928, lng: 114.3055 },
    { id: 'XA-001', name: '西安站', lat: 34.3416, lng: 108.9398 },
    { id: 'HZ-001', name: '杭州站', lat: 30.2741, lng: 120.1551 },
    { id: 'NJ-001', name: '南京站', lat: 32.0603, lng: 118.7969 },
    { id: 'TJ-001', name: '天津站', lat: 39.3434, lng: 117.3616 }
  ]

  // Communication links (satellite to key ground stations)
  const communicationLinks = [
    { satellite: satellites[0], groundStation: groundStations[0] }, // 北斗-1 to 北京
    { satellite: satellites[0], groundStation: groundStations[1] }, // 北斗-1 to 上海
    { satellite: satellites[1], groundStation: groundStations[2] }, // 北斗-2 to 广州
    { satellite: satellites[1], groundStation: groundStations[4] }, // 北斗-2 to 成都
    { satellite: satellites[2], groundStation: groundStations[5] }, // 北斗-3 to 武汉
    { satellite: satellites[2], groundStation: groundStations[6] }, // 北斗-3 to 西安
    { satellite: satellites[3], groundStation: groundStations[3] }, // 天通 to 深圳
    { satellite: satellites[3], groundStation: groundStations[7] } // 天通 to 杭州
  ]

  return (
    <div style={{ height, width: '100%' }}>
      <style>{customMapStyles}</style>
      <MapContainer
        center={mapCenter ? [mapCenter.lat, mapCenter.lng] : [35.0, 110.0]}
        zoom={zoom}
        style={{ height: '100%', width: '100%' }}
        worldCopyJump={false}
        maxBounds={[
          [15.0, 70.0],
          [55.0, 140.0]
        ]}
      >
        <TileLayer
          attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
          url='https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
        />

        {/* Add click handler for coordinate selection */}
        {onCoordinateSelect && (
          <MapClickHandler onCoordinateSelect={onCoordinateSelect} />
        )}

        {/* Add map centering handler */}
        {mapCenter && <MapCenterHandler center={mapCenter} />}

        {/* Render Satellites */}
        {satellites.map((satellite) => (
          <React.Fragment key={satellite.id}>
            <Marker
              position={[satellite.lat, satellite.lng]}
              icon={satelliteIcon}
            >
              <Popup>
                <div className='text-center'>
                  <strong>{satellite.name}</strong>
                  <br />
                  ID: {satellite.id}
                  <br />
                  状态: {satellite.status === 'active' ? '正常' : '离线'}
                  <br />
                  位置: {satellite.lat.toFixed(2)}°, {satellite.lng.toFixed(2)}°
                </div>
              </Popup>
            </Marker>
            {/* Satellite coverage area */}
            <Circle
              center={[satellite.lat, satellite.lng]}
              radius={800000} // 800km radius for China coverage
              pathOptions={{
                color: '#3b82f6',
                weight: 1,
                opacity: 0.4,
                fillOpacity: 0.1,
                dashArray: '5, 5'
              }}
            />
          </React.Fragment>
        ))}

        {/* Render Ground Stations */}
        {groundStations.map((station) => (
          <Marker
            key={station.id}
            position={[station.lat, station.lng]}
            icon={groundStationIcon}
          >
            <Popup>
              <div className='text-center'>
                <strong>{station.name}</strong>
                <br />
                ID: {station.id}
                <br />
                状态: 在线
                <br />
                坐标: {station.lat.toFixed(4)}°, {station.lng.toFixed(4)}°
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Render Communication Links */}
        {communicationLinks.map((link, index) => (
          <Polyline
            key={`link-${index}`}
            positions={[
              [link.satellite.lat, link.satellite.lng],
              [link.groundStation.lat, link.groundStation.lng]
            ]}
            pathOptions={{
              color: '#f97316',
              weight: 2,
              opacity: 0.7,
              dashArray: '10, 5'
            }}
          />
        ))}

        {/* Render Selected TX Station */}
        {selectedCoordinates?.tx && (
          <Marker
            position={[selectedCoordinates.tx.lat, selectedCoordinates.tx.lng]}
            icon={txStationIcon}
          >
            <Popup>
              <div className='text-center'>
                <strong>发射站 (TX)</strong>
                <br />
                纬度: {selectedCoordinates.tx.lat.toFixed(6)}°
                <br />
                经度: {selectedCoordinates.tx.lng.toFixed(6)}°
              </div>
            </Popup>
          </Marker>
        )}

        {/* Render Selected RX Station */}
        {selectedCoordinates?.rx && (
          <Marker
            position={[selectedCoordinates.rx.lat, selectedCoordinates.rx.lng]}
            icon={rxStationIcon}
          >
            <Popup>
              <div className='text-center'>
                <strong>接收站 (RX)</strong>
                <br />
                纬度: {selectedCoordinates.rx.lat.toFixed(6)}°
                <br />
                经度: {selectedCoordinates.rx.lng.toFixed(6)}°
              </div>
            </Popup>
          </Marker>
        )}

        {/* Render Communication Link between TX and RX */}
        {selectedCoordinates?.tx && selectedCoordinates?.rx && (
          <Polyline
            positions={[
              [selectedCoordinates.tx.lat, selectedCoordinates.tx.lng],
              [selectedCoordinates.rx.lat, selectedCoordinates.rx.lng]
            ]}
            pathOptions={{
              color: '#7c3aed',
              weight: 3,
              opacity: 0.8,
              dashArray: '8, 4'
            }}
          />
        )}
      </MapContainer>
    </div>
  )
}

export default LeafletMap
