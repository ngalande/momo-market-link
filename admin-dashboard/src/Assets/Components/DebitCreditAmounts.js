import React, {useState, useEffect} from 'react'
import {CurrencyDollarIcon} from '@heroicons/react/20/solid'


const DebitCreditAmounts = () => {

    const [creditedAmount, setCreditedAmount] =useState(0);
    const [debitedAmount, setDebitedAmount] =useState(0);

    useEffect(()=>{
        fetch('https://mml-backend.vercel.app/getcreditedamounts')
        .then(response => response.json())
        .then(data => {
          // Set the total number of answers as totalResponses
          setCreditedAmount(data.message);
        })
        .catch(error => {
          console.error("There was an error fetching the answers:", error);
        });

        fetch('https://mml-backend.vercel.app/getdebitedamounts')
        .then(response => response.json())
        .then(data => {
          // Set the total number of answers as totalResponses
          setDebitedAmount(data.message);
        })
        .catch(error => {
          console.error("There was an error fetching the answers:", error);
        });
    }, [])


  return (
    <div>

    <div class="flex flex-row grid grid-cols-1 sm:grid-cols-2 sm:w-full lg:w-full my-4 ">   
        <div className='bg-white flex flex-row shadow-md rounded-lg p-4 mr-2'>
            <div className='flex flex-col'>
                <p>Debit</p>
                <p className='font-semibold text-green-600'>+ ZMW {debitedAmount}</p>
            </div>
            <CurrencyDollarIcon className='text-blue-600 h-6 w-6 shrink-0'/>
        </div>
        <div className='bg-white flex flex-row shadow-md   rounded-lg p-4 ml-2'>
            <div className='flex flex-col'>
                <p>Credit</p>
                <p className='font-semibold text-red-600'>- ZMW {creditedAmount}</p>
            </div>
            <CurrencyDollarIcon className='text-blue-600 h-6 w-6 shrink-0'/>
        </div>
    </div>
    
    
    </div>
  )
}

export default DebitCreditAmounts