/* This example requires Tailwind CSS v2.0+ */
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid"
import { useCallback, useEffect, useState } from "react"
import { CalendarProps } from "./types"

function getLocalDayNames() {
  let d = new Date(2000, 0, 3) // Monday
  let days = []
  for (let i = 0; i < 7; i++) {
    days.push({
      long: d.toLocaleString("default", { weekday: "long" }),
      short: d.toLocaleString("default", { weekday: "short" }),
    })
    d.setDate(d.getDate() + 1)
  }
  return days
}

const localeDayNames = getLocalDayNames()

function getLocalMonthNames() {
  let d = new Date(2000, 0) // January
  let months = []
  for (let i = 0; i < 12; i++) {
    months.push({
      long: d.toLocaleString("default", { month: "long" }),
      short: d.toLocaleString("default", { month: "short" }),
    })
    d.setMonth(i + 1)
  }
  return months
}
const localeMonthNames = getLocalMonthNames()

function classNames(...classes: Array<string | null | undefined | boolean>) {
  return classes.filter(Boolean).join(" ")
}

const chooseable = (date: Date) => {
  const today: Date = new Date()
  today.setHours(0, 0, 0, 0)
  return date > today
}
const isSelected = (day: any, selectedDays: any) =>
  Boolean(
    selectedDays.find(
      (dayRow: any) => dayRow.date.toISOString() === day.date.toISOString()
    )
  )


export const Calendar: React.FC<CalendarProps> = ({onChangeSelection,defaultValue}) => {
  const today = new Date()
  const [current, setCurrent] = useState<{ month: number; year: number }>({
    month: today.getMonth(),
    year: today.getFullYear(),
  })

  const handleNextMonth = useCallback(() => {
    setCurrent((prev) => {
      if (prev.month === 11) {
        return { year: prev.year + 1, month: 0 }
      }
      return { year: prev.year, month: prev.month + 1 }
    })
  }, [])
  const handlePrevMonth = useCallback(() => {
    setCurrent((prev) => {
      if (prev.month === 0) {
        return { year: prev.year - 1, month: 11 }
      }
      return { year: prev.year, month: prev.month - 1 }
    })
  }, [])

  const [days, setDays] = useState<any>([])
  const [selectedDays, setSelectedDays] = useState<any[]>(
    defaultValue || []
  )
  useEffect(() => {
    const firstDay = new Date(current.year, current.month)
    firstDay.setMinutes(firstDay.getMinutes() + firstDay.getTimezoneOffset())
    const diff = ((firstDay.getDay() + 7) % 7) - 1
    firstDay.setDate(firstDay.getDate() - diff)

    const daysNew = []
    for (let i = 0; i < 42; i++) {
      const iterator = new Date(firstDay.getTime())
      iterator.setDate(iterator.getDate() + i)
      daysNew.push({ date: iterator })
    }
    setDays(daysNew)
  }, [current.month, current.year])
  const handleDayClick = useCallback((day: any) => {
    setSelectedDays((prev: any) => {
      if (
        prev.find(
          (dayRow: any) => dayRow.date.toISOString() === day.date.toISOString()
        )
      ) {
        const daysArray = prev.filter(
          (dayRow: any) => dayRow.date.toISOString() !== day.date.toISOString()
        )
        return daysArray
      } else {
        const daysArray = [...prev, day]
        return daysArray
      }
    })
  }, [])
  useEffect(() => {
    onChangeSelection(selectedDays)
  }, [onChangeSelection, selectedDays])
  return (
    <div className="relative">
      <button
        type="button"
        onClick={handlePrevMonth}
        className="absolute -top-1 -left-1.5 flex items-center justify-center p-1.5 text-gray-400 hover:text-gray-500">
        <span className="sr-only">Previous month</span>
        <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
      </button>
      <button
        onClick={handleNextMonth}
        type="button"
        className="absolute -top-1 -right-1.5 flex items-center justify-center p-1.5 text-gray-400 hover:text-gray-500">
        <span className="sr-only">Next month</span>
        <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
      </button>

      <section className={classNames("text-center")}>
        <h2 className="font-semibold text-gray-900">
          {localeMonthNames[current.month].long} {current.year}
        </h2>
        <div className="mt-6 grid grid-cols-7 text-xs leading-6 text-gray-500">
          {localeDayNames.map((dayName, idx) => (
            <div key={idx}>
              <div className="hidden md:block">{dayName.long}</div>
              <div className="md:hidden">{dayName.short}</div>
            </div>
          ))}
        </div>
        <div className="isolate mt-2 grid grid-cols-7 gap-px rounded-lg bg-gray-200 text-sm shadow ring-1 ring-gray-200">
          {days.map((day: any, dayIdx: number) => (
            <button
              onClick={() => {
                handleDayClick(day)
              }}
              disabled={!chooseable(day.date)}
              key={day.date.toISOString()}
              type="button"
              className={classNames(
                !isSelected(day, selectedDays) &&
                  (day.date.getMonth() === current.month
                    ? "bg-white text-gray-900"
                    : "bg-gray-50 text-gray-400"),
                dayIdx === 0 && "rounded-tl-lg",
                dayIdx === 6 && "rounded-tr-lg",
                dayIdx === days.length - 7 && "rounded-bl-lg",
                dayIdx === days.length - 1 && "rounded-br-lg",
                "relative py-3  focus:z-10",
                chooseable(day.date) &&
                  !isSelected(day, selectedDays) &&
                  "hover:bg-gray-100",
                chooseable(day.date) &&
                  isSelected(day, selectedDays) &&
                  "hover:bg-amber-300 bg-amber-400 text-white "
              )}>
              <time
                dateTime={day?.date?.toISOString().split("T")[0]}
                className={classNames(
                  day.date.getDate() === today.getDate() &&
                    day.date.getMonth() === today.getMonth() &&
                    day.date.getFullYear() === today.getFullYear() &&
                    "bg-amber-400 font-semibold text-white",
                  "mx-auto flex h-7 w-7 items-center justify-center rounded-full"
                )}>
                {day?.date
                  ?.toISOString()
                  .split("T")[0]
                  .split?.("-")
                  ?.pop?.()
                  ?.replace?.(/^0/, "")}
              </time>
            </button>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Calendar
