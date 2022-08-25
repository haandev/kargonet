import React, { useCallback, useEffect, useMemo, useState } from "react"
import { GeocodingLocation } from "../../services/http/graphhopper/types"
import { Steps } from "../Steps"
import { StepDataType } from "../Steps/types"
import Step0CarType from "./Step0CarType"
import Step1Markers from "./Step1Markers"
import Step2Calendar from "./Step2Calendar"
import Step3Textarea from "./Step3Textarea"

export type TripType = {
  startMarker?: GeocodingLocation
  endMarker?: GeocodingLocation
  route?: any
  carType?: CarType
  selectedDays?: Array<any>
  information?: string
}
export type CarType = /* "shared" |  */ "small" | "medium" | "large"
const calculatePrice = (trip: any) => {
  const personCount = 0
  const furnitureService: boolean = false
  const carType: CarType = (trip?.carType as CarType) || "large"

  const startFees = { small: 150, medium: 200, large: 250 }

  const pricePerKmMatrix = {
    /*     shared: [
      { from: 0, fee: 25 },
      { from: 25, fee: 22.5 },
      { from: 50, fee: 20 },
      { from: 75, fee: 17.5 },
      { from: 100, fee: 15 },
    ], */
    small: [
      { from: 0, fee: 18 },
      { from: 25, fee: 14 },
      { from: 50, fee: 10 },
      { from: 75, fee: 9 },
      { from: 100, fee: 8 },
    ],
    medium: [
      { from: 0, fee: 19 },
      { from: 25, fee: 15 },
      { from: 50, fee: 11 },
      { from: 75, fee: 10 },
      { from: 100, fee: 9 },
    ],
    large: [
      { from: 0, fee: 20 },
      { from: 25, fee: 16 },
      { from: 50, fee: 12 },
      { from: 75, fee: 11 },
      { from: 100, fee: 10 },
    ],
  }
  const discountDayMatrix = [
    { from: 0, discount: 0 },
    { from: 2, discount: 2.5 },
    { from: 3, discount: 5 },
    { from: 4, discount: 7.5 },
    { from: 5, discount: 10 },
  ]
  const pricePerPerson = 0
  const priceFurnitureService = 0

  let nonCalculatedDistance = trip?.route?.distance / 1000
  const distancePrice = pricePerKmMatrix[carType].reduce(
    (acc, { from, fee }, idx) => {
      let calculationDistance = 0
      if (
        pricePerKmMatrix[carType][idx + 1]?.from &&
        nonCalculatedDistance > pricePerKmMatrix[carType][idx + 1].from - from
      ) {
        calculationDistance = pricePerKmMatrix[carType][idx + 1].from - from
        nonCalculatedDistance -= pricePerKmMatrix[carType][idx + 1].from
      } else {
        calculationDistance = nonCalculatedDistance
        nonCalculatedDistance = 0
      }
      return acc + calculationDistance * fee
    },
    0
  )
  const foundDiscountNext = discountDayMatrix.findIndex(
    (discount) => discount.from > (trip?.selectedDays?.length || 0)
  )
  const foundDiscount =
    foundDiscountNext < 1 ? discountDayMatrix.length - 1 : foundDiscountNext - 1

  const calendarDiscount =
    (discountDayMatrix[foundDiscount].discount * distancePrice) / 100

  const totalPrice =
    startFees[carType] +
    distancePrice -
    calendarDiscount +
    Number(furnitureService) * priceFurnitureService +
    pricePerPerson * personCount

  const fixedPrice = Math.ceil(totalPrice / 10) * 10
  console.log(fixedPrice)
  return fixedPrice
}
const Map = () => {
  const [trip, setTrip] = useState<TripType>({ carType: "large" })

  const handleChangeTrip = useCallback((trip: any) => {
    setTrip(trip)
  }, [])

  const price = useMemo(() => calculatePrice(trip), [trip])

  const steps = useMemo<StepDataType>(
    () => [
      {
        name: "İhtiyacınıza yönelik bir araç seçin",
        children: <Step0CarType trip={trip} onChangeTrip={handleChangeTrip} />,
        continueCondition: Boolean(trip?.carType),
        nextTitle: "Konum seçin",
      },
      {
        name: "Başlangıç ve bitiş konumlarını seçin",
        children: <Step1Markers trip={trip} onChangeTrip={handleChangeTrip} />,
        continueCondition: Boolean(trip?.route),
        nextTitle: "Tarih seçin",
      },
      {
        name: "Sizin için uygun tarihleri seçin",
        children: <Step2Calendar trip={trip} onChangeTrip={handleChangeTrip} />,
        continueCondition: Boolean(trip?.selectedDays?.length),
      },
      {
        name: "Yükünüz hakkında kısaca bilgi verin",
        children: <Step3Textarea trip={trip} onChangeTrip={handleChangeTrip} />,
        continueCondition: Number(trip?.information?.length) > 2,
      },
      { name: "İletişim bilgileriniz", continueCondition: true },
      { name: "Özet", continueCondition: true },
    ],
    [handleChangeTrip, trip]
  )
  return (
    <div className="w-full  justify-center flex" id="scroll-start">
      <div className="text-left flex flex-col items-center max-w-7xl xl:w-full w-[calc(100%-4rem)]">
        <Steps
          price={price}
          stepData={steps}
          className="mt-8"
          onChangeStep={() => {}}
          onFinish={() => {}}
        />
      </div>
    </div>
  )
}

export default Map
