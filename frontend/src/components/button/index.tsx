import { themeColor, themeSize } from "@/styles/theme"
import React from "react"
import { CommonProps } from "./types"
import { DefaultContentRender } from "./DefaultContentRender"
import cn from "classnames"

interface Props extends CommonProps<any> { }

const Component: React.FC<Props> = props => {
  const {
    color = 'primary',
    className,
    size = 'medium',
    type = 'button',
    outlined = false,
    disabled = false,
    loading = false,
    fullWidth = false,
    round = false,
    square = false,
    onClick,
    tooltip,
    renderer = DefaultContentRender
  } = props

  const Component = 'button'
  const classNames = [
    `text-${color}`
  ]

  return (
    <Component
      className={cn(classNames, className)}
    >
      {renderer(props)}
    </Component>
  )
}

export const Button = React.memo(Component)
