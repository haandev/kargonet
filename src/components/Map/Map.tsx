import React, { useCallback, useMemo, useState } from "react"
import { GeocodingLocation } from "../../services/http/graphhopper/types"
import { Steps } from "../Steps"
import { StepDataType } from "../Steps/types"
import Step1Markers from "./Step1Markers"
import Step2Calendar from "./Step2Calendar"

export type TripType = {
  startMarker: GeocodingLocation
  endMarker: GeocodingLocation
  route: any
}

const Map = () => {
  const [trip, setTrip] = useState<TripType>()

  const handleChangeTrip = useCallback((trip: any) => {
    setTrip(trip)
    console.log(trip)
  }, [])

  const steps = useMemo<StepDataType>(
    () => [
      {
        name: "Başlangıç ve bitiş konumlarını seçin",
        children: <Step1Markers trip={trip} onChangeTrip={handleChangeTrip} />,
        continueCondition: Boolean(trip?.route),
        nextTitle: "Tarih Seçin",
      },
      {
        name: "Sizin için uygun tarihleri seçin",
        children: <Step2Calendar trip={trip} onChangeTrip={handleChangeTrip} />,
        continueCondition: true,
      },
      { name: "Yükünüz hakkında kısaca bilgi verin", continueCondition: true },
      { name: "Step 4", continueCondition: true },
      { name: "Step 5", continueCondition: true },
    ],
    [handleChangeTrip, trip]
  )
  return (
    <div className="text-left flex flex-col items-center">
      <Steps
        stepData={steps}
        className="mt-8"
        onChangeStep={() => {}}
        onFinish={() => {}}
      />
    </div>
  )
}

export default Map
