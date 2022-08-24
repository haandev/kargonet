import { ReactNode } from "react"

export interface ButtonProps {
  className?: string
  children: ReactNode
  disabled?: boolean
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}
