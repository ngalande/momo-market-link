import React from 'react';
import { Link } from 'react-router-dom';

function ActiveResolvedDisputes() {
//   const [totalResponses, setTotalResponses] = useState(0);
//   const [averageAge, setAverageAge] = useState(0);

//   useEffect(() => {
//     // Fetch the data from the endpoint when the component mounts
//     fetch('http://localhost:4000/answers')
//       .then(response => response.json())
//       .then(data => {
//         // Set the total number of answers as totalResponses
//         setTotalResponses(data.length);
//       })
//       .catch(error => {
//         console.error("There was an error fetching the answers:", error);
//       });

//     // Fetch the data from the users endpoint to calculate average age
//     fetch('http://localhost:4000/users')
//       .then(response => response.json())
//       .then(data => {
//         // Calculate the average age from the user data
//         const ages = data.filter(user => user.role === 'respondent').map(user => parseInt(user.age, 10));
//         const totalAge = ages.reduce((total, age) => total + age, 0);
//         const average = totalAge / ages.length;
//         setAverageAge(average.toFixed(2)); // Set the average age with two decimal places
//       })
//       .catch(error => {
//         console.error("There was an error fetching the users:", error);
//       });
//   }, []);  // The empty dependency array ensures this useEffect runs once when the component mounts

  const stats = [
    { name: 'Resolve Active Disputes', stat: 12, url: '/activedisputes' },
    { name: 'See Resolved Disputes', stat: 34, url: '/resolveddisputes'},
  ];

  return (
    <div className="mb-4">
      {/* <h3 className="text-base font-semibold leading-6 text-gray-900">
        Last 30 days
      </h3> */}
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
        {stats.map((item) => (
        <Link to={item.url} className=''>
          <div
            key={item.name}
            className="overflow-hidden hover:from-green-900 hover:to-green-400 rounded-lg bg-gradient-to-r from-blue-900 to-blue-300 px-4 py-5 shadow-md sm:p-6"
          >
            <dt className="truncate text-sm font-medium text-white">
              {item.name}
            </dt>
            <dd className="mt-1 text-3xl font-semibold tracking-tight text-white">
              {item.stat}
            </dd>
          </div>
        </Link>
        ))}
      </dl>
    </div>
  );
}

export default ActiveResolvedDisputes;
