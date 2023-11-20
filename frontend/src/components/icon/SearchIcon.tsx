import * as React from 'react'
import { SVGAttributes } from 'react'

const SearchIcon = React.memo(
  ({
    size = 24,
    color = '#D0FD3E',
    ...props
  }: SVGAttributes<SVGElement> & {
    size?: number
  }) => {
    return (
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none" {...props}>
        <circle cx="11.0586" cy="11.0586" r="7.06194" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M20.0033 20.0033L16.0517 16.0517" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }
)

SearchIcon.displayName = 'SearchIcon';

export default SearchIcon;