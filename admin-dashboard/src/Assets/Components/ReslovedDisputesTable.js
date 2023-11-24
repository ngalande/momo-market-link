import React, { useState } from 'react';

const DisputeData = [
  { id: '1', resolvedBy: 'Kunda Ma Computer', inFavorOf: 'Buyer', transactionID: '12', justification: 'Seller was wrong', date: '2023-01-01' },
  { id: '2', resolvedBy: 'Nate Phiri', inFavorOf: 'Seller', transactionID: '12', justification: 'Seller was Right', date: '2023-01-01' },
  { id: '3', resolvedBy: 'Samuel Samido', inFavorOf: 'Buyer', transactionID: '12', justification: 'Seller was being a bum', date: '2023-01-01' },
  { id: '4', resolvedBy: 'Blessings Chisenga', inFavorOf: 'Buyer', transactionID: '12', justification: 'Crush on the buyer', date: '2023-01-01' },
  { id: '5', resolvedBy: 'Faith the GOAT', inFavorOf: 'Seller', transactionID: '12', justification: 'Because why note', date: '2023-01-01' },
  { id: '6', resolvedBy: 'Nate Phiri', inFavorOf: 'Buyer', transactionID: '12', justification: 'Seller was wrong', date: '2023-01-01' },
  { id: '7', resolvedBy: 'Faith the GOAT', inFavorOf: 'Buyer', transactionID: '12', justification: 'Seller was wrong', date: '2023-01-01' },
  { id: '8', resolvedBy: 'Nate Phiri', inFavorOf: 'Buyer', transactionID: '12', justification: 'Seller was wrong', date: '2023-01-01' },

];

const ReslovedDisputesTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('recent');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const transactionStatuses = [
    'Completed',
    'Awaiting Confirmation',
    'Awaiting Delivery',
    'Cancelled',
    'Pending Payment',
    'Refunded',
  ];

  const filteredTransactions = DisputeData.filter((transaction) =>
    transaction.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedTransactions = filteredTransactions.sort((a, b) => {
    if (sortBy === 'recent') {
      return new Date(b.date) - new Date(a.date);
    } else {
      return a.status.localeCompare(b.status);
    }
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedTransactions.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      {/* Search bar */}
      <input
        type="text"
        className='p-2 rounded-md '
        placeholder="Search by Dispute ID"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Sort by section */}
      <select onChange={(e) => setSortBy(e.target.value)} className='ml-6 p-2 rounded-md'>
        <option value="recent" >Sort by Recent</option>
        {transactionStatuses.map((status) => (
          <option key={status} value={status} >
            Sort by {status}
          </option>
        ))}
      </select>

      {/* Table */}
      <table className="min-w-full divide-y divide-gray-300">
        <thead>
          <tr className=''>
            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
              Dispute ID
            </th>
            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              Resolved By
            </th>
            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              In Favor of
            </th>
            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              Transaction ID
            </th>
            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              Justification
            </th>
            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              Date
            </th>
            
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 rounded-md bg-white">
          {currentItems.map((dispute) => (
            <tr key={dispute.id}>
              <td className="whitespace-nowrap px-3 py-5 text-sm ">{dispute.id}</td>
              <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">{dispute.resolvedBy}</td>
              <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">{dispute.inFavorOf}</td>
              <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">{dispute.transactionID}</td>
              <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">{dispute.justification}</td>
              <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">{dispute.date}</td>
              
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        {Array.from({ length: Math.ceil(sortedTransactions.length / itemsPerPage) }).map((_, index) => (
          <button
            key={index}
            onClick={() => paginate(index + 1)}
            className={`mx-1 px-3 py-1 bg-gray-200 text-gray-800 focus:outline-none ${
              currentPage === index + 1 ? 'bg-indigo-500 text-white' : ''
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ReslovedDisputesTable;
