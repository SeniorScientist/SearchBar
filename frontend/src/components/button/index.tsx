import { themeColor, themeSize } from "@/styles/theme"
import React from "react"
import cn from "classnames"
import LoaderDots from "../loader-dots"
import { Text } from "../text"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string
  width?: 'fit-parent' | 'fit-content'
  isLoading?: boolean
  icon?: JSX.Element | null
  iconPosition?: 'start' | 'end'
  size?: themeSize
  color?: themeColor
}

const Component: React.FC<ButtonProps> = ({
  color = 'accent',
  text,
  width = 'fit-content',
  className,
  isLoading = false,
  icon,
  iconPosition = 'start',
  disabled,
  size = 'medium',
  ...props
}) => {
  const widthClass = width === 'fit-content' ? 'w-fit' : 'w-full'
  const iconElem = (
    <span
      className={cn(
        isLoading ? 'spinner' : '',
        text ? (iconPosition === 'start' ? 'mr-2' : 'ml-2') : ''
      )}
    >
      {isLoading ? <LoaderDots color={"white"} length={0} /> : icon}
    </span>
  )

  const sizeClass = cn(
    size === 'small' ? 'px-2.5 py-1.5 rounded-xl text-sm' : '',
    size === 'medium' ? 'px-[50px] py-4 rounded-br-2xl rounded-tl-2xl' : '',
    size === 'large' ? 'px-2.5 py-3 rounded-xl' : '',
  )

  const backgroundClass = cn(`text-white bg-${color} active:bg-${color} disabled:bg-gray-500 disabled:text-gray-100`)

  return (
    <button
      {...props}
      className={cn(
        'flex items-center justify-center font-semibold h-fit cursor-pointer transition-all duration-100 outline-none break-keep',
        widthClass,
        sizeClass,
        backgroundClass,
        className ? className : ''
      )}
    >
      {iconPosition === 'start' && icon && iconElem}
      {isLoading && !icon && (
        <div className="mr-2 spinner">
          {/* <Spinner /> */}
        </div>
      )}
      <Text color='white'>{text}</Text>
      {iconPosition === 'end' && icon && iconElem}
    </button>
  )
}

export const Button = React.memo(Component)
