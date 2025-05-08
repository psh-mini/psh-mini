import React from 'react';
import './ControlButton.css';

export default function ControlButton({ isActive, onClick, tooltip }) {
  const image = isActive ? '/Icons/OnButton.png' : '/Icons/OffButton.png';

  return (
    <div className="control-button" onClick={onClick}>
      <img src={image} alt={tooltip} className="toggle-icon" />
    </div>
  );
}
