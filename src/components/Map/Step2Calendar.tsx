import React from "react"
import { Calendar } from "../Calendar"

export interface Step1MarkersProps {
  onChangeTrip?: (trip: any) => void
}
const Step1Markers: React.FC<Step1MarkersProps> = (props) => {
  return (
    <div className="max-w-7xl xl:w-full w-[calc(100%-4rem)]  mx-auto h-[450px] ">
      <p className="text-center mb-2 text-gray-600 text-xs">
        Sizin için uygun olan bir veya daha fazla gün seçiniz. Daha fazla gün
        seçmeniz rota planlamasını kolaylaştıracağı için daha iyi bir indirim
        ile ödüllendirilirsiniz.
      </p>
      <Calendar />
    </div>
  )
}

export default Step1Markers
