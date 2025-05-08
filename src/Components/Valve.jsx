import React from 'react';
import './Valve.css'; 

export default function Valve() {
  return (
    <div className="valve-container">
      <img
        src="/Icons/Valve2.png"
        alt="Water Valve"
        className="valve-image"
      />
      <span className="tooltip">Water Valve</span>
    </div>
  );
}
