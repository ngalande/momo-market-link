import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
// import axios from 'axios';

ChartJS.register(ArcElement, Tooltip, Legend);

const DeliveriesPiechart = () => {
//   const [genderData, setGenderData] = useState(null);

//   useEffect(() => {
//     axios.get('http://localhost:4000/users')
//       .then((response) => {
//         const data = response.data;

//         // count the genders
//         const genderCount = data.reduce((count, user) => {
//           const gender = user.gender.toLowerCase();
//           count[gender] = (count[gender] || 0) + 1;
//           return count;
//         }, {});

//         // Update the state with the new data
//              
//       })
//       .catch((error) => console.error('Error fetching users data:', error));
//   }, []);


const genderData = {
              labels: ["Successful", "In Progess", "Pending", "Unsuccessful"],
              datasets: [
                {
                  data:[4,6,3,2],
                  backgroundColor: [
                    "#0bda51",
                    "indigo",
                    "orange",
                    "red",
                  ],
                },
              ],
            };

//   if (!genderData) {
//     return <p>Loading...</p>;
 // }

  return (
    <Pie
      data={genderData}
      width={300}
      height={300}
      options={{ maintainAspectRatio: true }}
    />
  );
};

export default DeliveriesPiechart;