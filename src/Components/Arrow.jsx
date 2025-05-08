// src/Components/Arrow.jsx
import React from 'react';
import './Arrow.css';

export default function Arrow({
  x1,
  y1,
  x2,
  y2,
  path,
  stroke = 'black',
  strokeWidth = 1,
  showArrowhead = true,
  flowing = false,
}) {
  const markerId = `arrowhead-${stroke.replace('#', '')}`;

  return (
    <>
      {showArrowhead && (
        <defs>
          <marker
          id={markerId}
          markerWidth="5"
          markerHeight="5"
          refX="4"
          refY="2.5"
          orient="auto"
          markerUnits="strokeWidth"
        >
          <path d="M0,0 L5,2.5 L0,5 Z" fill={stroke} />
        </marker>
        </defs>
      )}

      {path ? (
        <path
          d={path}
          stroke={stroke}
          strokeWidth={strokeWidth}
          fill="none"
          markerEnd={showArrowhead ? `url(#${markerId})` : undefined}
          className={flowing ? 'flowing-arrow' : ''}
        />
      ) : (
        <line
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke={stroke}
          strokeWidth={strokeWidth}
          markerEnd={showArrowhead ? `url(#${markerId})` : undefined}
          className={flowing ? 'flowing-arrow' : ''}
        />
      )}
    </>
  );
}
