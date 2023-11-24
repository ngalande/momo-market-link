import React from 'react'
import SideNav from '../Assets/Components/SideNav'
import TransactionStatsCard from '../Assets/Components/TransactionStatsCard'
import LineGraph from '../Assets/Components/LineGraph'
import BarChart from '../Assets/Components/BarChart'

const Dashboard = () => {
  return (
    <SideNav>
      <div className=''>  
        <div>Hello Nate!</div>
        <TransactionStatsCard />

        <div class="flex flex-row p-6  grid grid-cols-1 gap-5 sm:grid-cols-2 space-x-2 sm:space-x-4 md:space-x-6 lg:space-x-8 xl:space-x-12">

          <div class="flex flex-col">
            <h3  className="text-base font-semibold leading-6 text-gray-900">New Users</h3>
            
            <div class="text-gray-700 shadow-md rounded-lg text-center bg-white px-4 py-2 mt-4"><LineGraph/></div>          
          </div>
          <div class="flex flex-col ">
            <h3 className="text-base font-semibold leading-6 text-gray-900">Total transactions</h3>
            <div class="text-gray-700 shadow-md rounded-lg text-center bg-white px-4 py-2 mt-4"><BarChart/></div>
          </div>

        </div>
      </div>
    </SideNav>
  )
}

export default Dashboard