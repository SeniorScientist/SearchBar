import { themeColor, themeVariant } from "@/styles/theme"
import { tagType } from "./types"
import React from "react"
import cn from "classnames"

interface Props {
  children: React.ReactNode
  className?: string
  color?: themeColor
  bold?: boolean
  tag?: tagType
  variant?: themeVariant
  inline?: boolean
  noWrap?: boolean
  uppercase?: boolean
  align?: 'inherit' | 'left' | 'right' | 'center'
}

const Component: React.FC<Props> = ({
  children,
  className,
  tag = 'div',
  color = 'inherit',
  variant = 'h6',
  inline = false,
  noWrap = false,
  uppercase = false,
  bold = false,
  align = 'inherit'
}) => {

  const Component = tag
  const classNames = [
    `text-${color}`,
    `text-${align}`
  ]

  if (bold) {
    classNames.push('font-bold')
  } else {
    classNames.push('font-medium')
  }

  if (uppercase) {
    classNames.push('uppercase')
  }

  if (inline) {
    classNames.push('inline')
  }

  if (noWrap) {
    classNames.push('whitespace-nowrap')
  }

  switch (variant) {
    case 'h1':
      classNames.push('text-2xl')
      classNames.push('leading-34')
      classNames.push('tracking-wider')
      break
    case 'h6':
      classNames.push('text-base')
      classNames.push('tracking-wide')
      classNames.push('leading-normal')
      break
  }

  return <Component className={cn(classNames, className)}>{children}</Component>
}

export const Text = React.memo(Component)