import { themeColor, themeSize } from "@/styles/theme"

export interface CommonProps<T> {
  children?: React.ReactNode
  className?: string
  color?: themeColor
  size?: themeSize
  round?: boolean
  square?: boolean
  type?: 'button' | 'submit' | 'reset' | undefined
  outlined?: boolean
  before?: React.ReactNode
  after?: React.ReactNode
  disabled?: boolean
  loading?: boolean
  fullWidth?: boolean
  onClick?: () => any
  tooltip?: string
  renderer?: (arg0: T) => React.ReactNode
}