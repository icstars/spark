import React from "react";

import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    plugins,
    scales
  } from "chart.js";

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement
  );

const data = {
  labels: ["1", "2", "3", "4", "5", "6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22"],
  datasets: [
    {
      label: "First dataset",
      data: [0, 2, 3, 4, 0, 2, 3, 4, 0, 2, 3, 4, 0, 2, 3, 4, 0, 2, 3, 4, 1, 2],
      fill: true,
      backgroundColor: "rgba(47,124,250,1)",
      borderColor: "rgba(75,192,192,1)"
    }
  ]
};

const options = {
    plugins:{
        legend: true
    },
    scales:{
        y:{
            min: 0,
            max: 4
        }
    }
}

export default function LineChart() {
  return (
    <div className="LineChart">
      <Line data={data} />
    </div>
  );
}