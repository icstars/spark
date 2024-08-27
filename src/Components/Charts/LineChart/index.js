import React from "react";
// Import the Line component from react-chartjs-2, which is used to create line charts
import { Line } from "react-chartjs-2";

// Import necessary modules from chart.js to create and configure the chart
import {
  Chart as ChartJS,       // Core chart module
  CategoryScale,          // x-axis scale for categorical data
  LinearScale,            // y-axis scale for numerical data
  PointElement,           // Points on the line chart
  LineElement             // Line element connecting the points
} from "chart.js";

// Register the imported chart components with ChartJS
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
);

// Define the data for the LineChart
const data = {
  // Labels for the x-axis
  labels: ["1", "2", "3", "4", "5", "6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22"],
  
  // Data sets to be plotted on the chart
  datasets: [
    {
      label: "First dataset",  // Label for the dataset
      data: [0, 2, 3, 4, 0, 2, 3, 4, 0, 2, 3, 4, 0, 2, 3, 4, 0, 2, 3, 4, 1, 2],  // Data points for the line chart
      fill: true,  // Fill the area under the line
      backgroundColor: "rgba(47,124,250,1)",  // Background color of the filled area
      borderColor: "rgba(75,192,192,1)"  // Color of the line
    }
  ]
};

// Functional component that renders the LineChart
export default function LineChart() {
  return (
    // The container div with a className for styling
    <div className="LineChart">
      {/* Render the Line component, passing the data as a prop */}
      <Line data={data} />
    </div>
  );
}
