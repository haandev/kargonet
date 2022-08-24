import React from "react"
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"
import GeocodeInput, { nameConverter } from "../GeocodeInput/GeocodeInput"
import { GeocodingLocation } from "../../services/http/graphhopper/types"
import { useCallback, useEffect, useRef, useState } from "react"
import * as GraphHopper from "../../services/http/graphhopper/endpoints"
import L from "leaflet"
let routingLayer: any

export interface Step1MarkersProps {
  onChangeTrip?: (trip: any) => void
}
const Step1Markers: React.FC<Step1MarkersProps> = (props) => {
  const [startMarker, setStartMarker] = useState<GeocodingLocation>()
  const [endMarker, setEndMarker] = useState<GeocodingLocation>()
  const [ , setRoute] = useState<any>({ distance: 0 })

  const mapRef = useRef<any>(null)
  const putPointer = useCallback(
    (
      location: GeocodingLocation,
      stateSetter: React.Dispatch<
        React.SetStateAction<GeocodingLocation | undefined>
      >
    ) => {
      stateSetter(location)
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
        props.onChangeTrip?.((prev: any) => ({
          ...prev,
          route: path,
          startMarker,
          endMarker,
        }))
        routingLayer.addData({
          type: "Feature",
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
        style: { color: "#00cc33", weight: 8, opacity: 1 },
      }
    }
  }, [startMarker, endMarker, props])

  const handleReady = () => {
    const attribution = document.getElementsByClassName(
      "leaflet-control-attribution"
    )

    if (attribution.length) {
      attribution[0].remove()
    }
  }
  return (
    <div className="w-full">
      <div className="z-[9999] mb-2 px-8 xl:px-0 text-left flex flex-col xl:flex-row items-center w-full justify-center">
        <GeocodeInput
          label="Yükleme konumu"
          className="my-2 mx-auto md:mx-2 w-full xl:w-[38rem] inline-block"
          onSelectLocation={(location) => putPointer(location, setStartMarker)}
          placeholder="nereden?"
        />

        <GeocodeInput
          label="Boşaltma konumu"
          className="my-2 mx-auto md:mx-2 w-full xl:w-[38rem] inline-block"
          onSelectLocation={(location) => putPointer(location, setEndMarker)}
          placeholder="nereye?"
        />
      </div>

      <MapContainer
        ref={mapRef}
        whenReady={handleReady}
        className="max-w-7xl xl:w-full w-[calc(100%-4rem)]  mx-auto my-4  h-[300px]  md:h-[340px]"
        center={[41.0766019, 29.052495]}
        zoom={13}
        scrollWheelZoom={false}>
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

export default React.memo(Step1Markers)
