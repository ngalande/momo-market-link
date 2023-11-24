import React, {useState, useEffect} from 'react';

function TransactionStatsCard() {
  const [totalActiveTranscations, setTotalActiveTranscations] = useState(0);
  const [totalMerchants, setTotalMerchants] = useState(0);
  const [mostTransactions, setMostTransactions] = useState('');


  useEffect(() => {
    // Fetch the data from the endpoint when the component mounts
    fetch('https://mml-backend.vercel.app/getactivetransactions')
      .then(response => response.json())
      .then(data => {
        // Set the total number of answers as totalResponses
        setTotalActiveTranscations(data.data.length);
      })
      .catch(error => {
        console.error("There was an error fetching the answers:", error);
      });

      fetch('https://mml-backend.vercel.app/getallsellers')
      .then(response => response.json())
      .then(data => {
        // Set the total number of answers as totalResponses
        setTotalMerchants(data.data.length);
      })
      .catch(error => {
        console.error("There was an error fetching the answers:", error);
      });

      fetch('https://mml-backend.vercel.app/getfrequentlocation')
      .then(response => response.json())
      .then(data => {
        // Set the total number of answers as totalResponses
        setMostTransactions(data.message);
      })
      .catch(error => {
        console.error("There was an error fetching the answers:", error);
      });

  }, []); 

  const stats = [
    { name: 'Total Active Transactions', stat: totalActiveTranscations },
    { name: 'Total Merchants', stat: totalMerchants },
    { name: 'Most trasactions', stat: mostTransactions},  
  ];

  return (
    <div className="p-6">
      <h3 className="text-base font-semibold leading-6 text-gray-900">
        Last 30 days
      </h3>
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
        {stats.map((item) => (
          <div
            key={item.name}
            className="overflow-hidden rounded-lg bg-gradient-to-r from-blue-950 to-blue-300 px-4 py-5 shadow-md sm:p-6"
          >
            <dt className="truncate text-sm font-medium text-white">
              {item.name}
            </dt>
            <dd className="mt-1 text-3xl font-semibold tracking-tight text-white">
              {item.stat}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export default TransactionStatsCard;
