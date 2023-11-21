// import Image from 'next/image'
import { Text } from '@/components/text'
import '../styles/globals.css'
import { Fragment } from 'react'
import SearchBar from '@/components/search-bar'
import Image from 'next/image'

export default function Home() {
  return (
    <Fragment>
      <div className='relative w-full h-fit'>
        <Image src='/image/football_stadium.png' width="1440" height="193" className='absolute w-full' alt={'football stadium'} />
        <div className='flex flex-col gap-y-6 absolute w-full px-[100px] py-[42px]'>
          <Text color='white' variant='h1'>Book Your Dream Venue Today: Find, Reserve, and Play with Ease!</Text>
          <SearchBar />
        </div>
      </div>
    </Fragment>
  )
}
