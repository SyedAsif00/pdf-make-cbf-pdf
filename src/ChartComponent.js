// ChartComponent.js
import React, { useEffect } from "react";
import { Chart } from "chart.js/auto";

const ChartComponent = ({ data }) => {
  useEffect(() => {
    // Ensure canvas is cleared before rendering a new chart
    const canvas = document.getElementById("chart");
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Destroy existing chart if it exists
    const existingChart = Chart.getChart(canvas);
    if (existingChart) {
      existingChart.destroy();
    }

    // Render the new chart
    const newChart = new Chart(canvas, {
      type: "pie",
      data: data,
      options: {
        // Your chart options here
      },
    });

    // Cleanup on component unmount
    return () => {
      newChart.destroy();
    };
  }, [data]);

  return <canvas id="chart" width="100px" height="100px"></canvas>;
};

export default ChartComponent;
