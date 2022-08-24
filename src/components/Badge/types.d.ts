import { ReactNode } from "react"

export interface BadgeProps {
  className?: string
  children: ReactNode
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}
