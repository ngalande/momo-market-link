import React from 'react'
import { Link } from 'react-router-dom'
import {BsArrowLeft} from 'react-icons/bs'

const BackButton = ( {destination='/home'} ) => {
  return (
    <div className='flex'>
        <Link to={destination} className='bg-blue-950 text-white flex px-4 py-1 rounded-lg w-fit'>
            <BsArrowLeft className='text-2xl mr-2' />
            Back
        </Link>
    </div>
  )
}

export default BackButton
