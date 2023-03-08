import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";

// chart js setup
// import Chart from "chart.js/auto";
import { CategoryScale, Chart } from "chart.js";
import { BarElement, LinearScale, Tooltip, Legend } from "chart.js";
import { Doughnut, Bar } from "react-chartjs-2";

Chart.register(CategoryScale, BarElement, LinearScale, Tooltip, Legend);

// import my calculation stuff
import { categorizeByMonth } from "../components/charts/calculations";

const Charts = () => {
  const { fuelLogs, serviceLogs } = useAuth();

  // First get the list of fuel logs
  // Filter them by their location as categories i.e. fuelLogs.location
  // Then from the locations, sum up the total price and total litres
  // Data manipulation
  // { location: "Shell", summed_price: 100, summed_litres: 20}
  const fuelChartData = Object.values(
    fuelLogs.reduce((acc, log) => {
      const { location, fuel_amount, price } = log;
      if (!acc[location]) {
        acc[location] = {
          summed_price: 0,
          summed_litres: 0,
          location: location,
        };
      }
      acc[location].summed_price += parseFloat(price);
      acc[location].summed_litres += parseFloat(fuel_amount);
      return acc;
    }, {})
  );

  // BAR CHART STUFFS LESGOOOOO
  // categorize the data by month, then we want to slice to the last 3 months, and then reverse order
  const sumOfEachMonth = categorizeByMonth(fuelLogs).slice(0, 3).reverse();
  console.log("sumOfEachMonth", sumOfEachMonth);
  // const [barData, setBarData] = useState({});
  // barchart is for monthly expenses
  const [barData, setBarData] = useState({
    labels: sumOfEachMonth.map((month) => month.key), // should be the months i.e. '2023-1' logs.datetime ... dont't forget need to add 1 to the month
    datasets: [
      {
        label: "Amount Spent", // amount spent
        data: sumOfEachMonth.map((month) => month.price), // logs.map((log) => log.price)))
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "black",
        borderWidth: 1,
      },
      {
        label: "Volume of Fuel",
        data: sumOfEachMonth.map((month) => month.fuel_amount), // logs.map((log) => log.fuel_amount)
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "black",
        borderWidth: 1,
      },
    ],
  });

  const barOptions = {};

  // const [chartData, setChartData] = useState({
  //   labels: fuelChartData.map((data) => data.location), // these are the categories. for fuel, this should be location
  //   datasets: [
  //     {
  //       label: "Location name",
  //       data: fuelChartData.map((data) => data.summed_price),
  //       backgroundColor: [
  //         "rgba(255, 99, 132, 0.2)",
  //         "rgba(54, 162, 235, 0.2)",
  //         "rgba(255, 206, 86, 0.2)",
  //         "rgba(75, 192, 192, 0.2)",
  //         "rgba(153, 102, 255, 0.2)",
  //         "rgba(255, 159, 64, 0.2)",
  //       ],
  //       borderColor: [
  //         "rgba(255, 99, 132, 1)",
  //         "rgba(54, 162, 235, 1)",
  //         "rgba(255, 206, 86, 1)",
  //         "rgba(75, 192, 192, 1)",
  //         "rgba(153, 102, 255, 1)",
  //         "rgba(255, 159, 64, 1)",
  //       ],
  //       borderWidth: 2,
  //     },
  //   ],
  // });

  return (
    <div className="mt-24">
      <div className="">
        <div className="text-center">FUEL CHARTS HERE</div>
      </div>

      {/* BAR CHART TESTING */}
      <div className="">
        <Bar data={barData} />
      </div>
    </div>
  );
};

export default Charts;
