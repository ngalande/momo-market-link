import React from 'react'
import Logo from '../Images/logomml.svg'

const HelloUser = () => {
  return (
    <div className='min-w-screen p-4 bg-sky-950 h-10 py-8 font-bold flex items-center justify-between text-white text-xl '>
        Hello Luke Ben!
        <img 
          src={Logo}
          className='h-20'
        />
    </div>
  )
}

export default HelloUser