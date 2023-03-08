import React, { useState, useEffect } from "react";
// import { Doughnut } from "react-chartjs-2";
import useAuth from "../../hooks/useAuth";
import {
  CategoryScale,
  Chart,
  BarElement,
  LinearScale,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { categorizeByMonth } from "./calculations";

Chart.register(
  CategoryScale,
  BarElement,
  LinearScale,
  // Tooltip,
  // Legend,
  ArcElement
);

const FBarChart = () => {
  const { fuelLogs } = useAuth();
  const sumOfEachMonth = categorizeByMonth(fuelLogs).slice(0, 3).reverse();

  const [barData, setBarData] = useState(null);

  useEffect(() => {
    if (!fuelLogs) {
      return;
    } else if (!sumOfEachMonth) {
      return;
    } else {
      setBarData({
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
    }
  }, [fuelLogs]);

  return (
    <div className="h-96">
      {barData ? (
        <Bar
          data={barData}
          //   height={200}
          options={{
            maintainAspectRatio: false,
            plugins: {
              title: {
                display: true,
                text: "Amount of Litres",
              },
            },
          }}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default FBarChart;
