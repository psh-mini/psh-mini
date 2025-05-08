import React, { useState } from 'react';
import './DiagramTemplate.css';
import Valve from './Valve';
import Pump from './Pump';
import Generator from './Generator';
import Reservoir from './Reservoir';
import PositionedComponent from './PositionedComponent';
import Arrow from './Arrow';

export default function DiagramTemplate() { 
  const [valveOpen, setValveOpen] = useState(false);
  const [pumpOn, setPumpOn] = useState(false);
  
  return (
    <div className="flow-diagram">
      <svg viewBox="0 0 100 100">

        // Upper reservoir → valve
        <Arrow path="M9,31 L36,31" stroke="black" flowing={pumpOn} />

        // Valve → generator
        <Arrow path="M50,31 L100,31 L100,60 L91,60" stroke="black" flowing={valveOpen}/>

        // Generator → lower reservoir
        <Arrow path="M76,60 L50,60" stroke="black" flowing={valveOpen}/>

        // Lower reservoir → pump
        <Arrow path="M38,60 L11,60" stroke="black" flowing={pumpOn}/>

        // Pump → upper reservoir
        <Arrow path="M-3,60  L-10,60 L-10,31 L-3,31" stroke="black" flowing={pumpOn}/>

      </svg>

      <PositionedComponent name="valve">
      <Valve isOpen={valveOpen} />
      </PositionedComponent>

      <PositionedComponent name="pump">
      <Pump isOn={pumpOn} />
      </PositionedComponent>

      <PositionedComponent name="generator">
      <Generator />
      </PositionedComponent>

      <PositionedComponent name="upper reservoir">
      <Reservoir tooltip="Upper Reservoir"/>
      </PositionedComponent>

      <PositionedComponent name="lower reservoir">
      <Reservoir tooltip="Lower Reservoir"/>
      </PositionedComponent>

      <div style={{ position: 'absolute', top: '5px', left: '5px', zIndex: 10 }}>
        <button onClick={() => setValveOpen(v => !v)}>
          Toggle Valve ({valveOpen ? 'Open' : 'Closed'})
        </button>
        <button onClick={() => setPumpOn(p => !p)}>
          Toggle Pump ({pumpOn ? 'On' : 'Off'})
        </button>
      </div>
    </div>

  );
}