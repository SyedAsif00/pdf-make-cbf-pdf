import React, { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";
import html2canvas from "html2canvas";

const ChartComponent = ({ data }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);

    const existingChart = Chart.getChart(canvas);
    if (existingChart) {
      existingChart.destroy();
    }

    const newChart = new Chart(canvas, {
      type: "bar",
      data: data,
      options: {
        plugins: {
          legend: {
            display: false,
            labels: {
              font: {
                size: 100,
              },
            },
          },
        },
        scales: {
          x: {
            grid: {
              offset: false,
            },
            ticks: {
              font: {
                size: 30,
              },
            },
          },
          y: {
            grid: {
              offset: false,
            },
          },
        },
      },
    });

    return () => {
      newChart.destroy();
    };
  }, [data]);

  return (
    <canvas
      id="Barchart"
      ref={canvasRef}
      style={{ width: "1000px", height: "400px" }}
    ></canvas>
  );
};

export default ChartComponent;
