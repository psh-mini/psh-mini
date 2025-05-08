import React from 'react';
import './Reservoir.css'; 

export default function Reservoir() {
  return (
    <div className="reservoir-container">
      <img
        src="/Icons/Reservoir.png"
        alt="Reservoir"
        className="reservoir-image"
      />
      <span className="tooltip">Reservoir</span>
    </div>
  );
}