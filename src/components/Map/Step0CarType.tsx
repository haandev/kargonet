import { RadioGroup } from "@headlessui/react"
import { CheckCircleIcon } from "@heroicons/react/solid"
import React, { useEffect, useState } from "react"
import classNames from "../../utils/classnames"

const carLists = [
  {
    id: "small",
    disabled: true,
    image: "small.png",
    title: "Küçük (Yakında)",
    description:
      "Fiat Doblo, Ford Connect veya benzer sınıf araçlardan birisi.",
    volume: "Yaklaşık 1m³ - 4m³",
  },
  {
    id: "medium",
    disabled: true,
    title: "Orta (Yakında)",
    image: "medium.png",
    description:
      "Ford Transit, Renault Traffic veya benzer sınıf araçlardan birisi.",
    volume: "Yaklaşık 7m³ - 11m³",
  },
  {
    id: "large",
    title: "Büyük",
    image: "large.png",
    description: "VW Crafter, Fiat Ducato veya benzer sınıf araçlardan birisi.",
    volume: "Yaklaşık 15m³ - 17m³",
  },
]

export interface Step0CarTypeProps {
  onChangeTrip?: (trip: any) => void
  trip?: any
}
const Step0CarType: React.FC<Step0CarTypeProps> = ({ onChangeTrip, trip }) => {
  const [selectedCar, setSelectedCar] = useState(
    trip?.carType || carLists[2].id
  )
  useEffect(() => {
    onChangeTrip?.((prev: any) => ({ ...prev, carType: selectedCar }))
  }, [onChangeTrip, selectedCar])
  return (
    <div className="w-full h-100">
      <RadioGroup value={selectedCar} onChange={setSelectedCar}>
        <div className="mt-4 grid grid-cols-1 gap-y-2 sm:grid-cols-3 sm:gap-x-4">
          {carLists.map((car) => (
            <RadioGroup.Option
              disabled={!!car.disabled}
              key={car.id}
              value={car.id}
              className={({ checked, active }) =>
                classNames(
                  checked ? "border-transparent" : "border-gray-300",
                  active ? "ring-2 ring-amber-400" : "",
                  "relative bg-white border rounded-lg shadow-sm p-4 flex cursor-pointer focus:outline-none"
                )
              }>
              {({ checked, active }) => (
                <>
                  <div className="flex-1 flex">
                    <div className="flex flex-row">
                      <div className="mr-4">
                        <img src={car.image} alt={car.title} />
                      </div>
                      <div className="flex flex-col">
                        <RadioGroup.Label
                          as="span"
                          className="block text-sm font-medium text-gray-900">
                          {car.title}
                        </RadioGroup.Label>
                        <RadioGroup.Description
                          as="span"
                          className="mt-1 flex items-center text-xs sm:text-sm text-gray-500">
                          {car.description}
                        </RadioGroup.Description>
                        <RadioGroup.Description
                          as="span"
                          className="mt-6 text-sm font-medium text-gray-900">
                          {car.volume}
                        </RadioGroup.Description>
                      </div>
                    </div>
                  </div>
                  <CheckCircleIcon
                    className={classNames(
                      !checked ? "invisible" : "",
                      "h-5 w-5 text-amber-500"
                    )}
                    aria-hidden="true"
                  />
                  <div
                    className={classNames(
                      active ? "border" : "border-2",
                      checked ? "border-amber-400" : "border-transparent",
                      "absolute -inset-px rounded-lg pointer-events-none"
                    )}
                    aria-hidden="true"
                  />
                </>
              )}
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>
    </div>
  )
}

export default React.memo(Step0CarType)
