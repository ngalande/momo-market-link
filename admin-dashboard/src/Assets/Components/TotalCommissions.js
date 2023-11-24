import React, {useState, useEffect} from 'react'

const TotalCommissions = () => {

    const [commission, setCommission] = useState(0);

    useEffect(()=>{
        fetch('https://mml-backend.vercel.app/getcommission')
        .then(response => response.json())
        .then(data => {
          // Set the total number of answers as totalResponses
          setCommission(data.message);
        })
        .catch(error => {
          console.error("There was an error fetching the answers:", error);
        });

    }, [])

  return (
    <div className="bg-gradient-to-r from-blue-950 to-blue-950 mb-2 rounded-lg shadow-lg p-6 py-20 mx-8 text-white md:w-5/6 sm:w-5/6">
    <p className="text-sm ">Total Commissions</p>
    <h3 className="text-3xl font-bold">ZMW {commission}</h3>
</div>

  )
}

export default TotalCommissions