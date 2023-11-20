import React from "react"
import { useState } from "react"
import cn from "classnames"

interface InputProps
  extends React.PropsWithoutRef<JSX.IntrinsicElements["input"]> {
  fullBorder?: boolean
  xs?: "sm" | "md" | "lg"
  icon?: JSX.Element | null
  position?: string
}


const Input: React.FC<InputProps> = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, icon, fullBorder = false, xs = "lg", position, ...props },
    ref
  ) => {
    const [hasFocus, setHasFocus] = useState(false)

    return (
      <div
        className={cn(
          "flex items-center form-container relative bg-additional rounded-tl-2xl",
          xs === "lg" ? "py-4 px-8" : "",
          xs === "md" ? "py-3 px-6" : "",
          xs === "sm" ? "py-2 px-4" : "",
          hasFocus ? "active" : "",
          fullBorder ? "full-border" : "",
          className ? className : ""
        )}
      >
        {position === "start" && <div className="mr-3">{icon}</div>}
        <input
          {...props}
          className={cn(
            "bg-transparent text-black-secondary relative outline-none text-sm w-full"
          )}
          onFocus={() => {
            setHasFocus(true)
          }}
          onBlur={() => {
            setHasFocus(false)
          }}
          ref={ref}
          autoComplete="off"
        />
        {position === "end" && (
          <div className="flex items-center mr-2 ">{icon}</div>
        )}
      </div>
    )
  }
)

Input.displayName = "Input"

export default Input
