import React, { ChangeEvent, MouseEvent, KeyboardEvent, useEffect } from "react"
import { useState } from "react"
import cn from "classnames"
import { useDebounce } from "usehooks-ts"
import { Text } from "../text"

interface InputProps
  extends React.PropsWithoutRef<JSX.IntrinsicElements["input"]> {
  fullBorder?: boolean
  xs?: "sm" | "md" | "lg"
  icon?: JSX.Element | null
  position?: string
  get_suggestions: (query: string) => void
  suggestions: string[]
}

const DEBOUNCE_TIMEOUT = 500

const AutoComplete: React.FC<InputProps> = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, icon, fullBorder = false, xs = "lg", position, suggestions, get_suggestions, ...props },
    ref
  ) => {
    const [hasFocus, setHasFocus] = useState<boolean>(false)
    const [active, setActive] = useState<number>(0)
    const [filtered, setFiltered] = useState<string[]>([])
    const [isShow, setIsShow] = useState<boolean>(false)
    const [input, setInput] = useState<string>("")
    const debouncedValue = useDebounce<string>(input, DEBOUNCE_TIMEOUT)

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
      setActive(0)
      setInput(e.currentTarget.value)
    }

    useEffect(() => {
      setFiltered(suggestions);
      setIsShow(true)
    }, [suggestions])

    // Fetch API (optional)
    useEffect(() => {
      // Do fetch here...
      // Triggers when "debouncedValue" changes
      get_suggestions(debouncedValue)
    }, [debouncedValue])

    const onClick = (e: MouseEvent<HTMLLIElement>) => {
      setActive(0)
      setFiltered([])
      setIsShow(false)
      setInput(e.currentTarget.innerText)
    }

    const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      switch (e.key) {
        case 'Enter':
          setActive(0)
          setIsShow(false)
          setInput(filtered[active])
          break
        case 'ArrowDown':
          return (active + 1 === filtered.length) ? null : setActive(active + 1)
        case 'ArrowUp':
          return (active === 0) ? null : setActive(active - 1)
      }
    }

    const renderAutocomplete = () => {
      if (isShow && input) {
        if (filtered.length) {
          return (
            <ul className="absolute left-0 right w-full overflow-y-auto bg-additional list-none rounded-br-2xl">
              {
                filtered.map((suggestion, index) => {
                  return (
                    <li className='px-16 py-3 active:cursor-pointer hover:cursor-pointer hover:bg-yellow' key={suggestion} onClick={onClick}>
                      <Text variant="h6" color={`${index === active ? 'white' : 'black-secondary'}`}>{suggestion}</Text>
                    </li>
                  )
                })
              }
            </ul>
          )
        }
      }
    }

    return (
      <div className={cn(className ? className : "", 'relative')}>
        <div
          className={cn(
            "flex items-center form-container relative bg-additional rounded-tl-2xl",
            xs === "lg" ? "py-4 px-8" : "",
            xs === "md" ? "py-3 px-6" : "",
            xs === "sm" ? "py-2 px-4" : "",
            hasFocus ? "active" : "",
            fullBorder ? "full-border" : ""
          )}
        >
          {position === "start" && <div className="mr-3">{icon}</div>}
          <input
            {...props}
            className={cn(
              "bg-transparent text-black-secondary relative outline-none text-sm w-full text-base tracking-wide leading-normal"
            )}
            onFocus={() => {
              setHasFocus(true)
            }}
            onBlur={() => {
              setHasFocus(false)
            }}
            value={input}
            onChange={onChange}
            onKeyDown={onKeyDown}
            ref={ref}
            autoComplete="off"
          />
          {position === "end" && (
            <div className="flex items-center mr-2 ">{icon}</div>
          )}
        </div>
        {renderAutocomplete()}
      </div>
    )
  }
)

AutoComplete.displayName = "AutoComplete"

export default AutoComplete
