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
      <Arrow path="M9,31 L36,31" stroke="black" />

      // Valve → generator
      <Arrow path="M50,31 L100,31 L100,60 L91,60" stroke="black" />

      // Generator → lower reservoir
      <Arrow path="M76,60 L50,60" stroke="black" />

      // Lower reservoir → pump
      <Arrow path="M38,60 L11,60" stroke="black" />

      // Pump → upper reservoir
      <Arrow path="M-3,60  L-10,60 L-10,31 L-3,31" stroke="black" />

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