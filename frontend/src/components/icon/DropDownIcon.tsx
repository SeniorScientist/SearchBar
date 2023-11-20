import * as React from 'react'
import { SVGAttributes } from 'react'

const DropDownIcon = React.memo(
  ({
    size = 24,
    color = '#D0FD3E',
    ...props
  }: SVGAttributes<SVGElement> & {
    size?: number
  }) => {
    return (
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill = "none" {...props}>
        <path d="M8 10L12 14L16 10" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg >
    )
  }
)

DropDownIcon.displayName = 'DropDownIcon';

export default DropDownIcon;