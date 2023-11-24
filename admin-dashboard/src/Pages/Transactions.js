import React from 'react'
import SideNav from '../Assets/Components/SideNav'
import TransactionTable from '../Assets/Components/TransactionTable'

const Trasnsactions = () => {
  return (
    <SideNav>
        <div>

          <div className=' font-bold pb-4 text-lg'>Transactions</div>
          <div><TransactionTable/></div>
          

        </div>
    </SideNav>
  )
}

export default Trasnsactions