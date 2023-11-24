import React from 'react'
import SideNav from '../Assets/Components/SideNav'
import CompaniesCard from '../Assets/Components/CompaniesCard'
import DeliveriesGrid from '../Assets/Components/DeliveriesGrid'
import DeliveriesPiechart from '../Assets/Components/DeliveriesPiechart'


const Delivery = () => {
  return (
    <SideNav>
        <div>Delivery</div>
        <div>
          <DeliveriesGrid/>
          <div className='h-80 bg-white p-2 mt-4 rounded-md'>
            <DeliveriesPiechart/>
          </div>
          {/* <CompaniesCard/> */}
        </div>
    </SideNav>
  )
}

export default Delivery