import React, { useState } from "react"
import { useEffect } from "react"

export interface Step3TextareaProps {
  onChangeTrip?: (trip: any) => void
  trip?: any
}
const Step3Textarea: React.FC<Step3TextareaProps> = ({
  onChangeTrip,
  trip,
}) => {
  const [info, setInfo] = useState<string>(trip?.information || "")
  useEffect(() => {
    onChangeTrip?.((prev: any) => ({ ...prev, information: info }))
  }, [info])

  return (
    <div className="w-full">
      <div className="max-w-7xl w-full  mx-auto  h-100">
        <textarea
          onChange={(e) => setInfo(e?.currentTarget.value)}
          rows={4}
          name="comment"
          id="comment"
          className="shadow-sm p-3 focus:ring-amber-400 focus:border-amber-400 h-[200px] block w-full sm:text-sm border-solid border-[1px] border-gray-300 rounded-md"
          defaultValue={info}
          placeholder="Yükünüz hakkında kısa bir bilgi veriniz. Örneğin: 'Bir palet kağıt' veya '30 koli tekstil ürünü' gibi"
        />
      </div>
    </div>
  )
}

export default React.memo(Step3Textarea)
