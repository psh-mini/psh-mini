import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

function App() {
  const chartRef = useRef(null);

  useEffect(() => {
    const data = [30, 80, 45, 60, 20, 90, 50];
    const svg = d3.select(chartRef.current);
    const width = 600;
    const height = 400;
    const barWidth = width / data.length;

    svg.selectAll("rect").remove(); // Prevent duplication

    svg
      .attr("width", width)
      .attr("height", height)
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (_, i) => i * barWidth)
      .attr("y", d => height - d * 4)
      .attr("width", barWidth - 5)
      .attr("height", d => d * 4)
      .attr("fill", "steelblue");
  }, []);

  return (
    <div>
      <h1>My SCADA Graph</h1>
      <svg ref={chartRef}></svg>
      <p>Lower Reservoir</p>
      <p>Upper Reservoir</p>
    </div>
  );
}

export default App;
