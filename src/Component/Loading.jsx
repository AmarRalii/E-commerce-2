import React from 'react'
import {ThreeDots} from 'react-loader-spinner'
export default function Loading() {
  return <div className='loading'>
  <ThreeDots
    visible={true}
    height="80"
    width="80"
    color="#4fa94d"
    radius="9"
    ariaLabel="three-dots-loading"
    wrapperStyle={{}}
    wrapperClass=""
    />
   </div>
}

