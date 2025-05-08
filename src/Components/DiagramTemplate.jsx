import React from 'react';
import './DiagramTemplate.css';

export default function DiagramTemplate({ onValveClick, onPumpClick }) {
  return (
    <svg viewBox="0 0 800 600" className="flow-diagram">
      {/* <g onClick={() => alert('Upper Reservoir clicked')}>
        <rect x="50" y="100" width="100" height="150" fill="#444" rx="20" />
        <rect x="50" y="200" width="100" height="50" fill="skyblue" />
        <text x="60" y="270">Upper Reservoir</text>
      </g>

      <g onClick={onValveClick}>
        <circle cx="200" cy="150" r="20" fill="black" />
        <text x="180" y="190">Valve</text>
      </g> */}

      {/* Pipes (lines) */}
      <g transform="translate(160, 90)"> {/* 20% of 800 = 160, 80% of 600 = 480 */}
        <line x1="0" y1="15" x2="100" y2="15" stroke="black" strokeWidth="3" />
        <polygon points="100,10 115,15 100,20" fill="black" />
      </g>
      <g transform="translate(160, 90)"> {/* 20% of 800 = 160, 80% of 600 = 480 */}
        <line x1="190" y1="0" x2="190" y2="0" stroke="black" strokeWidth="3" />
      </g>

      
      {/* <g onClick={() => alert('Generator clicked')}>
        <circle cx="350" cy="150" r="30" fill="gray" />
        <text x="330" y="200">Generator</text>
      </g>


      <g onClick={() => alert('Lower Reservoir clicked')}>
        <rect x="50" y="350" width="100" height="150" fill="#444" rx="20" />
        <rect x="50" y="450" width="100" height="50" fill="blue" />
        <text x="60" y="520">Lower Reservoir</text>
      </g>

      <g onClick={onPumpClick}>
        <circle cx="200" cy="450" r="30" fill="black" />
        <text x="180" y="500">Pump</text>
      </g> */}
    </svg>
  );
}