import React from 'react';
import './Valve.css'; // for tooltip styling

export default function Valve() {
  return (
    <div className="valve-container">
      <img
        src="/Icons/valve.png"
        alt="Water Valve"
        className="valve-image"
      />
      <span className="tooltip">Water Valve</span>
    </div>
  );
}
