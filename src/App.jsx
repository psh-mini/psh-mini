import React, { useEffect, useState, useRef } from 'react';
import * as d3 from 'd3';
import generateGraph from './api/MockData';

function App() {

  const chartRef = useRef(null);
  const [datainput, setDatainput] = useState(null); // ✅ tracked state

  // Load JSON data
  useEffect(() => {
    fetch('/data.json')
      .then(res => res.json())
      .then(data => {
        setDatainput(data); // ✅ store it reactively
      });
  }, []);

  // Render chart after data loads
  useEffect(() => {
    if (datainput) {
      generateGraph(chartRef, datainput); // ✅ safe to call here
    }
  }, [datainput]);

  return (
    <div>
      <h1>My SCADA Graph</h1>
      <svg ref = {chartRef}></svg>
    </div>
  );
}

export default App;
