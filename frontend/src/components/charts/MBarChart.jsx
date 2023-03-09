import React, { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import {
  CategoryScale,
  Chart,
  BarElement,
  LinearScale,
  ArcElement,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { maintCategorizeByMonth } from "./calculations";

Chart.register(CategoryScale, BarElement, LinearScale, ArcElement, Legend);

const MBarChart = () => {
  const { serviceLogs, serviceTypes } = useAuth();
  const [barData, setBarData] = useState(null);

  const sumOfEachMonth = maintCategorizeByMonth(serviceLogs)
    .slice(0, 3)
    .reverse();

  useEffect(() => {
    if (!serviceLogs) {
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
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 2,
            borderRadius: 25,
          },
        ],
      });
    }
  }, [serviceLogs]);

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
                text: "Amount of $ spent per month",
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

export default MBarChart;
