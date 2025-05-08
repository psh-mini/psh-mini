import React from 'react';
import './Generator.css'; 

export default function Generator() {
  return (
    <div className="generator-container">
      <img
        src="/Icons/Generator.png"
        alt="Generator"
        className="generator-image"
      />
      <span className="tooltip">Generator</span>
    </div>
  );
}