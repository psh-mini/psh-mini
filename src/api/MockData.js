//Mock data to test front end functionality
import * as d3 from 'd3';


const generateGraph = (chartRef, datainput) => {
    const svg = d3.select(chartRef.current);
    const width = 600;
    const height = 400;
    const barWidth = width / datainput.length;

    svg.selectAll("rect").remove(); // Prevent duplication

    svg
      .attr("width", width)
      .attr("height", height)
      .selectAll("rect")
      .data(datainput)
      .enter()
      .append("rect")
      .attr("x", (_, i) => i * barWidth)
      .attr("y", d => height - d * 4)
      .attr("width", barWidth - 5)
      .attr("height", d => d * 4)
      .attr("fill", "steelblue");
} 
export default generateGraph;