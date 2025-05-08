import React from 'react';
import './DiagramTemplate.css';
import Valve from './Valve';
// import Pump from './Pump';
// import Generator from './Generator';
import PositionedComponent from './PositionedComponent';


export default function DiagramTemplate() {
  return (
    <div className="diagram-wrapper">
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
        <g transform="translate(180, 90)"> {/* top resevoir to valve */}
          <line x1="0" y1="15" x2="100" y2="15" stroke="black" strokeWidth="3" />
          <polygon points="100,10 115,15 100,20" fill="black" />
        </g>
        <g transform="translate(180, 90)"> {/* valve to generator */}
          <line x1="190" y1="15" x2="260" y2="15" stroke="black" strokeWidth="3" />
          <line x1="260" y1="13.5" x2="260" y2="150" stroke="black" strokeWidth="3" />
          <line x1="260" y1="148.5" x2="130" y2="149.5" stroke="black" strokeWidth="3" />
          <polygon transform='translate(30 134.5)' points="100,10 85,15 100,20" fill="black" />
        </g>
        <g transform="translate(140, 224.5)"> {/* generator to lower resevoir */}
          <line x1="0" y1="15" x2="70" y2="15" stroke="black" strokeWidth="3" />
          <polygon transform='translate(-100 0)' points="100,10 85,15 100,20" fill="black" />
        </g>
        <g transform="translate(140, 224.5)"> {/* lower res to pump */}
          <line x1="-70" y1="15" x2="-110" y2="15" stroke="black" strokeWidth="3" />
          <line x1="-108.5" y1="15" x2="-108.5" y2="-30" stroke="black" strokeWidth="3" />
          <polygon transform='translate(-208.5 -45)' points="105,20 100,5 95,20" fill="black" />
        </g>
        <g transform="translate(140, 120)"> {/* pump to upper res */}
          <line x1="-108.5" y1="25" x2="-108.5" y2="-16.5" stroke="black" strokeWidth="3" />
          <line x1="-108.5" y1="-15" x2="-25" y2="-15" stroke="black" strokeWidth="3" />
          <polygon transform='translate(-125 -30)' points="100,10 115,15 100,20" fill="black" />
        </g>
      </svg>

      <PositionedComponent name="valve">
      <Valve />
      </PositionedComponent>
  {/*
      <PositionedComponent name="pump">
      <Pump />
      </PositionedComponent>

      <PositionedComponent name="generator">
      <Generator />
      </PositionedComponent>
      */}
    </div>

  );
}