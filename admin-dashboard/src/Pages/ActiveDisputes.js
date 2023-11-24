import React from "react"
import SideNav from "../Assets/Components/SideNav"
const people = [
    { id: '24536', transcationID: '345', raisedBy: 'Buyer', reason: 'Defeactive Product', date: '2023-01-01' },
    { id: '24546', transcationID: '344', raisedBy: 'Seller', reason: 'Refuse to confrim delivery', date: '2023-01-01' },
    { id: '24526', transcationID: '346', raisedBy: 'Buyer', reason: 'Defeactive Product', date: '2023-01-01' },
    { id: '24566', transcationID: '334', raisedBy: 'Buyer', reason: 'Defeactive Product', date: '2023-01-01' },
    { id: '24736', transcationID: '398', raisedBy: 'Seller', reason: 'Just because', date: '2023-01-01' },
    { id: '24236', transcationID: '367', raisedBy: 'Buyer', reason: 'Defeactive Product', date: '2023-01-01' },
    { id: '24786', transcationID: '365', raisedBy: 'Buyer', reason: 'Defeactive Product', date: '2023-01-01' },
    { id: '23436', transcationID: '343', raisedBy: 'Buyer', reason: 'Defeactive Product', date: '2023-01-01' },    
  ]
  
  export default function ActiveDisputes() {
    return (
    <SideNav>    
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">Disputes</h1>
            <p className="mt-2 text-sm text-gray-700">
              A list of all the active dispures in your account including their name, title, email and role.
            </p>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <button
              type="button"
              className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              See Resolved Disputes
            </button>
          </div>
        </div>
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                        Dispute ID
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Transaction ID
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Raised By
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Reason 
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Date 
                      </th>
                      <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                        <span className="sr-only">Resolve</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {people.map((person) => (
                      <tr key={person.email}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          {person.id}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.transcationID}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.raisedBy}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.reason}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.date}</td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <a href="/resolvedispute/id" className="text-indigo-600 hover:text-indigo-900">
                            Resolve<span className="sr-only">, {person.name}</span>
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SideNav>
    )
  }
  