import React, { useCallback } from "react"
import { Calendar } from "../Calendar"

export interface Step1MarkersProps {
  onChangeTrip?: (trip: any) => void
  trip?: any
}
const Step2Calendar: React.FC<Step1MarkersProps> = ({ onChangeTrip, trip }) => {
  const handleChangeSelection = useCallback(
    (selectedDays: any) => {
      onChangeTrip?.((prev: any) => ({ ...prev, selectedDays }))
    },
    [onChangeTrip]
  )
  return (
    <div className="max-w-7xl xl:w-full w-[calc(100%-4rem)]  mx-auto h-[450px] ">
      <p className="text-center mb-2 text-gray-600 text-xs">
        Sizin için uygun olan bir veya daha fazla gün seçiniz. Daha fazla gün
        seçmeniz rota planlamasını kolaylaştıracağı için daha iyi bir indirim
        ile ödüllendirilirsiniz.
      </p>
      <Calendar
        onChangeSelection={handleChangeSelection}
        defaultValue={trip?.selectedDays}
      />
    </div>
  )
}

export default Step2Calendar
