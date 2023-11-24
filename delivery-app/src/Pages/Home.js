import React from 'react'
import MyDeliveries from '../Assests/Components/MyDeliveries'
import HelloUser from '../Assests/Components/HelloUser'


const Home = () => {
  return (
    <div >
        
        <HelloUser/>

        <div className='p-6'>
            <MyDeliveries />   
        </div>
        

    </div>
  )
}

export default Home