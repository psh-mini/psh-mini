import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

export default function Graphs({ selectedMetric }) {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove(); // clear previous graph

    // Sample data
    const dataMap = {
      flowrate: [10, 15, 18, 12, 14, 16],
      current: [2.1, 2.4, 2.3, 2.0, 2.2],
      valve: [0, 1, 1, 0, 1, 1],
      pump: [1, 0, 1, 1, 0],
    };

    const data = dataMap[selectedMetric] || [];
    const width = 600;
    const height = 300;
    const margin = { top: 10, right: 10, bottom: 20, left: 30 };

    const x = d3.scaleLinear()
      .domain([0, data.length - 1])
      .range([margin.left, width - margin.right]);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data)])
      .range([height - margin.bottom, margin.top]);

    const line = d3.line()
      .x((_, i) => x(i))
      .y(d => y(d))
      .curve(d3.curveMonotoneX);

    svg
      .attr('width', width)
      .attr('height', height)
      .append('path')
      .datum(data)
      .attr('d', line)
      .attr('stroke', '#007bff')
      .attr('stroke-width', 2)
      .attr('fill', 'none');

    // draw axes
    svg.append('g')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).ticks(data.length).tickFormat((d, i) => i));

    svg.append('g')
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(y).ticks(5));

  }, [selectedMetric]);

  return (
    <svg
      ref={svgRef}
      width={600}
      height={300}
      style={{ backgroundColor: 'white' }} 
    />
  );
  
}
