import { ReactNode } from "react"

export interface StepsProps {
  stepData: StepDataType
  className?: string
  onChangeStep?: (currentIndex: number, targetIndex: number) => void
  onFinish?: () => void
  finishText?:string
}
export type StepRecordType = {
  name: string
  continueCondition?: boolean
  href?: string
  status?: "complete" | "current" | "upcoming"
  children?: ReactNode
  nextTitle?: string
  prevTitle?: string
}
export type StepDataType = StepRecordType[]
