import LoaderDots from "../loader-dots";
import { CommonProps } from "./types";

export const DefaultContentRender: React.FC<CommonProps<any>> = ({ before, children, after, loading }) => {
  return (
    <div className='grid grid-flow-col gap-10 items-center font-secondary font-bold text-lg whitespace-nowrap overflow-ellipsis'>
      {before && before}
      {children}
      {after && after}
      {loading && (
        <div className='absolute flex justify-center items-center w-full h-full font-secondary font-bold text-lg left-0 right-0 rounded-10'>
          {/* <LoaderDots color='gray-light' /> */}
        </div>
      )}
    </div>
  )
}