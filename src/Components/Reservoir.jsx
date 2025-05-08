import React from 'react';
import './Reservoir.css'; 

export default function Reservoir({ tooltip = "Reservoir"}) {
  return (
    <div className="reservoir-container">
      <img
        src="/Icons/Reservoir.png"
        alt={tooltip}
        className="reservoir-image"
      />
      <span className="tooltip">{tooltip}</span>
    </div>
  );
}