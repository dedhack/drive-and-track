import React, { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { CategoryScale, Chart, ArcElement } from "chart.js";
import { Doughnut } from "react-chartjs-2";

Chart.register(CategoryScale, ArcElement);
// Maintenance Doughnut chart

const MDoChart = () => {
  const { serviceLogs, serviceTypes } = useAuth();
  console.log("serviceLogs", serviceLogs);

  // price, service_type

  // need to match the service type to the string which we stored inside serviceTypes state
  // we match the service_type number to the serviceTypes array index
  const serviceChartData = Object.values(
    serviceLogs.reduce((acc, log) => {
      const { service_type, price } = log;
      if (!acc[service_type]) {
        acc[service_type] = {
          summed_price: 0,
          service_type: service_type,
          service_text: serviceTypes[service_type - 1].type_name,
        };
      }
      acc[service_type].summed_price += parseFloat(price);

      return acc;
    }, {})
  );
  console.log(serviceTypes);

  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    if (!serviceLogs) {
      return;
    } else if (!serviceChartData) {
      return;
    } else {
      setChartData({
        labels: serviceChartData.map((data) => data.service_text),
        datasets: [
          {
            label: "Total Price",
            data: serviceChartData.map((data) => data.summed_price),
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
  }, [serviceLogs]);

  return (
    <>
      <div className="flex justify-center p-4 border-2 rounded-3xl ">
        {chartData ? (
          <Doughnut
            className=""
            data={chartData}
            // width={100}
            options={{
              maintainAspectRatio: true,
              plugins: {
                title: {
                  display: true,
                  text: "Amount of Litres",
                },
              },
              aspectRatio: 1,
              responsive: true,
            }}
          />
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default MDoChart;
