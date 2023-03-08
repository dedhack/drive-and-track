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
import { Doughnut, Bar } from "react-chartjs-2";

Chart.register(
  CategoryScale,
  BarElement,
  LinearScale,
  Tooltip,
  Legend,
  ArcElement
);

const PieChart = () => {
  // get the fuel logs
  const { fuelLogs, serviceLogs } = useAuth();
  console.log("fuelLogs", fuelLogs);

  // Change the fuel log data into the format that the chart needs
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

  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    if (!fuelLogs) {
      return;
    } else if (!fuelChartData) {
      return;
    } else {
      setChartData({
        labels: fuelChartData.map((data) => data.location), // these are the categories. for fuel, this should be location
        datasets: [
          {
            label: "Location name",
            data: fuelChartData.map((data) => data.summed_price),
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 2,
          },
        ],
      });
    }
  }, [fuelLogs]);

  return (
    <>
      <div className=" flex justify-center m-4 border-2 rounded-3xl w-96 p-4">
        {chartData ? (
          <Doughnut
            className=""
            data={chartData}
            height={400}
            // width={100}
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
    </>
  );
};
export default PieChart;
