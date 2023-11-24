import React from "react";
import { Line } from "react-chartjs-2";

import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  PointElement,
  LineController,
  LineElement,
} from "chart.js";

ChartJS.register(
  LinearScale,
  CategoryScale,
  PointElement,
  LineController,
  LineElement
);

const AllDisputesLineGraph = () => {
  // Chart data
  const chartData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Data",
        data: [12, 19, 3, 5, 2, 3],
        fill: false,
        borderColor: "orange",
      },
    ],
  };

  return (
    <div className="w-full h-64 bg-white p-4 py-4 rounded-md">
       
      <Line
        data={chartData}
        // height={300}
        // width={400}
        options={{
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        }}
      />
    </div>
  );
};

export default AllDisputesLineGraph;
