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

  async function buttonTogglePump() {
    setPumpOn(prev => !prev);
    // try {
    //   const power = await fetchRecentPower();
  
    //   // Make sure data exists
    //   if (power?.data?.length > 0) {
    //     const latestTimestamp = power.data[0].timestamp;
    //     const latestPower = power.data[0].power;
    //     const latestFlow = power.data[0].flowrate;
    //     const latestValve = power.data[0].valve;
    //     const latestPump = power.data[0].pump;

    //     console.log('✅ Most recent timestamp reading:', latestTimestamp);
    //     console.log('✅ Most recent power reading:', latestPower);
    //     console.log('✅ Most recent flow reading:', latestFlow);
    //     console.log('✅ Most recent valve reading:', latestValve);
    //     console.log('✅ Most recent pump reading:', latestPump);
    //   } else {
    //     console.warn('⚠️ No power data returned');
    //   }
  
    // } catch (err) {
    //   console.error('❌ Error fetching power data:', err);
    // }
    console.log('Pump toggled:', !pumpOn);
  }
  
  function buttonToggleValve() {
    setValveOpen(prev => !prev);
    //toggleValve();
    console.log('Valve toggled:', !valveOpen);
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
    </div>
  );
}