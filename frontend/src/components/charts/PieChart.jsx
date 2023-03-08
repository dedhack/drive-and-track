import React from "react";
import { Doughnut } from "react-chartjs-2";

function PieChart({ chartData, options }) {
  return (
    <div className="">
      <h2>Pie Chart</h2>
      <Doughnut
        className="w-10"
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "History",
            },
          },
        }}
        // width={10}
        // height={5}
      />
    </div>
  );
}
export default PieChart;
