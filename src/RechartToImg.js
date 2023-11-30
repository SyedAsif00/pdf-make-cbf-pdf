import React, { useCallback, useRef, useState } from "react";
import {
  ComposedChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  Area,
  Bar,
  Line,
  Brush,
} from "recharts";
import * as htmlToImage from "html-to-image";
import { saveAs } from "file-saver";

function MyApp(props) {
  const chartRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleDownload = useCallback(async () => {
    if (chartRef.current) {
      setIsLoading(true);

      try {
        const chartImage = await htmlToImage.toPng(chartRef.current);

        // Download with FileSaver
        saveAs(chartImage, "myChart.png");
      } catch (error) {
        console.error("Error generating chart image:", error);
      } finally {
        setIsLoading(false);
      }
    }
  }, []);

  return (
    <>
      <ComposedChart data={props.data} ref={chartRef}>
        {/* Add your chart components here */}
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <CartesianGrid stroke="#f5f5f5" />
        <Area type="monotone" dataKey="amt" fill="#8884d8" stroke="#8884d8" />
        <Bar dataKey="pv" barSize={20} fill="#413ea0" />
        <Line type="monotone" dataKey="uv" stroke="#ff7300" />
        <Brush dataKey="name" height={30} stroke="#8884d8" />
      </ComposedChart>
      <br />
      <button onClick={handleDownload}>
        {isLoading ? "Downloading..." : "Download Chart"}
      </button>
    </>
  );
}

export default MyApp;
