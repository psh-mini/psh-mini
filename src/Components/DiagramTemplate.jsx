import React from 'react';
import './DiagramTemplate.css';
import Valve from './Valve';
import Pump from './Pump';
import Generator from './Generator';
import Reservoir from './Reservoir';
import PositionedComponent from './PositionedComponent';
import Arrow from './Arrow';



export default function DiagramTemplate() {
  return (
    <div className="flow-diagram">
      <svg viewBox="0 0 100 100">

      // Upper reservoir → valve
      <Arrow path="M12,30 L22,30" stroke="black" />
{/* 
      // Valve → generator
      <Arrow path="M22,30 L40,30 L40,60 L68,60" stroke="black" />

      // Generator → lower reservoir
      <Arrow path="M68,60 L68,70 L42,70" stroke="black" />

      // Lower reservoir → pump
      <Arrow path="M42,70 L22,70 L22,86" stroke="black" />

      // Pump → upper reservoir
      <Arrow path="M22,86 L22,42 L12,42 L12,30" stroke="black" />
*/}
      </svg>

      <PositionedComponent name="valve">
      <Valve />
      </PositionedComponent>

      <PositionedComponent name="pump">
      <Pump />
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

    </div>

  );
}