import React from 'react';
import { useComponentPosition } from './useComponentPosition';
import './GraphTemplate.css';

export default function GraphTemplate({ name, children }) {
  const { top, left } = useComponentPosition(name);

  return (
    <div
      className="graph-template"
      style={{
        position: 'absolute',
        top,
        left,
        transform: 'translate(-50%, -50%)',
      }}
    >
      {children}
    </div>
  );
}
