//Component containing flowrate and current data
const data = [30, 80, 45, 60, 20, 90, 50];

const svg = d3.select("#chart");
const width = +svg.attr("width");
const height = +svg.attr("height");
const barWidth = width / data.length;

svg.selectAll("rect")
.data(data)
.enter()
.append("rect")
.attr("x", (_, i) => i * barWidth)
.attr("y", d => height - d * 4) // Scale height
.attr("width", barWidth - 5)
.attr("height", d => d * 4)
.attr("fill", "steelblue");
