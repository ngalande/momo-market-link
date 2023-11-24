import React from 'react'
import SideNav from '../Assets/Components/SideNav'
import ActiveResolvedDisputes from '../Assets/Components/ActiveResolvedDisputes'
import AllDisputesLineGraph from '../Assets/Components/AllDisputesLineGraph'

const Dispute = () => {
  return (
    <SideNav>
        <div>Dispute</div>
        <div><ActiveResolvedDisputes/></div>
        <div className=''>
          <h3 className="text-base font-semibold leading-6 text-gray-900">
            Overview
          </h3>
          <AllDisputesLineGraph/>
        </div>
    </SideNav>
  )
}

export default Dispute