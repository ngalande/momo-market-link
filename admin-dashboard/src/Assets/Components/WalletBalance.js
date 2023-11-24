import React, {useState, useEffect} from 'react'


const WalletBalance = () => {

  const [balance, setBalance] = useState(0);

  useEffect(()=>{
    fetch('https://mml-backend.vercel.app/getbalance')
    .then(response => response.json())
    .then(data => {
      // Set the total number of answers as totalResponses
      setBalance(data.data);
    })
    .catch(error => {
      console.error("There was an error fetching the answers:", error);
    });
  }, []);

  return (
    <div className="bg-gradient-to-r from-yellow-700 to-yellow-300 mb-2 rounded-lg shadow-lg p-6 py-20 text-white md:w-5/6 sm:w-5/6">
        <p className="text-sm ">Wallet Balance</p>
        <h3 className="text-3xl font-bold">ZMW {balance}</h3>
    </div>

  )
}

export default WalletBalance