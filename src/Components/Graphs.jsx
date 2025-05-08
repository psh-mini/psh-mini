//Component containing flowrate and current data
import React, { useEffect, useState, useRef } from 'react';
import generateGraph from '../api/MockData';
import './Graphs.css'

function Graphs() {
    const chartRef = useRef(null);
    const [datainput, setDatainput] = useState(null);

    // Load JSON data that is being inputted from data-collection.py
    useEffect(() => {
    fetch('/data.json')
        .then(res => res.json())
        .then(data => {
        setDatainput(data);
        });
    }, []);

    // Render chart after data loads
    useEffect(() => {
    if (datainput) {
        generateGraph(chartRef, datainput);
    }
    }, [datainput]);

    return (
        <div className="graphs-container">
            <h1>Visual Graph of + component name</h1>
            <svg ref = {chartRef}></svg>
        </div>
    )
}
export default Graphs;
