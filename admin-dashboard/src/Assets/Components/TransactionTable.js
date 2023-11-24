import React, { useState, useEffect } from "react";
import axios from "axios";

const transactionData = [
  {
    id: "1",
    buyer: "John Doe",
    seller: "Jane Doe",
    amount: "$100",
    date: "2023-01-01",
    status: "Completed",
  },
  {
    id: "2",
    buyer: "John Doe",
    seller: "Jane Doe",
    amount: "$100",
    date: "2023-01-01",
    status: "Awaiting Delivery",
  },
  {
    id: "3",
    buyer: "John Doe",
    seller: "Jane Doe",
    amount: "$100",
    date: "2023-01-01",
    status: "Awaiting Confirmation",
  },
  {
    id: "4",
    buyer: "John Doe",
    seller: "Jane Doe",
    amount: "$100",
    date: "2023-01-01",
    status: "Cancelled",
  },
  {
    id: "5",
    buyer: "John Doe",
    seller: "Jane Doe",
    amount: "$100",
    date: "2023-01-01",
    status: "Pending Payment",
  },
  {
    id: "6",
    buyer: "John Doe",
    seller: "Jane Doe",
    amount: "$100",
    date: "2023-01-01",
    status: "Refunded",
  },
  {
    id: "7",
    buyer: "John Doe",
    seller: "Jane Doe",
    amount: "$100",
    date: "2023-01-01",
    status: "Completed",
  },
  {
    id: "8",
    buyer: "John Doe",
    seller: "Jane Doe",
    amount: "$100",
    date: "2023-01-01",
    status: "Completed",
  },
  {
    id: "9",
    buyer: "John Doe",
    seller: "Jane Doe",
    amount: "$100",
    date: "2023-01-01",
    status: "Refunded",
  },
  {
    id: "10",
    buyer: "John Doe",
    seller: "Jane Doe",
    amount: "$100",
    date: "2023-01-01",
    status: "Completed",
  },
  {
    id: "11",
    buyer: "John Doe",
    seller: "Jane Doe",
    amount: "$100",
    date: "2023-01-01",
    status: "Awaiting Delivery",
  },
  {
    id: "12",
    buyer: "John Doe",
    seller: "Jane Doe",
    amount: "$100",
    date: "2023-01-01",
    status: "Completed",
  },
  {
    id: "13",
    buyer: "John Doe",
    seller: "Jane Doe",
    amount: "$100",
    date: "2023-01-01",
    status: "Completed",
  },
  {
    id: "14",
    buyer: "John Doe",
    seller: "Jane Doe",
    amount: "$100",
    date: "2023-01-01",
    status: "Completed",
  },
  // Add more transactions as needed
];

const TransactionsTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("recent");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [allTranscations, setAllTransactions] = useState([]);
  const [buyerName, setBuyerName] = useState("");
  const [sellerName, setSellerName] = useState("");
  const [buyerID, setBuyerID] = useState("");
  const [sellerID, setSellerID] = useState("");
  const [loading, setloading] = useState(false);

  const getalltransactions = async () => {
    try {
      setloading(true);
      const response = await axios.get(
        "https://mml-backend.vercel.app/getalltransactions"
      );
      if (response.status === 200) {
        setAllTransactions(response.data.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setloading(false);
    }
  };

  console.log(allTranscations);

  useEffect(() => {
    getalltransactions();
  }, []);

  const transactionStatuses = [
    "Completed",
    "Awaiting Confirmation",
    "Awaiting Delivery",
    "Cancelled",
    "Pending Payment",
    "Refunded",
  ];

  const filteredTransactions = allTranscations.filter((transaction) =>
    transaction.referenceId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedTransactions = filteredTransactions.sort((a, b) => {
    if (sortBy === "recent") {
      return new Date(b.date) - new Date(a.date);
    } else {
      return a.status.localeCompare(b.status);
    }
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedTransactions.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="">
      <div className="flex items-center gap-4">
        {/* Search bar */}
        <input
          type="text"
          placeholder="Search by Transaction ID"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className=" p-2 rounded-md focus:outline-none"
        />

        {/* Sort by section */}
        <select
          onChange={(e) => setSortBy(e.target.value)}
          className=" p-2 rounded-md "
        >
          <option value="recent">Sort by Recent</option>
          {transactionStatuses.map((status) => (
            <option key={status} value={status}>
              Sort by {status}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                        Transaction ID
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Buyer
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Seller
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Amount 
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Date 
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Status 
                      </th>
                      
                    </tr>
                  </thead>
                  {loading ? (
                    <div className=" w-full items-center justify-center flex">
                      <div className=" w-32 h-32 border-8 border-blue-500 animate-spin rounded-full border-t-white my-52"></div>
                    </div>
                  ) : (
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {currentItems.map((transaction, i) => (
                      <tr key={transaction.referenceId}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          {transaction.referenceId}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {/* {transaction.transcationID} */}
                          Buyer Zulu
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {/* {transaction.raisedBy} */}
                          Seller Bwalya
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{transaction.debitAmount}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{transaction.createdAt}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{transaction.status}</td>
                        
                      </tr>
                    ))}
                  </tbody>
                  )}
                </table>
              </div>
            </div>
          </div>
        </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        {Array.from({
          length: Math.ceil(sortedTransactions.length / itemsPerPage),
        }).map((_, index) => (
          <button
            key={index}
            onClick={() => paginate(index + 1)}
            className={`mx-1 px-3 py-1 bg-gray-200 text-gray-800 focus:outline-none ${
              currentPage === index + 1 ? "bg-indigo-500 text-white" : ""
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TransactionsTable;
