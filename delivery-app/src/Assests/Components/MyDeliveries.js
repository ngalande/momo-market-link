import { Fragment, useState, useEffect } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

const statuses = {
  'Completed': 'text-green-700 bg-green-50 ring-green-600/20',
  'Pending_Delivery': 'text-gray-600 bg-gray-50 ring-gray-500/10',
  // 'Pending_Delivery': 'text-yellow-800 bg-yellow-50 ring-yellow-600/20',
}






const url = "https://mml-backend.vercel.app/getalldeliverertransactions?uid=TMyDRF9jAAlkWUmYLSSvQ9B6WGEa2pg9"
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

//CUSTOM DELIVERY DUE DATE FUNCTION
function addDaysToDate(inputDate, days) {
  // Convert the input date string to a JavaScript Date object
  const currentDate = new Date(inputDate);

  // Calculate the new date by adding the specified number of days
  currentDate.setDate(currentDate.getDate() + days);

  // Format the new date as a string (YYYY-MM-DD HH:mm:ss)
  const newDate = currentDate.toISOString().slice(0, 19).replace("T", " ");

  return newDate;
}


// Example usage:
const inputDate = "2023-11-29 11:25:20";
const daysToAdd = 5;
const newDate = addDaysToDate(inputDate, daysToAdd);

console.log("Days function()",newDate);

export default function MyDeliveries() {

  const [transactions, setTransactions] = useState([]);
  const navigate = useNavigate();

  useEffect(()=>{
    axios.get(url)
    .then((data)=>{
      console.log(data.data)
      setTransactions(data.data.data )
      console.log("Transactions: ",transactions)
    })
    .catch((error)=>{
      console.log("Error when fetching deliveries:",error)
    })


  }, [])

  const onFinish = (transaction) => {
    console.log('first')
    // navigate('/finish')
    {<Link to={`/finish/${transaction.referenceId}`} />}
  }

  return (
    <div> 
      <div className='font-extrabold text-2xl'>
        My Deliveries
      </div>

    <ul role="list" className="divide-y divide-gray-100">
      {transactions.map((transaction) => (
        <li key={transaction.referenceId} className="flex items-center justify-between gap-x-6 py-5">
          <div className="min-w-0">
            <div className="flex items-start gap-x-3">
              <p className="text-sm font-semibold leading-6 text-gray-900">
                {/* {transaction.name} */}
                Bleckson The Great
                </p>
              <p
                className={classNames(
                  statuses[transaction.status],
                  'rounded-md whitespace-nowrap mt-0.5 px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset'
                )}
              >
                {transaction.status}
              </p>
            </div>
            <div className="mt-1  items-center gap-x-2 text-xs leading-5 text-gray-500">
              <p className="whitespace-nowrap">
                Due on <time dateTime={transaction.dueDateTime}>{transaction.createdAt}</time>
              </p>
             
              <p className="truncate">Address: {transaction.location}</p>
              
              <p className="truncate">Contact: {transaction.buyerPhone}</p>
            </div>
          </div>
          <div className="flex flex-none items-center gap-x-4">
            <Link
              to={`/finish/${transaction.referenceId}`}
              // onClick={() => onFinish(transaction)}
              className="bg-gradient-to-r from-yellow-300 to-yellow-700 rounded-md font-bold text-white px-2.5 py-1.5 text-sm text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:block"
            >
              Finish Delivery
            </Link>
          
          </div>
        </li>
      ))}
    </ul>
    </div>
  )
}
