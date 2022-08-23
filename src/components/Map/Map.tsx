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
        Başlangıç ve bitiş konumunu girin
      </h1>
      <div className='my-8'>
        <GeocodeInput
          className="my-2 mx-auto md:mx-2 w-80 md:w-96 z-50 inline-block"
          onSelectLocation={(location) => putPointer(location, setStartMarker)}
          placeholder="nereden?"
        />
        <GeocodeInput
          className="my-2 mx-auto md:mx-2 w-80 md:w-96 inline-block"
          onSelectLocation={(location) => putPointer(location, setEndMarker)}
          placeholder="nereye?"
        />
      </div>
    
      <MapContainer
        ref={mapRef}
        whenReady={handleReady}
        className="w-80 mx-auto my-8 md:w-full h-[300px] md:h-{500px]"
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
      <button
              className="w-80 mx-auto mb-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-amber-400 hover:bg-amber-500"
            >
              Fiyat al
            </button>
    </div>
  )
}

export default Map
