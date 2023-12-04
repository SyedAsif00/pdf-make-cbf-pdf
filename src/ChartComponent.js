import React, { useEffect } from "react";
import { Chart } from "chart.js/auto";

const ChartComponent = ({ data }) => {
  useEffect(() => {
    const canvas = document.getElementById("chart");
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);

    const existingChart = Chart.getChart(canvas);
    if (existingChart) {
      existingChart.destroy();
    }

    const newChart = new Chart(canvas, {
      type: "pie",
      data: data,
      options: {},
    });

    return () => {
      newChart.destroy();
    };
  }, [data]);

  return <canvas id="chart" width="100px" height="100px"></canvas>;
};

export default ChartComponent;
