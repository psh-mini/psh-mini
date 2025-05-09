import React, { useState } from 'react';
import './DiagramTemplate.css';
import Valve from './Valve';
import Pump from './Pump';
import Generator from './Generator';
import Reservoir from './Reservoir';
import PositionedComponent from './PositionedComponent';
import Arrow from './Arrow';
import ControlButton from './ControlButton';
import { fetchRecentPower } from '../api/API';



export default function DiagramTemplate() { 
  const [valveOpen, setValveOpen] = useState(false);
  const [pumpOn, setPumpOn] = useState(false);
  const [manualOverride, setManualOverride] = useState(false);

  async function buttonTogglePump() {
    //only toggleable if manual overrid is on
    if (manualOverride) {
      setOverride(valveOpen, !pumpOn);
      setPumpOn(prev => !prev);
      console.log('Pump toggled:', !pumpOn);
    }
  }
  
  function buttonToggleValve() {
    //only toggleable if manual overrid is on
    if (manualOverride) {
      setOverride(!valveOpen, pumpOn);
      setValveOpen(prev => !prev);
      //toggleValve();
      console.log('Valve toggled:', !valveOpen);
    }
  }

  function buttonToggleManualOverride() {
    console.log("manual button pressed");
    if (!manualOverride) {
      setManualOverride(prev => !prev);
      setOverride(valveOpen, pumpOn);
      console.log('Manual override toggled:', !manualOverride);
    } else {
      setManualOverride(prev => !prev);
      clearOverride();
    }
  }

  function setOverride(valve, pump) {
    console.log("override set to valve: " + valve + " pump: "+ pump);
    fetch('http://localhost:3000/api/override', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ valve, pump })
    }).then(res => res.text()).then(console.log);
  }

  function clearOverride() {
    fetch('http://localhost:3000/api/override/clear', {
      method: 'POST'
    }).then(res => res.text()).then(console.log);
  }

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

      <PositionedComponent name="valve button">
        <ControlButton
          isActive={valveOpen}
          onClick={buttonToggleValve}
        />
      </PositionedComponent>

      <PositionedComponent name="pump button">
        <ControlButton
          isActive={pumpOn}
          onClick={buttonTogglePump}
        />
      </PositionedComponent>

      <PositionedComponent name="override button">
        <ControlButton
          isActive={manualOverride}
          onClick={buttonToggleManualOverride}
        />
      </PositionedComponent>
      <PositionedComponent name="override button text">
        <p>Manual Override</p>
      </PositionedComponent>
    </div>
  );
}