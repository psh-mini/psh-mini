import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

export default function Graphs({ selectedMetric }) {
  const svgRef = useRef();
  const [data, setData] = useState({
    powers: [],
    flowrates: [],
    valves: [],
    pumps: []
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('http://localhost:3001/api/frontend');
        const json = await res.json();
        const entries = json.data.reverse();

        const newData = {
          powers: entries.map(e => e.power),
          flowrates: entries.map(e => e.flowrate),
          valves: entries.map(e => (e.valve ? 1 : 0)),
          pumps: entries.map(e => (e.pump ? 1 : 0))
        };

        setData(newData);

        // Log each array
        console.log("✅ Powers:", newData.powers);
        console.log("✅ Flowrates:", newData.flowrates);
        console.log("✅ Valves:", newData.valves);
        console.log("✅ Pumps:", newData.pumps);
      } catch (err) {
        console.error('❌ Error fetching graph data:', err);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const metricData = {
      flowrate: data.flowrates,
      power: data.powers,
      current: data.powers, // alias for power
      valve: data.valves,
      pump: data.pumps
    }[selectedMetric];

    if (!metricData || metricData.length === 0) return;

    const width = 400;
    const height = 250;
    const margin = { top: 40, right: 20, bottom: 50, left: 60 };

    const x = d3.scaleLinear()
      .domain([0, metricData.length - 1])
      .range([margin.left, width - margin.right]);

    const y = d3.scaleLinear()
      .domain([
        0,
        d3.max(metricData) === 0 ? 1 : d3.max(metricData)
      ])
      .nice()
      .range([height - margin.bottom, margin.top]);

    const svgEl = svg
      .attr('width', width)
      .attr('height', height);

    const line = d3.line()
      .x((_, i) => x(i))
      .y(d => y(d))
      .curve(d3.curveMonotoneX);

    svgEl.append('path')
      .datum(metricData)
      .attr('fill', 'none')
      .attr('stroke', '#007bff')
      .attr('stroke-width', 2)
      .attr('d', line);

    // Tooltip div
    const tooltip = d3.select('body')
      .append('div')
      .style('position', 'absolute')
      .style('background', '#fff')
      .style('border', '1px solid #ccc')
      .style('padding', '5px 10px')
      .style('border-radius', '4px')
      .style('pointer-events', 'none')
      .style('opacity', 0);

    svgEl.selectAll('circle')
      .data(metricData)
      .enter()
      .append('circle')
      .attr('cx', (_, i) => x(i))
      .attr('cy', d => y(d))
      .attr('r', 4)
      .attr('fill', '#007bff')
      .on('mouseover', (event, d) => {
        tooltip
          .style('opacity', 1)
          .html(`Value: ${d}`)
          .style('left', (event.pageX + 10) + 'px')
          .style('top', (event.pageY - 28) + 'px');
      })
      .on('mousemove', event => {
        tooltip
          .style('left', (event.pageX + 10) + 'px')
          .style('top', (event.pageY - 28) + 'px');
      })
      .on('mouseout', () => {
        tooltip.style('opacity', 0);
      });

    svgEl.append('g')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).ticks(metricData.length).tickFormat(d => d));

    svgEl.append('g')
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));

    svgEl.append('text')
      .attr('text-anchor', 'middle')
      .attr('x', width / 2)
      .attr('y', height - 10)
      .text('Time (most recent → right)');

    svgEl.append('text')
      .attr('text-anchor', 'middle')
      .attr('transform', `rotate(-90)`)
      .attr('x', -height / 2)
      .attr('y', 20)
      .text(
        selectedMetric === 'flowrate'
          ? 'Flowrate (L/m)'
          : selectedMetric === 'power' || selectedMetric === 'current'
          ? 'Power (mW)'
          : selectedMetric === 'valve'
          ? 'Valve (0 or 1)'
          : 'Pump (0 or 1)'
      );

    return () => {
      tooltip.remove();
    };
  }, [data, selectedMetric]);

  return <svg ref={svgRef} />;
}
