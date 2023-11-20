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
          "flex items-center form-container relative bg-black-secondary rounded-tl-2xl",
          hasFocus ? "active" : "",
          fullBorder ? "full-border bg-transparent" : "",
          className ? className : ""
        )}
      >
        {position === "start" && <div className="ml-2">{icon}</div>}
        <input
          {...props}
          className={cn(
            "bg-transparent text-white relative outline-none text-sm w-full",
            xs === "lg" ? "py-1 px-2" : "",
            xs === "md" ? "py-0.75 px-1.5" : "",
            xs === "sm" ? "py-0.5 px-1" : ""
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
