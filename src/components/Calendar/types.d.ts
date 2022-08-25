import { ReactNode } from "react"

export interface CalendarProps {
  onChangeSelection: (selectedDays: any) => void
  defaultValue?: any
}
