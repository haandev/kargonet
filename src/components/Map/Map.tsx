import React from 'react'
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import GeocodeInput, { nameConverter } from './../GeocodeInput/GeocodeInput'
import {
  GeocodingLocation,
  Point,
} from './../../services/http/graphhopper/types'
import { useCallback, useEffect, useRef, useState } from 'react'
import * as GraphHopper from './../../services/http/graphhopper/endpoints'
import L from 'leaflet'
let routingLayer: any
const Map = () => {
  const [startMarker, setStartMarker] = useState<GeocodingLocation>()
  const [endMarker, setEndMarker] = useState<GeocodingLocation>()
  const [route, setRoute] = useState<any>({ distance: 0 })
  const mapRef = useRef<any>(null)
  const putPointer = useCallback(
    (
      location: GeocodingLocation,
      stateSetter: React.Dispatch<
        React.SetStateAction<GeocodingLocation | undefined>
      >
    ) => {
      let prevKeep
      stateSetter((prev) => {
        prevKeep = prev
        return location
      })
      mapRef.current.flyTo([location.point.lat, location.point.lng], 14)
    },
    []
  )
  useEffect(() => {
    if (startMarker && endMarker) {
      routingLayer?.clearLayers?.()
      GraphHopper.Route({
        point: [
          `${startMarker.point.lat},${startMarker.point.lng}`,
          `${endMarker.point.lat},${endMarker.point.lng}`,
        ],
      }).then((data: any) => {
        let path = data.paths[0]
        setRoute(path)
        routingLayer.addData({
          type: 'Feature',
          geometry: path.points,
        } as any)
        if (path.bbox) {
          let minLon = path.bbox[0]
          let minLat = path.bbox[1]
          let maxLon = path.bbox[2]
          let maxLat = path.bbox[3]
          let tmpB = new L.LatLngBounds(
            new L.LatLng(minLat, minLon),
            new L.LatLng(maxLat, maxLon)
          )
          mapRef.current.fitBounds(tmpB)
        }
      })
      routingLayer = L.geoJSON().addTo(mapRef.current)
      routingLayer.options = {
        style: { color: '#00cc33', weight: 8, opacity: 1 },
      }
    }
  }, [startMarker, endMarker])
  const handleReady = () => {
    const attribution = document.getElementsByClassName(
      'leaflet-control-attribution'
    )

    if (attribution.length) {
      attribution[0].remove()
    }
  }

  return (
    <div>
      <h1 className="mt-8 text-xl sm:text-xl md:text-xl lg:text-2xl xl:text-2xl text-center text-amber-400 leading-7 md:leading-10">
        Anında fiyat hesaplamak için başlangıç ve bitiş konumunu girin
      </h1>
      <div>
        <GeocodeInput
          className="my-16 mx-4 w-72 z-50 inline-block"
          onSelectLocation={(location) => putPointer(location, setStartMarker)}
          placeholder="nereden?"
        />
        <GeocodeInput
          className="my-16 mx-4 w-72 inline-block"
          onSelectLocation={(location) => putPointer(location, setEndMarker)}
          placeholder="nereye?"
        />
      </div>
      <h1 className="mb-8  text-center text-earth-600 leading-7 md:leading-10">
        {!(startMarker && endMarker) ? (
          'Hem yükleme hem boşaltma konumu seçilmelidir'
        ) : (
          <p>
            <span className="font-semibold">{nameConverter(startMarker)}</span>{' '}
            konumundan{' '}
            <span className="font-semibold">{nameConverter(endMarker)}</span>{' '}
            konumuna olan mesafe{' '}
            <span className="font-semibold">
              {(route.distance / 1000).toFixed(2)}km
            </span>{' '}
            olup teklif ettiğimiz taşıma ücreti{' '}
            <span className="font-semibold">
              {((route.distance / 1000) * 15 + 250).toFixed(0)}₺
            </span>{' '}
            olarak hesaplanmıştır.
          </p>
        )}
      </h1>
      <MapContainer
        ref={mapRef}
        whenReady={handleReady}
        style={{ height: 700 }}
        center={[51.505, -0.09]}
        zoom={13}
        scrollWheelZoom={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {!!startMarker && (
          <Marker position={[startMarker.point.lat, startMarker.point.lng]}>
            <Popup>{nameConverter(startMarker)}</Popup>
          </Marker>
        )}
        {!!endMarker && (
          <Marker position={[endMarker.point.lat, endMarker.point.lng]}>
            <Popup>{nameConverter(endMarker)}</Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  )
}

export default Map
