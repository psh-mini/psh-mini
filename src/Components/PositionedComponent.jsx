import React from 'react';
import { useComponentPosition } from './useComponentPosition';

export default function PositionedComponent({ name, children }) {
  const { top, left } = useComponentPosition(name);

  return (
    <div
      style={{
        position: 'absolute',
        top,
        left,
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'auto', 
      }}
    >
      {children}
    </div>
  );
}
