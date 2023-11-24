import React from 'react'
import SideNav from '../Assets/Components/SideNav'
import WalletBalance from '../Assets/Components/WalletBalance'
import DebitCreditAmounts from '../Assets/Components/DebitCreditAmounts'
import CompaniesCard from '../Assets/Components/CompaniesCard'
import TotalCommissions from '../Assets/Components/TotalCommissions'

const Wallet = () => {
  return (
    <SideNav>
      <div>
        <div className='flex'>
          <div className='w-1/2'>
            <div><WalletBalance/></div>
            <div><DebitCreditAmounts/></div>
          </div>
          <div className='w-1/2'>
            <TotalCommissions/>
          </div>
          
        </div>

        <div>
            <CompaniesCard/>
        </div>
      </div>
    </SideNav>
  )
}

export default Wallet