import React from 'react';
import './Pump.css'; 

export default function Pump() {
  return (
    <div className="pump-container">
      <img
        src="/Icons/Pump.png"
        alt="Water Pump"
        className="pump-image"
      />
      <span className="tooltip">Water Pump</span>
    </div>
  );
}